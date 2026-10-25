# Heritage Companion — Project Specification

> **Version:** 2.0 · **Last updated:** 2026-10-21
> **Hackathon theme:** TravelTech · Cultural Heritage & Local Exploration
>
> This document is the single source of truth for every design and
> development decision. All contributors must follow it without exception.

---

## 1. Overview

| Field | Value |
|---|---|
| **App name** | Heritage Companion |
| **Site covered** | Gurudwara Bangla Sahib, New Delhi |
| **Purpose** | Mobile tourist guide for first-time and returning visitors |
| **Platform** | Mobile-first Progressive Web App (PWA) |
| **Backend** | **None** — fully client-side |
| **Auth / Login** | **None** — no accounts, no sign-in |
| **Data source** | `src/data/sites.json` only |
| **Context** | Hackathon project — TravelTech, Cultural Heritage & Local Exploration |

---

## 2. Target Users

| Persona | Key needs |
|---|---|
| **First-time visitors** | Context, orientation, etiquette guidance |
| **Tourists** (domestic & international) | Engaging stories, maps, transport info |
| **Elderly visitors** | Large text, high contrast, slow audio, simple navigation |
| **School groups** | Hindi + English, crowd info, safety access |

---

## 3. Features

### 3.1 Story Guide
- **6 story points** covering the site's history, significance, and zones.
- Each story point contains:
  - Title (EN + HI)
  - Body text (EN + HI)
  - An image (path from `sites.json`)
  - Audio via **browser Web Speech API (text-to-speech)** — no audio files needed.
- Language toggle (English / Hindi) applies to both text and TTS voice.
- Story text is **never invented or altered** — content comes verbatim from
  `sites.json` as provided by the project author.
- Healing or spiritual beliefs are **worded as beliefs**, never as medical claims.
  Example: *"Devotees believe the sarovar's water has healing properties"* —
  not *"The water cures illness"*.
- Tone: respectful, neutral, informative. This is an active place of worship.

### 3.2 Crowd Meter + Best-Time-to-Visit Chart
- Visual indicator: **Low / Medium / High** crowd level.
- **Recharts** bar chart showing expected crowd levels by hour for the
  current day of the week.
- Data is **entirely simulated** (pre-populated per weekday in `sites.json`).
- The UI **must clearly state** "Crowd data is simulated for demonstration"
  on every screen where it is shown — no exceptions.
- Highlights the recommended low-crowd window(s).

### 3.3 Transport Guide + Fair-Fare Checker
- Lists transport modes: Metro, Auto-rickshaw, Bus, Taxi/Cab.
- Each mode shows: description, approximate fare range (INR), nearest
  pickup/drop point name.
- **Fair-Fare Checker**: user selects a transport mode; app shows the
  expected fare bracket and a tip on avoiding overcharging.
- A **Leaflet** map shows the site pin and nearby transport pickup points.
- All fare data lives in `sites.json` and is labelled "approximate".

### 3.4 Safety Tab
- **SOS button** — large, prominent, always on the Safety page.
- On tap: displays emergency contacts with **one-tap `tel:` links**.
  - Local Police (100)
  - Ambulance (108)
  - Tourist Helpline (1363)
  - Site Office (from `sites.json`)
- Works fully offline — no network call required.
- A persistent floating SOS button appears on every page for quick access.

### 3.5 Accessibility Mode
- Toggle in the Settings / navbar.
- When active:
  - **Large text** — base font size increases ~40 %.
  - **High contrast** — dark background, bright text, ≥ 7 : 1 contrast ratio.
  - **Slow audio** — TTS `rate` drops to `0.65`.
- Preference stored in `localStorage`, restored on next visit.

### 3.6 Visitor Etiquette Card
- A dedicated card / screen listing rules for respectful visiting:
  - Cover your head (cloth provided free at entrance).
  - Remove footwear before entering the Darbar Sahib.
  - No smoking, alcohol, or non-vegetarian food on premises.
  - Photography is permitted in most areas; ask before photographing people.
  - Maintain silence inside the prayer hall.
  - Langar (community kitchen) is open to all, free of charge.
- Content in both English and Hindi.
- Displayed prominently — suggested as first screen after the home page
  for first-time visitors.

---

## 4. Technical Rules

### 4.1 Stack (fixed — do not change)
| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 (utility-first, mobile-first breakpoints) |
| Routing | react-router-dom v6 |
| Maps | Leaflet + react-leaflet |
| Charts | Recharts |
| Audio | Browser Web Speech API (`window.speechSynthesis`) — no audio files |
| State | React Context + `useState` / `useReducer` (no Redux) |
| Storage | `localStorage` only |
| Data | `src/data/sites.json` — single static JSON, no external API calls |
| i18n | Custom translation system via React Context (`LanguageContext`) |

### 4.2 Folder Structure (fixed)
```
src/
├── components/      # Reusable UI components (Navbar, SOSButton, EtiquetteCard…)
├── pages/           # One file per route (HomePage, GuidePage, CrowdPage…)
├── data/            # sites.json — the only data file
├── utils/           # Pure helper functions (no side-effects)
└── context/         # AccessibilityContext, LanguageContext
```

### 4.3 Translation System
- A `LanguageContext` provides the current language (`"en"` or `"hi"`) and a
  `t(key)` helper that returns the correct string.
- All user-facing strings live in `sites.json` under bilingual keys
  (`{ "en": "...", "hi": "..." }`) or in a dedicated `translations` object.
- **No hardcoded English or Hindi strings in components** — always use `t()`.
- Language toggle is available on every screen via the Navbar.

### 4.4 Mobile-First Design Rules
- All layouts start at **320 px** and scale up with `sm:` / `md:` / `lg:`.
- **Minimum tap target:** 48 × 48 px on every interactive element.
- No hover-only interactions — all features must be touch-accessible.
- Bottom navigation bar for the five main sections.
- Avoid horizontal scrolling at any viewport width.

### 4.5 UI & UX Rules
- **Simple, clean UI** — one primary action per screen, no visual clutter.
- Two typefaces max: system sans-serif (body) + Georgia serif (headings).
- Colour palette: `heritage-*` amber scale from `tailwind.config.js`.
- High-contrast mode palette: `#0f0f0f` background, `#facc15` primary text.
- No modal dialogs except SOS confirmation.
- Every screen functional at 375 px width, 100 % zoom.

### 4.6 Content Rules (Critical)
- **Never invent facts.** All story text is provided by the project author
  and stored verbatim in `sites.json`. Do not paraphrase or summarise.
- **Spiritual / healing content** must use belief-framing language:
  - ✅ *"Devotees believe…"*
  - ✅ *"It is said that…"*
  - ❌ *"The water cures…"*
  - ❌ *"Scientifically proven to heal…"*
- **Tone:** Respectful, neutral, welcoming. Avoid superlatives or
  promotional language.
- **Simulated data disclaimer** must appear wherever crowd data is shown.

### 4.7 Accessibility Rules
- All images must have descriptive `alt` text.
- Contrast ≥ 4.5 : 1 (WCAG AA) in normal mode; ≥ 7 : 1 in accessibility mode.
- Semantic HTML throughout: `<nav>`, `<main>`, `<section>`, `<article>`,
  `<button>`.
- TTS controls (play / pause / stop) must be operable via keyboard.
- Focus ring visible on all interactive elements.

---

## 5. Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | `HomePage` | Welcome screen + etiquette prompt for first-timers |
| `/guide` | `GuidePage` | 6 story points with image + TTS audio |
| `/crowd` | `CrowdPage` | Crowd meter + best-time chart (simulated disclaimer shown) |
| `/transport` | `TransportPage` | Transport modes, fare checker, Leaflet map |
| `/safety` | `SafetyPage` | SOS button + emergency contacts |
| `/settings` | `SettingsPage` | Language toggle + Accessibility Mode |

**Bottom nav tabs (5):** Guide · Crowd · Transport · Safety · Settings

---

## 6. Data Schema — `src/data/sites.json`

```jsonc
{
  "site": {
    "id": "bangla-sahib",
    "name": { "en": "Gurudwara Bangla Sahib", "hi": "गुरुद्वारा बांग्ला साहिब" },
    "location": { "lat": 28.6270, "lng": 77.2090 },
    "address": { "en": "...", "hi": "..." },
    "description": { "en": "...", "hi": "..." },
    "heroImage": "/images/bangla-sahib-hero.jpg",

    "etiquette": [
      { "en": "Cover your head.", "hi": "सिर ढकें।" }
      // … 5 more rules
    ],

    "storyPoints": [
      {
        "id": "sp-1",
        "title": { "en": "...", "hi": "..." },
        "body":  { "en": "...", "hi": "..." },
        "image": "/images/sp-1.jpg"
        // No audioSrc — TTS used instead
      }
      // … 5 more (total 6)
    ],

    "crowd": {
      // key = JS getDay() value: "0"=Sun … "6"=Sat
      // value = array of 24 integers (0–100) representing % crowd by hour
      "0": [5,5,5,5,5,5,10,30,60,80,85,80,75,70,65,70,75,70,55,40,20,10,5,5],
      "1": [5,5,5,5,5,5,8,20,45,65,70,65,60,55,50,55,65,60,45,30,15,8,5,5],
      "2": [5,5,5,5,5,5,8,20,45,65,70,65,60,55,50,55,65,60,45,30,15,8,5,5],
      "3": [5,5,5,5,5,5,8,20,45,65,70,65,60,55,50,55,65,60,45,30,15,8,5,5],
      "4": [5,5,5,5,5,5,8,20,45,65,70,65,60,55,50,55,65,60,45,30,15,8,5,5],
      "5": [5,5,5,5,5,5,10,35,70,85,90,85,80,75,70,75,80,75,60,45,25,12,5,5],
      "6": [5,5,5,5,5,5,10,30,60,80,85,80,75,70,65,70,75,70,55,40,20,10,5,5]
    },

    "transport": [
      {
        "mode": "Metro",
        "icon": "🚇",
        "description": { "en": "Nearest station: Patel Chowk (Yellow Line)", "hi": "निकटतम स्टेशन: पटेल चौक (येलो लाइन)" },
        "fareMin": 10,
        "fareMax": 60,
        "currency": "INR",
        "tip": { "en": "Use a Metro card for cheaper fares.", "hi": "सस्ते किराये के लिए मेट्रो कार्ड का उपयोग करें।" },
        "pickupPoint": { "lat": 28.6247, "lng": 77.2096, "label": "Patel Chowk Metro" }
      }
      // … auto, bus, cab entries
    ],

    "emergency": {
      "police":          "100",
      "ambulance":       "108",
      "touristHelpline": "1363",
      "siteOffice":      "+91-11-XXXXXXXX"
    },

    "translations": {
      "en": {
        "crowdDisclaimer": "Crowd data is simulated for demonstration purposes only.",
        "fareDisclaimer":  "Fares are approximate. Always agree on the fare before boarding.",
        "sosTitle":        "Emergency Help",
        "etiquetteTitle":  "Visitor Etiquette",
        "accessibilityMode": "Accessibility Mode"
      },
      "hi": {
        "crowdDisclaimer": "भीड़ का डेटा केवल प्रदर्शन के लिए अनुकरण किया गया है।",
        "fareDisclaimer":  "किराए अनुमानित हैं। चढ़ने से पहले हमेशा किराया तय करें।",
        "sosTitle":        "आपातकालीन सहायता",
        "etiquetteTitle":  "आगंतुक शिष्टाचार",
        "accessibilityMode": "एक्सेसिबिलिटी मोड"
      }
    }
  }
}
```

---

## 7. Out of Scope (v1)

- User accounts or authentication
- Real-time crowd data from external APIs
- Audio files (Web Speech API used instead)
- Backend, database, or server-side logic
- Payment or ticketing
- Multi-site support
- Native iOS / Android app
- Push notifications

---

## 8. Definition of Done

A feature is **done** when it:

1. Works correctly on a **375 px** mobile viewport without horizontal scroll.
2. Every interactive element meets the **48 × 48 px tap target** minimum.
3. All content strings are read from `src/data/sites.json` — **zero hardcoded copy in components**.
4. Respects **Accessibility Mode** (large text, high contrast, slow TTS) when enabled.
5. Displays content in **both English and Hindi** via the `LanguageContext`.
6. Crowd data pages show the **simulated data disclaimer** visibly.
7. Spiritual/healing content uses **belief-framing language** (never factual medical claims).
8. **No console errors** in the browser on any route.
