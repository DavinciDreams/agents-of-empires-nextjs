# ⚠️ DEPRECATED - Incomplete Next.js Migration

**This project is an incomplete alternative Next.js migration attempt and is no longer maintained.**

Please use the **completed Next.js migration** instead:
- **Local path**: `../agents-of-empires/`
- **GitHub**: https://github.com/DavinciDreams/agents-of-empires

## Why This Project is Deprecated

The `agents-of-empires-nextjs/` directory contains an incomplete attempt to migrate the original Vite-based application to Next.js. This migration was not completed, and a separate, fully functional Next.js migration exists in the `agents-of-empires/` directory.

## Where to Go Instead

### Completed Next.js Migration (Recommended)
- **Location**: `agents-of-empires/`
- **GitHub**: https://github.com/DavinciDreams/agents-of-empires
- **Status**: ✅ Fully functional and maintained

### Original Vite Version
- **Location**: `deepagentsjs/apps/agents-of-empire/`
- **Status**: Original implementation

---

# Agents of Empires - Next.js (Original Documentation Below)


A Next.js application featuring an interactive 3D game experience built with Three.js, React Three Fiber, and deepagents AI integration.

## Overview

This is a Next.js port of the original Vite-based Agents of Empires application. It provides a modern, production-ready framework for deploying the 3D game experience with server-side rendering capabilities.

## Tech Stack

- **Framework**: Next.js 15
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei, React Three Postprocessing
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **AI Integration**: deepagents (workspace dependency)
- **TypeScript**: Full type safety

## Prerequisites

- Node.js 18+ or 20+
- pnpm (package manager)
- A monorepo setup with the deepagents workspace dependency

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd deepagentjs
```

### 2. Install dependencies

Since this is part of a monorepo, install dependencies from the root:

```bash
pnpm install
```

This will install all dependencies including the workspace `deepagents` package.

### 3. Environment Variables

Create a `.env.local` file in the `agents-of-empires-nextjs` directory:

```bash
cp .env.example .env.local
```

Add your environment variables (refer to `.env.example` for required variables):

```env
# Example environment variables
OPENAI_API_KEY=your_openai_api_key_here
# Add other required variables as needed
```

**Important**: Never commit `.env.local` to version control. It is already included in `.gitignore`.

## Development

### Start the development server

```bash
cd agents-of-empires-nextjs
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Development Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking

### Hot Reload

Next.js provides fast refresh for React components. Changes to your code will automatically reflect in the browser without a full page reload.

## Project Structure

```
agents-of-empires-nextjs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── game/              # Game pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── core/             # Core game components
│   ├── entities/         # Game entities (agents, structures, etc.)
│   ├── ui/               # UI components
│   ├── world/            # World/terrain components
│   ├── bridge/           # Bridge components
│   └── landing/          # Landing page components
├── lib/                  # Utility libraries
│   └── store/            # State management stores
├── hooks/                # Custom React hooks
├── public/               # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── .env.example
```

## Key Features

- **3D Game Engine**: Built with Three.js and React Three Fiber
- **AI Agents**: Deepagents integration for intelligent agent behavior
- **Interactive World**: Dynamic terrain and entity interactions
- **Modern UI**: Tailwind CSS for responsive design
- **Type Safety**: Full TypeScript support
- **Server-Side Rendering**: Next.js SSR capabilities for better performance and SEO

## Building for Production

```bash
cd agents-of-empires-nextjs
pnpm build
```

The optimized production build will be created in the `.next` directory.

## Deployment

This project is configured for Vercel deployment:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

Alternatively, you can deploy to any Node.js hosting platform by building the application and running `pnpm start`.

## Troubleshooting

### Common Issues

1. **Module not found errors**: Ensure you've run `pnpm install` from the root directory
2. **TypeScript errors**: Run `pnpm typecheck` to identify type issues
3. **Port already in use**: The dev server uses port 3000 by default. You can change this in `next.config.js` or stop the process using that port

## Contributing

This is part of a larger monorepo project. Please follow the contribution guidelines for the main repository.

## License

See the LICENSE file in the root directory.
