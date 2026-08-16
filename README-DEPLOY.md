# GG Tracker — Self-Hosted PWA

Your training tracker as a standalone web app. Data lives in YOUR browser's
localStorage on YOUR device — app updates can never touch it (verified by test).

## Files
- index.html — app shell + localStorage adapter + service-worker registration
- app.js — the entire app, React included, minified (~220 KB)
- sw.js — offline cache (bump VERSION on each deploy)
- manifest.webmanifest, icon-180.png, icon-512.png — installability + temple icon

## Deploy on Render (your existing stack, ~10 min)
1. New GitHub repo (e.g. `gg-tracker`); add these 6 files at the root; push.
2. Render dashboard → New → **Static Site** → pick the repo.
   - Build command: (leave empty)   ·   Publish directory: `.`
3. Deploy → permanent URL like `https://gg-tracker.onrender.com`. Free tier is fine.

Alternative: Netlify → "Deploy manually" → drag this folder in.

## Install on iPhone
Open the URL in Safari → Share → **Add to Home Screen**.
Full-screen, dark, works offline after first load.

## First open
The app greets you with "Fresh copy — bring your history over":
paste your latest backup JSON (any older copy: Setup → Copy backup) → Restore.
That's the last migration you will ever do.

## Updating the app later
1. Claude hands you a new app.js (and any changed files).
2. Bump VERSION in sw.js (gg-v1 → gg-v2).
3. Commit + push (Render auto-deploys). Open the app — new version arrives on
   the next launch. Your data is untouched by design: it lives at localStorage
   `gg:*` keys, not in the app files.

## Data safety model (three layers)
1. localStorage on your device — survives every update.
2. Daily snapshot the app saves on its own (Setup → Recover snapshot).
3. Weekly manual backup → paste into your vault. This is the layer that
   survives a lost phone or clearing Safari website data — keep the ritual.
