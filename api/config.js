// api/config.js
// Serves public runtime config to the browser.
//
// Two modes:
//  • FACILITATOR_CODE NOT set (legacy): returns the Ably key so every device can connect.
//  • FACILITATOR_CODE set (locked down): returns { tokenAuth: true } and never exposes the key.
//    Devices then get restricted tokens from /api/ably-token, and only a facilitator who opens
//    the console with ?fac=<FACILITATOR_CODE> can change slides.
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  if (process.env.FACILITATOR_CODE) {
    return res.status(200).json({ tokenAuth: true });
  }
  const ablyKey = process.env.ABLY_API_KEY;
  if (!ablyKey) {
    return res.status(500).json({ error: 'ABLY_API_KEY not configured in Vercel environment variables' });
  }
  return res.status(200).json({ ablyKey });
}
