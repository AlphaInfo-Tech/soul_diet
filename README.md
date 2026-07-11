# SOUL DIET — Event Registration Website

Single-page marketing site + 3-stage registration flow for the Soul Diet
wellness event. Next.js (App Router) + Tailwind CSS v4 on the frontend;
Google Sheets + Google Drive (via a Google Apps Script Web App) as the
backend of record — no database.

## Stack

- Next.js (App Router, Node runtime API routes) — deployed on Vercel
- Tailwind CSS v4 (theme colors/fonts in [src/app/globals.css](src/app/globals.css))
- `jspdf` for the client-side "Download Summary as PDF" button
- Google Apps Script Web App as the API bridge to Sheets/Drive (see
  [google-apps-script/Code.gs](google-apps-script/Code.gs))

## Prerequisites

- Node.js 18.18+ and npm
- A Google account (for the Sheet + Apps Script)
- A GitHub account and a Vercel account (for deployment)

---

## Setup guide

Do these in order — each step depends on the one before it.

### Step 1 — Install and run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The site will load, but registration submissions
will fail until Steps 2–4 are done (there's no backend to write to yet).

### Step 2 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new,
   blank spreadsheet.
2. Name it something like **Soul Diet — Registrations**.
3. Leave it empty — the script in Step 3 creates the tab, headers, and Drive
   folder automatically the first time someone registers.

You will **not** use this Sheet's own share link anywhere in this project —
keep reading, the URL you actually need comes from Step 4.

### Step 3 — Add the Apps Script

1. In the Sheet, go to **Extensions → Apps Script**. A new tab opens with a
   blank script editor.
2. Delete everything in the default `Code.gs` file.
3. Open [google-apps-script/Code.gs](google-apps-script/Code.gs) in this
   repo, copy its entire contents, and paste it into the Apps Script editor.
4. Click the **Save** icon (or `Ctrl+S`).

### Step 4 — Deploy the script as a Web App

This produces the URL the Next.js app will call.

1. Top right of the Apps Script editor: **Deploy → New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Fill in:
   - Description: `Soul Diet API` (anything you like)
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**.
5. Google will ask you to authorize the script (it needs permission to write
   to Sheets and Drive on your behalf). Click **Authorize access**, choose
   your Google account, then click **Advanced → Go to [project name] (unsafe)**
   → **Allow**. This warning appears because the script isn't published
   publicly — it's expected and safe since you wrote/reviewed the code.
6. Copy the **Web app URL** shown after deployment. It looks like:

   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

   ⚠️ This is **not** the same as the Sheet's own URL. The Sheet's URL looks
   like `https://docs.google.com/spreadsheets/d/.../edit` — that one is for
   *you* to open the spreadsheet in a browser; it's not an API endpoint and
   won't work here. Make sure you're copying the `script.google.com/.../exec`
   link from the deployment dialog, not the address bar of the Sheet tab.

If you ever change the script's code, you must **Deploy → Manage deployments
→ Edit (pencil icon) → New version → Deploy** for the change to go live —
saving the file alone does not update the deployed `/exec` URL's behavior.

### Step 5 — Set the environment variable

1. Copy `.env.local.example` to a new file named `.env.local`.
2. Set the variable to the `/exec` URL you copied in Step 4:

   ```
   GOOGLE_APPS_SCRIPT_WEB_APP_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```

3. Restart `npm run dev` if it was already running (env vars are only read
   on startup).

### Step 6 — Replace the payment QR code

Replace [public/qr-code.svg](public/qr-code.svg) (currently a placeholder)
with your real UPI QR code image. If you swap in a `.png`/`.jpg` instead of
an `.svg`, update the `src` in
[src/components/register/Stage3Payment.tsx](src/components/register/Stage3Payment.tsx)
to match the new filename.

### Step 7 — Test the full flow locally

1. With `npm run dev` running and `.env.local` set, go to
   http://localhost:3000/register.
2. Fill out all 3 stages and submit with a real image as the payment
   screenshot.
3. Confirm:
   - The success screen shows a `SOULDIET-2026-XXXX` registration number.
   - A new row appears in the Google Sheet's `Registrations` tab.
   - A `SoulDiet_Payment_Screenshots` folder appears in your Google Drive
     with the uploaded screenshot, and its link is in column P of the Sheet.
   - "Download Summary as PDF" produces a correct one-page PDF.

If the submission fails, check the terminal running `npm run dev` for the
error Next.js logged, and double-check the URL from Step 4/5.

---

## Deploying to production (Vercel)

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project**, import the GitHub repo.
3. Before the first deploy, add the environment variable: **Settings →
   Environment Variables** → add `GOOGLE_APPS_SCRIPT_WEB_APP_URL` with the
   same `/exec` value from Step 4 above (add it for Production, Preview, and
   Development).
4. Deploy.
5. Repeat the Step 7 test against your live `*.vercel.app` URL before
   sharing the link publicly (e.g. in an Instagram bio).

## Project structure

```
src/app/                 landing page, /register, /api/register
src/components/landing/  landing page sections
src/components/register/ 3-stage form, progress indicator, success screen
src/lib/                 shared types, constants, validation, PDF generator
google-apps-script/      Code.gs — paste into the Apps Script editor
```
