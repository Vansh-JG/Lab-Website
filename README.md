# Venugopal Lab Website

This repository contains the Venugopal Lab website built with Next.js and Firebase. The public pages surface research projects, publications, team members, and lab resources, while an admin area lets authorized editors manage the content.

## Requirements
- Node.js 18 or newer
- npm 9 or newer
- A Firebase project with Firestore, Storage, and Email/Password Authentication enabled

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in the Firebase configuration values from your project settings.
3. Start the development server:
   ```bash
   npm run dev
   ```
   The site runs at [http://localhost:3000](http://localhost:3000).

The admin dashboard is available at `/admin` and requires a Firebase-authenticated user account.

## Available Scripts
- `npm run dev` – start a local development server
- `npm run build` – create a production build
- `npm run start` – serve the production build locally
- `npm run lint` – run ESLint checks

## Deployment
1. Run the production build locally to ensure it succeeds:
   ```bash
   npm run build
   npm run start
   ```
2. Deploy the project to your hosting provider (Vercel is recommended for Next.js).
3. Configure the same Firebase environment variables in your hosting environment.
4. Review your Firebase Security Rules so only trusted users can modify data.

## Project Structure
```
src/
├─ app/          # App Router pages, layouts, and API routes
├─ components/   # Shared UI and admin components
├─ lib/          # Firebase initialization and helpers
└─ styles/       # Global styles
public/
└─ assets used across the site
```
