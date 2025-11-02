# Venugopal Lab Website

A production-focused [Next.js](https://nextjs.org/) App Router site for the Venugopal Lab showcasing research projects, publications, team members, and lab resources. The public experience is fed by Firebase data, while an authenticated admin dashboard enables designated editors to update content without touching the codebase.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Local Development](#local-development)
- [Admin Dashboard](#admin-dashboard)
- [Quality Checks](#quality-checks)
- [Production Build & Deployment](#production-build--deployment)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

## Features
- **Dynamic content** sourced from Firestore collections for the home, research, publications, and team pages.
- **Admin dashboard** gated by Firebase Authentication for real-time content updates.
- **Responsive design** built with Tailwind CSS and Radix UI primitives for consistent styling across breakpoints.
- **SEO-friendly metadata** defined in the global layout and ready for production deployments.
- **Type-safe forms** and validation to guide editors when entering research, publication, and team data.

## Tech Stack
- [Next.js 15](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [Firebase](https://firebase.google.com/) (Auth, Firestore, Storage)
- [Tailwind CSS](https://tailwindcss.com/) 4 + [Radix UI](https://www.radix-ui.com/)
- TypeScript

## Prerequisites
- Node.js 18+
- npm 9+
- Firebase project with Firestore, Storage, and Email/Password Auth enabled

## Environment Configuration
1. Create a Firebase web app and retrieve the configuration from the project settings.
2. Copy `.env.example` to `.env.local` and populate each value:

   ```ini
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

   Configure the same environment variables in your hosting provider (e.g., Vercel) before deploying the site.

3. (Optional) Update Firebase Security Rules so only authenticated admins can write to the relevant collections.

## Local Development
Install dependencies and start the development server with hot reloading:

```bash
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

## Admin Dashboard
- Navigate to `/admin` and sign in with an email/password credential registered in Firebase Auth.
- Use the section selector to manage Home, Research, Publications, and Team content.
- When adding research projects or team members, upload the referenced images to the `public` directory using the sanitized filenames provided by the form.
- Publication entries support direct URLs or auto-generated PubMed links when a PMID is supplied.

## Quality Checks
Run linting before committing to ensure code quality:

```bash
npm run lint
```

## Production Build & Deployment
Create an optimized build and verify it locally:

```bash
npm run build
npm run start
```

To deploy:
- Push the repository to your preferred hosting provider (Vercel recommended for Next.js projects).
- Configure the Firebase environment variables in the hosting environment.
- Ensure your Firebase Security Rules restrict public write access while allowing public reads where appropriate.

## Project Structure
```
src/
├─ app/              # App Router pages, layouts, and API routes
├─ components/       # Shared UI and admin components
├─ lib/              # Firebase initialization and shared utilities
└─ styles/           # Global styles
public/
└─ Hero/, team/, ... # Static assets referenced by Firestore documents
```

## Available Scripts
- `npm run dev` – start the local development server
- `npm run build` – create an optimized production build
- `npm run start` – run the production server locally
- `npm run lint` – run ESLint against the project

## Contributing
1. Fork the repository and create a feature branch.
2. Make your changes, add tests or lint checks where applicable.
3. Submit a pull request with a clear description of the updates and testing performed.

