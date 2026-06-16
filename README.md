# Smart Serve — Ghar Ka Hisaab 🏠

> **Family Home Inventory Tracker** — Manage your household essentials in 11 Indian languages, right from your browser.

Smart Serve is a lightweight, offline-capable Progressive Web App (PWA) that helps Indian families track groceries, manage shopping lists, monitor budgets, and get alerted before items expire — with full support for voice input and barcode scanning.

---

## Features

**Inventory Management**
Track household items with quantities, units, and low-stock warnings. Items are auto-matched with emojis for quick recognition (flour 🌾, milk 🥛, spices 🌿, and more).

**Shopping List**
Automatically surfaces low-stock inventory items into a dedicated shopping list. Share your list via WhatsApp or native share.

**Budget & Expense Tracker**
Log daily household expenses by category (Grocery, Vegetables, Dairy, Cleaning, Other). See monthly totals and compare against a set budget.

**Expiry Tracker**
Add items with their expiry dates and get color-coded alerts — green for safe, amber for expiring soon, red for expired.

**Family Profiles**
Create multiple named profiles with custom avatars and optional PIN protection. Each profile maintains its own separate inventory, shopping list, expenses, and expiry data.

**Barcode Scanner**
Scan product barcodes using your device camera to quickly add items to inventory.

**Voice Input**
Add items hands-free using the microphone button. Uses the Web Speech API, so voice recognition matches your selected language.

**11 Indian Languages**
Switch the entire UI between:

| Language   | Script     |
|------------|------------|
| English    | Latin      |
| Hindi      | हिन्दी     |
| Punjabi    | ਪੰਜਾਬੀ    |
| Tamil      | தமிழ்      |
| Telugu     | తెలుగు     |
| Kannada    | ಕನ್ನಡ      |
| Malayalam  | മലയാളം    |
| Marathi    | मराठी      |
| Gujarati   | ગુજરાતી   |
| Bengali    | বাংলা      |
| Odia       | ଓଡ଼ିଆ     |

**Offline / PWA Support**
A service worker caches all assets on first load. The app works fully offline after that and can be installed on your home screen like a native app.

---

## File Structure

```
smart-serve-main/
├── index.html        # App shell and HTML structure
├── app.js            # All application logic (profiles, inventory, budget, expiry, scanner, voice)
├── i18n.js           # Translations for all 11 languages
├── style.css         # Styling and responsive layout
├── manifest.json     # PWA manifest (name, icons, theme)
└── serviceworker.js  # Offline caching (cache-first strategy)
```

---

## Getting Started

Smart Serve is a static web app — no build step, no server required.

**Option 1 — Open directly**

Just open `index.html` in any modern browser (Chrome recommended for full voice and camera support).

**Option 2 — Serve locally**

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .
```

Then visit `http://localhost:8080`.

**Option 3 — Deploy**

Upload all files to any static hosting service (GitHub Pages, Netlify, Vercel, etc.). HTTPS is required for the camera and voice features to work.

---

## Browser Compatibility

| Feature         | Chrome | Firefox | Safari |
|-----------------|--------|---------|--------|
| Core app        | ✅     | ✅      | ✅     |
| Voice input     | ✅     | ❌      | Partial|
| Barcode scanner | ✅     | ✅      | ✅     |
| PWA install     | ✅     | ❌      | ✅ (iOS 16.4+) |
| Offline support | ✅     | ✅      | ✅     |

> Voice input uses the Web Speech API, which is best supported in Chrome/Chromium browsers.

---

## Data Storage

All data is stored locally in the browser using `localStorage`. Nothing is sent to any server. Each family profile stores its own isolated data under a unique key prefix (`ss_<profileId>_*`).

---

## Tech Stack

- Vanilla JavaScript (no frameworks)
- HTML5 / CSS3
- Web Speech API (voice input)
- MediaDevices API (barcode scanning via camera)
- Service Worker + Web App Manifest (PWA)
- localStorage (data persistence)

---

## License

This project is intended for personal and family use. Please check with the author before redistributing or using commercially.
