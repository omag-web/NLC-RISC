// api/ably-token.js
// Issues short-lived, restricted Ably tokens so the full Ably API key never reaches the browser.
// Only used when FACILITATOR_CODE is set in Vercel environment variables (see api/config.js).
//
//   Audience phones   → may SUBSCRIBE to the show-control channel and PUBLISH/SUBSCRIBE votes.
//                       They cannot change slides, push fake policy results, or load bonus content.
//   Facilitator tabs  → full publish/subscribe on this session's channels.
//                       Requested with ?code=<FACILITATOR_CODE>; a wrong code is refused.
import crypto from 'crypto';

const SESSION = 'nlc-risc-2026'; // must match SESSION_NAME in index.html
const TTL_MS = 6 * 60 * 60 * 1000; // 6 hours — covers the whole session; Ably renews automatically

// Same canonical form ably-js uses (sorted resources, sorted operations) so the signature matches.
function canonicalCapability(cap) {
  const out = {};
  Object.keys(cap).sort().forEach(k => { out[k] = [...cap[k]].sort(); });
  return JSON.stringify(out);
}

function safeEqual(a, b) {
  const ab = Buffer.from(String(a)), bb = Buffer.from(String(b));
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export function buildTokenRequest(apiKey, isFacilitator, now = Date.now(), nonce = crypto.randomBytes(16).toString('hex')) {
  const [keyName, keySecret] = apiKey.split(':');
  const capability = canonicalCapability(isFacilitator
    ? { [`${SESSION}:*`]: ['publish', 'subscribe'] }
    : { [`${SESSION}:state`]: ['subscribe'], [`${SESSION}:votes`]: ['publish', 'subscribe'] });
  const clientId = (isFacilitator ? 'fac-' : 'user-') + crypto.randomBytes(4).toString('hex');
  const signText = `${keyName}\n${TTL_MS}\n${capability}\n${clientId}\n${now}\n${nonce}\n`;
  const mac = crypto.createHmac('sha256', keySecret).update(signText).digest('base64');
  return { keyName, ttl: TTL_MS, capability, clientId, timestamp: now, nonce, mac };
}

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const apiKey = process.env.ABLY_API_KEY;
  if (!apiKey || !apiKey.includes(':')) {
    return res.status(500).json({ error: 'ABLY_API_KEY not configured in Vercel environment variables' });
  }
  const facCode = process.env.FACILITATOR_CODE || '';
  const code = (req.query && req.query.code) ? String(req.query.code) : '';
  let isFacilitator = false;
  if (code) {
    if (!facCode || !safeEqual(code, facCode)) {
      return res.status(403).json({ error: 'Invalid facilitator code' });
    }
    isFacilitator = true;
  }
  return res.status(200).json(buildTokenRequest(apiKey, isFacilitator));
}
