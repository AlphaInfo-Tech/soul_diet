# SOUL DIET — Brand Website + Event Registration

Marketing website (Home / About / Services / Gallery / Testimonial /
Contact Us) plus the 3-stage registration flow for the Soul Diet wellness
event. Next.js (App Router) + Tailwind CSS v4 on the frontend; Google Sheets
+ Google Drive (via a Google Apps Script Web App) as the backend of record —
no database.

## Routes

| Route | What it is |
|---|---|
| `/` | Brand homepage — condensed sections linking to the deep pages |
| `/about` | Gayathri's story, the practices she follows, self-enquiry questions |
| `/services` | The five offerings in full, precautions, benefits, FAQs |
| `/gallery` | Full photo grid with a keyboard-accessible lightbox |
| `/testimonials` | Participant stories (**placeholders — see below**) |
| `/contact` | Contact form + direct channels + community links |
| `/event` | The Sound Healing + Ice Bath event landing page |
| `/register` | 3-stage registration funnel (no site nav — deliberately focused) |
| `/one-to-one` | 2-step consultation booking — details, then date + time slot |

Everything except `/register` and `/one-to-one` lives in the `src/app/(site)/`
route group, which supplies the shared header and footer. `(site)` is a route
group, so it does not appear in URLs.

## Content you must replace before launch

All marketing copy lives in one file:
[src/lib/site-content.ts](src/lib/site-content.ts). Search it for `TODO` —
every placeholder is marked. At minimum you need to fill in:

- `CONTACT` — phone, email, WhatsApp, Instagram, and the city/address
- `TESTIMONIALS` — every entry is a labelled placeholder right now
- The `one-to-one` service — confirm it is actually offered

Event, ticket and payment facts stay in
[src/lib/constants.ts](src/lib/constants.ts) — don't duplicate them into
`site-content.ts`.

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

### Step 5 — Set the environment variables

1. Create a file named `.env.local` in the project root.
2. Set the Apps Script variable to the `/exec` URL you copied in Step 4, and
   the site URL to wherever the site is served from:

   ```
   GOOGLE_APPS_SCRIPT_WEB_APP_URL=https://script.google.com/macros/s/AKfycb.../exec
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   `NEXT_PUBLIC_SITE_URL` is read at **build time** for canonical URLs,
   `sitemap.xml` and Open Graph tags — set it to the real domain in Vercel
   (e.g. `https://souldiet.in`), not localhost.

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

### Step 8 — Test the contact form

The contact form posts to `/api/contact`, which relays to the same Apps
Script Web App with `type: "contact_enquiry"`.

⚠️ **This requires re-deploying the script.** `Code.gs` now handles a third
payload type, and saving the file is not enough — go to **Deploy → Manage
deployments → Edit (pencil) → New version → Deploy**. Until you do, contact
submissions fail with `"Invalid ticket selection."` because the old deployed
version falls through to the registration branch.

Once redeployed:

1. Submit the form at http://localhost:3000/contact.
2. Confirm a row appears in the Sheet's new `Contact Enquiries` tab.

### Step 9 — Set up one-to-one bookings (Google Calendar)

`/one-to-one` books an hour-long consultation and writes it straight to a
Google Calendar. There are no extra credentials to manage: Apps Script's
built-in `CalendarApp` runs as whichever account owns the script.

**Slots are hourly, 9:00 AM to 5:00 PM IST (the last one ends at 6:00 PM),
bookable from tomorrow up to 30 days ahead.** To change that, edit
`SLOT_START_HOURS` / `BOOKING_WINDOW_DAYS` in
[src/lib/one-to-one.ts](src/lib/one-to-one.ts) — the form and the server-side
check both read from there.

1. **Pick the calendar.** Use your own, or make a dedicated one in Google
   Calendar (**Other calendars → + → Create new calendar**).
2. **Copy its ID.** Calendar settings → **Integrate calendar** → **Calendar
   ID**. It looks like `abc123…@group.calendar.google.com`, or is simply your
   email address for your default calendar.
3. **Paste it into `Code.gs`**, into the `ONE_TO_ONE_CALENDAR_ID` constant near
   the top. The account running the script must have edit rights on that
   calendar — if it doesn't, bookings fail with a "calendar not found" message.
4. **Redeploy** (see the warning below), then submit one test booking. Apps
   Script will show a one-time authorisation prompt the first time it touches
   your calendar — accept it.

⚠️ **Redeploying is required, again.** `Code.gs` now handles two more payload
types (`one_to_one_lead`, `one_to_one_booking`). Saving the file is not enough
— **Deploy → Manage deployments → Edit (pencil) → New version → Deploy**.
Until you do, one-to-one bookings fail because the old deployed version falls
through to the registration branch.

Confirm afterwards:

- A `One-to-One Bookings` tab appears in the Sheet.
- Completing **step 1 only** and closing the tab leaves a row with
  `Status = Lead` and no appointment — that's the lead capture.
- Completing both steps flips the same row to `Status = Confirmed`, fills in
  the date/slot, and puts the event on the calendar at the right IST time.
- Booking a slot that is already taken is refused with "That time slot has
  just been booked" rather than double-booking you.

---

## Deploying to production (Vercel)

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project**, import the GitHub repo.
3. Before the first deploy, go to **Settings → Environment Variables** and add
   (for Production, Preview, and Development):
   - `GOOGLE_APPS_SCRIPT_WEB_APP_URL` — the `/exec` value from Step 4
   - `NEXT_PUBLIC_SITE_URL` — the real public origin, e.g.
     `https://souldiet.in`. This one is baked in at build time, so changing it
     later requires a redeploy.
4. Deploy.
5. Repeat the Step 7 and Step 8 tests against your live URL before sharing the
   link publicly (e.g. in an Instagram bio).

## Project structure

```
src/app/(site)/          brand pages — /, /about, /services, /gallery,
                         /testimonials, /contact, /event (shared header/footer)
src/app/register/        3-stage registration funnel (no site nav)
src/app/api/             /register, /register-lead, /contact route handlers
src/app/sitemap.ts       generated sitemap.xml
src/app/robots.ts        generated robots.txt
src/components/site/     header, footer, page hero, service/testimonial cards,
                         gallery lightbox
src/components/landing/  event page sections (also reused on the homepage)
src/components/register/ 3-stage form, progress indicator, success screen
src/components/contact/  contact form
src/lib/site-content.ts  ALL marketing copy — edit here, not in components
src/lib/                 shared types, constants, validation, PDF generator
google-apps-script/      Code.gs — paste into the Apps Script editor
```

## Assets still needed

The Drive folder's contents could not be pulled automatically. Drop these in
when you have them:

- `public/founder.jpg` — portrait of Gayathri for the About page
- additional `public/gallery/*.jpg` (add them to `GALLERY_PHOTOS` in
  `src/lib/site-content.ts`)
- `public/og-image.jpg` — 1200×630 social preview image
