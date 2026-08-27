// api/config.js
// Serves public runtime config to the browser
// Keeps sensitive keys out of the HTML source
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  const ablyKey = process.env.ABLY_API_KEY;
  if (!ablyKey) {
    return res.status(500).json({ error: 'ABLY_API_KEY not configured in Vercel environment variables' });
  }
  return res.status(200).json({
    ablyKey
  });
}
