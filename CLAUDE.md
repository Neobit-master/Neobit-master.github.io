# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm install         # Install dependencies
npm start           # Start webpack-dev-server on port 8080 (hot reload enabled)
npm run build       # Production build → outputs to dist/ folder
npm test            # Placeholder (no tests configured)
```

## Architecture Overview

This is a React 16.13.1 design system website showcasing NASA NEO asteroid data. Built with Webpack 4, Babel, and SCSS.

### Project Structure

- **Atomic Design Pattern**: Components organized as atoms → molecules → organisms
- **Dual Layout System**:
  - `LayoutWS` - Main website layout (Home, Gallery, Astheroids pages)
  - `LayoutDS` - Design system documentation layout (`/ds/*` routes)

### Key Directories

- `src/routes/App.js` - Main router (React Router v5)
- `src/containers/` - Page-level components (9 pages)
- `src/components/atoms/` - Basic UI elements (Button, LogoLoading)
- `src/components/molecules/` - Component combinations (Menu, Card, Hero, etc.)
- `src/components/organisms/` - Complex composites (Header, CardList)
- `src/layouts/` - Route wrappers and layout templates
- `src/styles/` - SCSS organized by component type

### Routes

| Path | Component | Layout |
|------|-----------|--------|
| `/` | Home | LayoutWS |
| `/gallery` | Gallery | LayoutWS |
| `/astheroids` | Astheroids (infinite scroll) | LayoutWS |
| `/astheroids/:id` | AstheroidDetail | LayoutWS |
| `/ds` | HomeDS | LayoutDS |
| `/ds/atoms` | Atoms | LayoutDS |
| `/ds/molecules` | Molecules | LayoutDS |
| `/ds/organisms` | Organisms | LayoutDS |

### External API

GraphQL endpoint: `http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/api/graphql`
- Used by Astheroids page for NEO data with pagination

## CI/CD

- **deploy.yaml**: Auto-deploys to GitHub Pages on push to master
- **lighthouse-ci.yaml**: Runs Lighthouse audits (accessibility threshold: 0.8)

## Webpack Configuration

- Entry: `./index.js`
- Output: `./dist/app.js`
- CSS extracted via MiniCSSExtractPlugin
- Assets (images/fonts) → `dist/assets/images`
- Dev server uses `historyApiFallback` for SPA routing
