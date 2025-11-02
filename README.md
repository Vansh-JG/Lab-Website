# Venugopal Lab Website

A production-ready Next.js (App Router) site for the Venugopal Lab highlighting research projects, publications, team members, and lab resources. The public site consumes content stored in Firebase, while an authenticated admin dashboard allows designated editors to manage copy and media.

## Features
- **Dynamic content** sourced from Firestore collections for home, research, publications, and team pages.
- **Admin dashboard** gated by Firebase Authentication for updating lab content in real time.
- **Responsive design** built with Tailwind CSS and Radix UI primitives for consistent styling across breakpoints.
- **SEO-friendly metadata** configured in the global layout for production deployments.

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

   These variables must also be configured in your hosting provider (e.g., Vercel) before deploying the site.

## Local Development
Install dependencies and start the development server with hot reloading:

```bash
npm install
npm run dev
```

The site is available at [http://localhost:3000](http://localhost:3000).

## Admin Dashboard
- Navigate to `/admin` and authenticate with an email/password credential registered in Firebase Auth.
- Use the section selector to manage Home, Research, Publications, and Team content.
- When adding research projects or team members, upload corresponding images to the `public` directory following the sanitized filenames shown in the form.
- Publication entries support direct URLs or auto-generated PubMed links when a PMID is provided.

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
- Push the repository to your preferred hosting provider (Vercel recommended for Next.js).
- Configure the Firebase environment variables in the hosting environment.
- Ensure your Firebase Security Rules restrict read/write access appropriately for public and admin routes.

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

## Contributing
1. Fork the repository and create a feature branch.
2. Make your changes, add tests or lint checks where applicable.
3. Submit a pull request with a clear description of the updates and testing performed.

