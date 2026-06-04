# Startup Showcase

A modern web platform for entrepreneurs to showcase their startup ideas and get feedback from the community. Built with Next.js 16, featuring server components, server actions, and view transitions.

## Core Features

- 🚀 Create and showcase startup pitches with rich markdown content
- 👥 Founder profiles stored in Sanity
- 🔐 Sanity-backed author sign-up and sign-in
- 🔍 Real-time search and filtering of startups by category
- 📊 View tracking for startup presentations
- 💫 Smooth page transitions and modern UI animations
- 📱 Fully responsive design with a mobile-first approach

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database & CMS**: Sanity.io
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Content**: MDEditor for rich pitch editing

## Running Locally

1. Clone the repository:

```bash
git clone https://github.com/yourusername/startup-showcase.git
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy `.env.example` to `.env.local` and update the variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
pnpm dev
```

5. nGrok:

```bash
pnpm dlx ngrok http --url=ngrok-url 3000
```

## Environment Variables

Required environment variables:

- `AUTH_SECRET`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_WRITE_TOKEN`

## Project Structure

- `app/*` - All app routes and API endpoints
- `components/*` - Reusable UI components
- `lib/*` - Utility functions and server actions
- `sanity/*` - Sanity.io schema and configuration
- `public/*` - Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
