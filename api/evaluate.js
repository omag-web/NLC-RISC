// api/evaluate.js
// Vercel serverless function — proxies prompt evaluation AND policy generation to Anthropic
// (both the Prompt Challenge scoring and the "Generate Room's AI Principles" feature
// call this same endpoint with different systemPrompt/userPrompt pairs)
// Place this file at: api/evaluate.js in your GitHub repo root
// Set ANTHROPIC_API_KEY in Vercel environment variables
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  const { systemPrompt, userPrompt } = req.body;
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
        model: 'claude-haiku-4-5-20251001',  // fast + cheap for conference use
        max_tokens: 550,  // trimmed from 1000 for live-event throughput — the JSON response doesn't need more, and this roughly doubles how many submissions can complete per minute under a Tier 1 account's output-token rate limit
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
