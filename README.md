# Heritage Companion

A mobile-friendly visitor guide to Gurudwara Bangla Sahib in New Delhi, created for the Cypher Hackathon. Explore the site's heritage, plan local transport, and find practical visitor and safety information.

## Features

- English and Hindi content
- Heritage stories with browser text-to-speech
- Interactive site and transport maps
- Crowd information and best-time-to-visit chart (demonstration data)
- Transport guidance and approximate fare ranges
- Visitor etiquette guidance
- Safety information and quick access to emergency contacts
- Accessibility options

## Run locally

### Requirements

- Node.js and npm

### Setup

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal to view the website.

## Build

```bash
npm run build
npm run preview
```

## Tech stack

React, Vite, Tailwind CSS, Leaflet, and Recharts.

## Notes

Crowd levels are simulated for demonstration. Transport fares are approximate. Text-to-speech uses the browser's Web Speech API and available voices.
