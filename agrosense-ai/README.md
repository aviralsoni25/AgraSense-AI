# AgroSense AI

Production-grade agritech intelligence platform built with Next.js 15 for the Google Build with AI Solution Challenge 2026.

## Core Stack

- Next.js 15 App Router + TypeScript
- Tailwind CSS + shadcn-style components
- Framer Motion animations
- Firebase Auth + Firestore + Storage + FCM hooks
- Google Gemini API (vision + reasoning + assistant)
- Google Maps JavaScript API
- Open-Meteo API (free hyperlocal weather)
- Recharts analytics dashboard
- PWA support with service worker

## Features

- AI crop disease detection (Gemini Vision)
- Voice assistant (Hindi / English / Hinglish)
- Hyperlocal weather intelligence
- Crop recommendation engine
- Outbreak heatmap with reporting
- Government scheme discovery
- Reports with PDF + CSV exports
- Demo mode + offline cache fallback

## Project Structure

```text
agrosense-ai/
  app/
  components/
  hooks/
  lib/
  public/
  styles/
  types/
```

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Fill Firebase + Gemini + Google Maps keys

```bash
cp .env.example .env.local
```

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint project
- `npm run typecheck` - run TypeScript checks

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables from `.env.example`
4. Deploy

### Firebase Hosting (optional)

You can deploy the built app behind Firebase Hosting + optional Firebase services.

## Notes

- If Firebase env vars are not provided, app runs in demo mode for auth/data flows.
- If Gemini key is missing, APIs return safe fallback insights.
- If Google Maps key is missing, heatmap page shows configuration fallback message.
- For Firebase Cloud Messaging, set `NEXT_PUBLIC_FIREBASE_VAPID_KEY` and update `public/firebase-messaging-sw.js` placeholders with your Firebase config.
