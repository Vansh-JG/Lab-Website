# Venugopal Lab Website

A production-ready Next.js App Router site for the Venugopal Lab. The public experience showcases current research projects, publications, team members, and lab resources using content stored in Firebase. An authenticated admin workspace lets lab editors manage copy, imagery, and metadata without redeploying the site.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Admin Dashboard](#admin-dashboard)
- [Quality Checks](#quality-checks)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Features
- **Dynamic content** sourced from Firestore collections powering the home, research, publications, and team pages.
- **Admin dashboard** gated by Firebase Authentication for real-time updates to copy and media references.
- **Responsive design** with Tailwind CSS and Radix UI primitives for consistent styling across breakpoints.
- **SEO-friendly metadata** defined in the app layout for production deployments.

## Architecture
- **Frontend**: Next.js 15 + React 19 App Router application deployed as a static or serverless site.
- **Data layer**: Firebase Firestore for structured content, Firebase Storage for imagery, and Firebase Auth for admin access control.
- **Styling & UI**: Tailwind CSS v4 utility classes, Radix UI components, and shared design tokens defined in `globals.css`.

## Prerequisites
- Node.js 18 or newer
- npm 9 or newer
- Firebase project with Firestore, Storage, and Email/Password Authentication enabled

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file and provide your Firebase configuration values:
   ```bash
   cp .env.example .env.local
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables
Populate the following keys in `.env.local` using the Firebase web app credentials from your project settings. Do not commit `.env.local` to source control.

```ini
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

If you deploy to a hosting provider such as Vercel, mirror these variables in the platform's environment configuration.

## Admin Dashboard
- Navigate to `/admin` and sign in with a Firebase-authenticated email/password account.
- Use the section selector to manage Home, Research, Publications, and Team content.
- When adding new research projects or team members, upload supporting imagery to the `public` directory (or your chosen CDN) using the sanitized filenames shown in the form.
- Publication entries accept either an external URL or a PubMed ID, which generates a PubMed link automatically.

## Quality Checks
Run linting before committing to keep the codebase consistent:
```bash
npm run lint
```

## Deployment
1. Create a production build and verify it locally:
   ```bash
   npm run build
   npm run start
   ```
2. Configure Firebase environment variables in your hosting provider (e.g., Vercel project settings).
3. Review Firebase Firestore and Storage security rules to restrict write access to trusted admin users.
4. Deploy the branch. For Vercel, push to the default branch or trigger a deployment via the dashboard.

## Project Structure
```
src/
├─ app/              # App Router pages, layouts, and API routes
├─ components/       # Reusable UI primitives and admin panels
├─ lib/              # Firebase initialization and shared utilities
└─ styles/           # Global styles and design tokens
public/
└─ Hero/, team/, ... # Static assets referenced by Firestore documents
```

## Troubleshooting
- **Authentication fails**: Ensure Email/Password sign-in is enabled in Firebase and the user exists.
- **Content does not update**: Verify Firestore rules allow reads for public documents and that the admin panel shows successful writes.
- **Missing images**: Confirm files are uploaded to `public` or that external URLs are reachable.

## Contributing
1. Fork the repository and create a descriptive feature branch.
2. Make your changes and run `npm run lint`.
3. Submit a pull request describing the updates and any manual testing performed.
