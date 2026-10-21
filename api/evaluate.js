// api/evaluate.js
// Vercel serverless function — proxies prompt evaluation AND policy generation to Anthropic
// (both the "Give AI The Job" scoring and the "Generate Room's AI Principles" feature
// call this same endpoint with different systemPrompt/userPrompt pairs)
// Requires ANTHROPIC_API_KEY in Vercel environment variables.
//
// NOTE: this file must stay JavaScript. On Aug 28 it was accidentally overwritten with a
// copy of index.html, which silently broke AI scoring and the policy generator.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { systemPrompt, userPrompt } = req.body || {};
  if (!systemPrompt || !userPrompt) {
    return res.status(400).json({ error: 'Missing systemPrompt or userPrompt' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001', // fast + cheap for conference use
        max_tokens: 550, // enough for the JSON response; keeps throughput high under rate limits
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Anthropic API error' });
    }
    return res.status(200).json(data);
  } catch (err) {
    console.error('Evaluate error:', err);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
