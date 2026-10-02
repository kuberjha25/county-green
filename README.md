# County Green — Channel Partner App

React Native (Expo) app rebuilt screen-for-screen from the County Green Figma file.
No backend — everything runs off `data.js`.

## Run it

```bash
npm install
npx expo start
```

Scan the QR with Expo Go, or press `i` / `a` for a simulator.

**Demo OTP is `123456`** (shown on the verification screen).

## What's where

```
app/                      expo-router file-based routes — one file per Figma screen
  index.js                splash                         county-green-screen-01
  (auth)/
    login.js              login / register               county-green-screen-02
    otp.js                verification code              county-green-screen-03
    partner-type.js       partner type + basic info      county-green-screen-04
    professional-details  company, RERA, uploads         county-green-screen-05
    experience-social.js  local experience + socials     county-green-screen-06
    success.js            thank you for sign up          county-green-screen-08
  (tabs)/
    index.js              home dashboard                 county-green-screen-34
    leads.js              leads list                     county-green-leads-list
    visits.js             project visits                 county-green-screen-23
    inventory.js          inventory grid                 county-green-inventory
    profile.js            my profile                     my-profile
  leads/new.js            new lead form                  lead-detail-screen (153:2454)
  leads/[id].js           lead detail + update modal     lead-detail-screen, lead-update-popup
  visits/new.js           schedule visit                 schedule-visit-screen
  visits/[id].js          visit detail                   county-green-screen-24
  registrations/          list + detail                  screens 10 & 11
  inventory/[id].js       unit detail                    county-green-screen-36
  project/[id].js         project detail                 project-detail-screen
  documents.js            documents                      county-green-screen-37
  news/                   news list + article            screens 38 & 39
  mis.js                  MIS report                     mis-report-screen
  notifications.js        notifications                  meraqui-notifications-screen
  about.js                about us                       county-green-about-screen
  terms.js                terms & conditions             county-green-screen-42

data.js                   ALL dummy data — leads, visits, registrations, inventory,
                          project, documents, news, notifications, MIS, profile, copy
src/theme.js              colours, fonts, radii, shadows, type scale (all from Figma)
src/store.js              in-memory store over data.js (React context)
src/components/ui.js      shared primitives: Card, Badge, Input, Select, FilterChips,
                          ScreenHeader, Avatar, InfoRow, Sheet, ProgressBar …
assets/images/            photos, logo lockup and logo mark exported from Figma
```

## Fonts

`src/theme.js` is the only file that names a font. Right now:

- **sans** — Inter (confirmed from the Figma text styles)
- **serif** — Playfair Display, a stand-in for the brand display serif

To swap in the real font:

1. Drop the `.ttf` files into `assets/fonts/`
2. Register them in `app/_layout.js`, e.g.
   `'CountyGreen-Regular': require('../assets/fonts/CountyGreen-Regular.ttf')`
3. Point `fonts.serif` / `fonts.serifBold` / etc. in `src/theme.js` at the new names

Nothing else needs to change.

## Icons

The icons in the Figma file are Lucide. The app uses `lucide-react-native`, so the
glyphs are identical to the design but can be recoloured and resized per state
instead of shipping ~100 colour-baked SVGs.

## What's interactive

Because there's no backend, the store holds a mutable copy of `data.js` for the life
of the app session. Restarting resets it.

- Login accepts any 10-digit number; OTP is `123456`
- The full registration flow writes a new **Pending** row into Registrations
- **New Lead** adds a lead with a seeded history entry and opens its detail screen
- **Update Status** on a lead changes type / status / follow-up date and appends to
  the lead's History timeline
- **Schedule Visit** creates a visit (pre-filled when opened from a lead) and opens it
- **Mark as Attended** flips a visit's status
- Search and filter chips work on Leads, Visits, Inventory, Documents, News,
  Registrations
- Notifications: unread dots + "Mark all as read"
- Phone/email rows open the dialer and mail client
- Download buttons and "Request availability" show a confirmation — they're the
  hook points for the real API

## Known gaps

- Document downloads, report exports and image upload are stubs
- Project detail shows live inventory availability (26) rather than the static 48
  printed in that Figma frame, so the number agrees with the Inventory screen
