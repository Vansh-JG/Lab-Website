# Venugopal Lab Website

A Next.js App Router site for the Venugopal Lab showcasing current research projects, publications, team members, and resources. The public site is backed by Firebase for data storage, while an authenticated admin area allows content updates.

## Prerequisites

- Node.js 18+
- npm 9+
- Firebase project with Firestore, Storage, and Auth enabled

## Environment Setup

1. Copy `.env.example` to `.env.local` and supply the Firebase configuration values from your project dashboard.
2. Install dependencies:

   ```bash
   npm install
   ```

## Development

Run a local development server with hot reloading:

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Quality Checks

Before committing, run linting to ensure code quality:

```bash
npm run lint
```

## Production Build

Create an optimized production build and start the server locally:

```bash
npm run build
npm run start
```

Deploy the contents of the `.next` build output using your preferred hosting provider (e.g., Vercel). Ensure the Firebase environment variables are configured in your hosting environment prior to deployment.
