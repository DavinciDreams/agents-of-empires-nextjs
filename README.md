# Agents of Empires - Next.js (DEPRECATED)

⚠️ **This project is deprecated and no longer maintained.**

Please use the Vite-based version at:
https://github.com/DavinciDreams/agents-of-empires

---

## Migration Path

If you were using this Next.js version, migrate to the Vite version:

1. Clone the Vite version: `git clone https://github.com/DavinciDreams/agents-of-empires.git`
2. Install dependencies: `pnpm install`
3. Run the development server: `pnpm dev`

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

Next.js provides fast refresh for React components, allowing you to see changes instantly without losing component state.

## Building for Production

### Build the application

```bash
pnpm build
```

This will:
1. Compile TypeScript
2. Optimize assets
3. Generate static pages
4. Create the `.next` build directory

### Test production build locally

```bash
pnpm start
```

This starts the production server on port 3000.

## Deployment

### Vercel Deployment

This project is configured for Vercel deployment with [`vercel.json`](vercel.json).

#### Automatic Deployment

1. Connect your GitHub repository to Vercel
2. Select the `agents-of-empires-nextjs` directory as the root directory
3. Vercel will automatically detect Next.js and use the configuration in `vercel.json`

#### Manual Deployment

```bash
vercel --prod
```

#### Vercel Configuration

The [`vercel.json`](vercel.json) file includes:
- **Build Command**: Installs dependencies and builds the Next.js app
- **Output Directory**: `.next` (Next.js default)
- **Framework**: nextjs
- **Regions**: Optimized for US East (iad1)
- **Headers**: Security headers and caching policies
- **Rewrites**: Proper routing for the game page

### Environment Variables on Vercel

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add all required variables from your `.env.local` file
4. Redeploy to apply changes

### Other Deployment Options

This Next.js application can also be deployed to:
- **Netlify**: Use the Next.js build plugin
- **AWS**: Deploy to AWS Amplify or EC2
- **Docker**: Create a Dockerfile for containerized deployment
- **Node.js servers**: Use `pnpm build && pnpm start`

## Project Structure

```
agents-of-empires-nextjs/
├── app/                    # Next.js app directory
│   ├── game/              # Game page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── core/             # Core game components
│   ├── entities/         # Game entities (agents, structures, etc.)
│   ├── landing/          # Landing page components
│   ├── ui/               # UI components
│   └── world/            # World/terrain components
├── lib/                  # Utility libraries
│   └── store/            # Zustand state management
├── public/               # Static assets
├── .gitignore            # Git ignore rules
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vercel.json           # Vercel deployment configuration
```

## Key Configuration Files

### [`next.config.js`](next.config.js)

- Configures Three.js transpilation for client-side rendering
- Sets up webpack for handling GLSL shaders
- Enables package import optimization
- Configures SWC minification

### [`package.json`](package.json)

- Defines all dependencies including Three.js ecosystem
- Contains scripts for development, build, and deployment
- Uses workspace protocol for deepagents dependency

### [`vercel.json`](vercel.json)

- Configures Vercel deployment settings
- Sets build commands and output directory
- Defines security headers
- Configures caching policies

## Troubleshooting

### Three.js Transpilation Issues

If you encounter issues with Three.js modules:
1. Ensure `transpilePackages` is set in [`next.config.js`](next.config.js)
2. Check that webpack rules are properly configured
3. Clear the `.next` directory and rebuild: `rm -rf .next && pnpm build`

### Workspace Dependency Issues

If the `deepagents` workspace dependency is not found:
1. Ensure you're running commands from the monorepo root
2. Run `pnpm install` from the root directory
3. Check that `pnpm-workspace.yaml` includes the workspace

### Build Failures

If the build fails:
1. Check TypeScript errors: `pnpm typecheck`
2. Run linter: `pnpm lint`
3. Clear cache: `rm -rf .next node_modules && pnpm install`

## Performance Optimization

The application includes several optimizations:
- **SWC Minification**: Faster builds with SWC instead of Terser
- **Package Import Optimization**: Optimizes imports for Three.js packages
- **Static Asset Caching**: Long cache headers for static files
- **Code Splitting**: Automatic code splitting by Next.js

## Contributing

1. Follow the existing code style
2. Run `pnpm lint` before committing
3. Run `pnpm typecheck` to ensure type safety
4. Test changes locally before pushing

## License

MIT

## Support

For issues or questions:
- Check the main repository documentation
- Review the original Vite app for reference
- Contact the development team
