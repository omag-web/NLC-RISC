// api/email-report.js
// Emails the session data (summary + the three data files as attachments) via Resend.
//
// Vercel environment variables:
//   RESEND_API_KEY  (required)  API key from resend.com
//   REPORT_EMAIL    (required)  where the report goes, e.g. mburleson@omag.org.
//                               Recipients come ONLY from here, never from the browser,
//                               so this endpoint can't be used to email anyone else.
//   REPORT_FROM     (optional)  sender, e.g. "AI Control Room <reports@yourdomain.org>".
//                               Defaults to Resend's test sender, which can only deliver
//                               to the email address you signed up to Resend with.
//   FACILITATOR_CODE (optional) if set, the request must include the matching code.
import crypto from 'crypto';

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function safeEqual(a, b) {
  const ab = Buffer.from(String(a)), bb = Buffer.from(String(b));
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}
function mask(email) {
  return String(email).split(',').map(e => {
    const [u, d] = e.trim().split('@'); return d ? `${u.slice(0, 1)}•••@${d}` : '•••';
  }).join(', ');
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.REPORT_EMAIL;
  if (!apiKey || !to) {
    return res.status(501).json({ error: 'Email is not configured (set RESEND_API_KEY and REPORT_EMAIL in Vercel).' });
  }

  const body = req.body || {};
  const facCode = process.env.FACILITATOR_CODE;
  if (facCode && !(body.code && safeEqual(body.code, facCode))) {
    return res.status(403).json({ error: 'Facilitator code required' });
  }

  const files = Array.isArray(body.files) ? body.files.slice(0, 5) : [];
  const total = files.reduce((n, f) => n + String(f.content || '').length, 0);
  if (!files.length || total > 3_500_000) {
    return res.status(400).json({ error: 'No data to send, or the data is too large to email.' });
  }

  const s = body.summary || {};
  const when = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'medium', timeStyle: 'short' });
  const principles = String(s.principles || '').trim();
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:560px">
    <h2 style="margin:0 0 4px">AI Control Room · Session Data</h2>
    <div style="color:#64748b;font-size:13px;margin-bottom:16px">NLC-RISC 2026 · Leveraging AI Without Scaring Everyone · sent ${esc(when)} CT</div>
    <table cellpadding="8" style="border-collapse:collapse;font-size:14px;margin-bottom:16px">
      <tr><td style="border:1px solid #e2e8f0">Participants</td><td style="border:1px solid #e2e8f0"><b>${esc(s.participants ?? '—')}</b></td></tr>
      <tr><td style="border:1px solid #e2e8f0">Votes cast</td><td style="border:1px solid #e2e8f0"><b>${esc(s.votesCast ?? '—')}</b></td></tr>
      <tr><td style="border:1px solid #e2e8f0">"Give AI The Job" assignments</td><td style="border:1px solid #e2e8f0"><b>${esc(s.assignments ?? '—')}</b></td></tr>
      <tr><td style="border:1px solid #e2e8f0">Average AI score</td><td style="border:1px solid #e2e8f0"><b>${esc(s.avg ?? '—')}</b></td></tr>
    </table>
    ${principles ? `<h3 style="margin:0 0 6px">Room's AI Principles</h3><div style="white-space:pre-line;font-size:14px;line-height:1.6;margin-bottom:16px">${esc(principles)}</div>` : ''}
    <p style="font-size:13px;color:#475569">Attached: vote results (CSV), assignments with AI scores (CSV), and the full data with slide timeline and vote log (JSON). Participants are anonymous.</p>
  </div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.REPORT_FROM || 'AI Control Room <onboarding@resend.dev>',
        to: to.split(',').map(e => e.trim()).filter(Boolean),
        subject: `AI Control Room session data · ${s.participants ?? 0} participants · ${when}`,
        html,
        attachments: files.map(f => ({
          filename: String(f.name || 'data.txt').replace(/[^\w.\-]/g, '_'),
          content: Buffer.from(String(f.content || ''), 'utf8').toString('base64')
        }))
      })
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(502).json({ error: data.message || `Email service error (${r.status})` });
    return res.status(200).json({ ok: true, to: mask(to), id: data.id });
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
