# AI Control Room · NLC-RISC 2026

**Leveraging AI Without Scaring Everyone: Guardrails, Governance & Practical AI for Public Organizations**
Matt Burleson · OMAG · NLC-RISC 2026 Staff Conference, Oklahoma City (Oct 25–28, 2026)

- **Live app:** https://nlc-risc.vercel.app (join shortlink: link.omag.org/nlc-risc)
- **Handout:** https://nlc-risc.vercel.app/handout (shortlink: link.omag.org/nlc-risc-handout)

## How to run it

| Screen | How to open |
|---|---|
| **Facilitator console** (your laptop) | Open the app, type `mission` on the landing screen. In locked-down mode, open `https://nlc-risc.vercel.app/?fac=YOUR_CODE` first. |
| **Projector** | Click **Open Projector View** from the console (it carries your code along), then **Fullscreen**. |
| **Audience** | Scan the QR on the title slide. |

Advance with **→ / Page Down / Space / clicker**; go back with **← / Page Up**. Works on the console and on the projector tab.

Keep the projector tab open from the start. The "How the Room Changed" slide compares the opening and final pulse checks, which are held in browser memory.

## Resetting and session data

- **⟲ Reset Entire Session** (console, top button row) clears every vote, the AI balance gauges, all assignments and scores, bonus dilemmas, the generated principles and the saved session data on every device, then returns everyone to the title slide. Use it after testing and right before the talk.
- **Session Data** panel (bottom of the console) records the session on your laptop as it runs, and survives a refresh. It shows participants, votes cast, assignments and the average AI score.
  - **Results (CSV):** every vote item with counts and percentages, plus the gauges and the room's AI principles.
  - **Assignments + AI Scores (CSV):** every "Give AI The Job" submission with its score, grade and the four dimension scores.
  - **Full Data (JSON):** everything above, plus a slide timeline (when each item started) and the time-stamped vote log.
- Participants are anonymous: each phone gets a random ID, and no names or emails are collected.
- Data lives only in the console laptop's browser. **Download it after the session**, before clearing the browser or resetting.
- **✉ Email Me the Data** sends a summary plus all three files as attachments to `REPORT_EMAIL` (needs the email setup below). Downloads still work as a backup.

## Timing and cut plan

| Tier | Minutes |
|---|---|
| MUST only | ~55 |
| MUST + If time | ~66 |
| Everything | ~82 |

For a 60-minute slot, run MUST items and treat "If time" items as flex. Skip all Optional items unless you're ahead.
The three "Give AI The Job" writing exercises usually run long, so watch the clock during Missions 1 and 2.

**Cut order if running long (first to go → last):**
1. Optional: Pick The AI, HR Traffic Control round, Bonus rounds, both "Would You Use It?" polls, How Did We Balance AI?
2. Every Platform, Multiple Models (screenshots)
3. "Should We Allow AI?" Is the Wrong Question
4. "I Don't Have Enough Information"
5. Six Questions + Let's Build YOUR AI Policy (go straight to Policy Question 1)
6. Fast vs. Deep — Under Time Pressure
7. Keep as long as possible: the fake executive summary pair (I Asked AI… / Confidence ≠ Accuracy) — it's the strongest laugh.

## Run of show

| # | Item | Type | Priority | Min |
|---|---|---|---|---|
| 1 | Leveraging AI Without Scaring Everyone | slide | MUST | 1 |
| 2 | Opening Pulse Check | poll | MUST | 1 |
| 3 | Interest Is Moving Faster Than Governance | slide | MUST | 2 |
| 4 | "Should We Allow AI?" Is the Wrong Question | slide | If time | 1 |
| 5 | Platform vs. Model — Think of It Like a Vehicle | slide | MUST | 2 |
| 6 | Every Platform, Multiple Models | slide | If time | 2 |
| 7 | ⚡ Fast · 🧠 Balanced · 🔬 Deep | slide | If time | 1 |
| 8 | Pick The AI | poll | Optional | 2 |
| 9 | Data · Accuracy · Decision · Accountability | slide | MUST | 2 |
| 10 | I Asked AI for an Executive Summary | slide | If time | 1 |
| 11 | AI Confidence ≠ AI Accuracy | slide | If time | 2 |
| 12 | Was AI's Answer Trustworthy? | scenario | MUST | 3 |
| 13 | "I Don't Have Enough Information" | slide | If time | 1 |
| 14 | Green · Yellow · Red | slide | MUST | 3 |
| 15 | Welcome to the City of Riscville | slide | MUST | 1 |
| 16 | Riscville Traffic Control — Communications | traffic | MUST | 2 |
| 17 | Riscville Traffic Control — HR (optional, skip if short on time) | traffic | Optional | 2 |
| 18 | Riscville Traffic Control — A Supervisor | traffic | MUST | 2 |
| 19 | Riscville Traffic Control — Risk Management | traffic | MUST | 2 |
| 20 | Guardrail Triggered · The HR Complaint | scenario | MUST | 5 |
| 21 | The Four-Question Guardrail | slide | MUST | 1 |
| 22 | Submit YOUR Real AI Dilemma | collect | Optional | 2 |
| 23 | Bonus Round 1 — The Room's Dilemma | bonus-traffic | Optional | 2 |
| 24 | Bonus Round 2 — The Room's Dilemma | bonus-traffic | Optional | 2 |
| 25 | Bonus Round 3 — The Room's Dilemma | bonus-traffic | Optional | 2 |
| 26 | You're the Communications Team | slide | MUST | 2 |
| 27 | Mission 1 · The Press Release | scenario | MUST | 6 |
| 28 | Would You Use It? | poll | Optional | 1 |
| 29 | ⚡ Fast vs. 🧠 Deep — Under Time Pressure | slide | If time | 1 |
| 30 | Mission 2 · The Storm Hits Your Members | scenario | MUST | 6 |
| 31 | Would You Use It? | poll | Optional | 1 |
| 32 | Six Questions Your Organization Must Answer | slide | If time | 1 |
| 33 | Let's Build YOUR AI Policy | slide | If time | 1 |
| 34 | Policy Question 1/4 | policy | MUST | 1 |
| 35 | Policy Question 2/4 | policy | MUST | 1 |
| 36 | Policy Question 3/4 | policy | MUST | 1 |
| 37 | Policy Question 4/4 | policy | MUST | 1 |
| 38 | Your Room's AI Principles | policy-reveal | MUST | 3 |
| 39 | How Did We Balance AI? | health-reveal | Optional | 2 |
| 40 | Final Pulse Check | poll | MUST | 1 |
| 41 | How the Room Changed | pulse-compare | MUST | 1 |
| 42 | Final Pulse Check — Readiness | poll | MUST | 1 |
| 43 | Know the Tool. Know the Edges. Build the Guardrails. | slide | MUST | 1 |
| 44 | Questions? | slide | MUST | 3 |

## Setup (Vercel environment variables)

| Variable | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | AI scoring for "Give AI The Job" and the Room's AI Principles generator (`api/evaluate.js`, Claude Haiku 4.5). |
| `ABLY_API_KEY` | Yes | Realtime voting and slide sync. |
| `RESEND_API_KEY` | For email | API key from resend.com (free tier) for the **Email Me the Data** button. |
| `REPORT_EMAIL` | For email | Where reports go, e.g. `mburleson@omag.org`. Recipients come only from here. |
| `REPORT_FROM` | Optional | Sender address on your own verified domain. Without it, Resend's test sender is used, which can only deliver to the address you signed up to Resend with. |
| `FACILITATOR_CODE` | Optional | Turns on **locked-down mode** (see below). Leave unset for the original behavior. |

### Locked-down mode (`FACILITATOR_CODE`)
Without it, `/api/config` hands the full Ably key to every phone, so a tech-savvy attendee could change slides or push fake results.
With it set:
- Phones get short-lived tokens from `/api/ably-token` that can **vote** but **cannot change slides**, push policy results or load bonus content.
- Only a console opened as `?fac=YOUR_CODE` can drive the show. Typing `mission` alone no longer unlocks the console.
- The code is removed from the address bar after loading.

**Test before turning on for the live session:** set the variable, redeploy, open `?fac=YOUR_CODE` on a laptop and the plain URL on a phone, then check the connection pill shows LIVE on both, phone votes appear on the projector, and arrow keys move the phone. To turn it off, delete the variable and redeploy.

## Pre-show checklist
- [ ] On a phone, complete one "Give AI The Job" and confirm you get a score (not "API UNAVAILABLE").
- [ ] On the Policy reveal, click **Generate Room's AI Principles** once with test votes, then reset votes.
- [ ] Scan both QR codes (title slide → app, Thank You slide → handout).
- [ ] Test your clicker on the live site.
- [ ] Click **Reset Entire Session** after testing, then confirm Session Data shows zeros.
- [ ] After the talk: download all three Session Data files.

## Files
- `index.html` — the whole app: audience, facilitator console, projector.
- `handout.html` — public attendee handout (`/handout`).
- `api/evaluate.js` — Anthropic proxy. **Must stay JavaScript**; on Aug 28 it was accidentally overwritten with a copy of `index.html`, which broke AI scoring until Oct 21.
- `api/config.js` — runtime config (Ably key, or token mode flag).
- `api/ably-token.js` — restricted Ably tokens for locked-down mode.
- `api/email-report.js` — emails the session data via Resend.
- `images/` — QR codes and model-menu screenshots (updated Oct 21 to Fable 5.1 / Opus 5.5 / Sonnet 5.5 / Haiku 4.5 and GPT-6 Instant / High / Pro).
