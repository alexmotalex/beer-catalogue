# Beer Catalogue

A modern React + TypeScript storefront for exploring craft beers, managing a cart, and handling account-related flows.

> **Note:** The app is currently optimized for desktop only. Mobile and tablet support is planned for a future update.

## Live demo

- 🌐 [GitHub Pages](https://alexmotalex.github.io/beer-catalogue/)
- 🚀 [Vercel](https://beer-catalogue-eta.vercel.app)

## What the app includes

- 🍺 Browse and search a beer catalogue
- 🛒 Add items to the cart and manage quantities
- 👤 Sign up, sign in, password reset, and profile editing
- 🧠 Help center and informational pages
- 🔔 Toast notifications and responsive UI
- ⚡ Vite + React 19 + React Compiler setup

## Tech stack

### Frontend

- React 19
- TypeScript
- Vite 8
- React Router 7
- Axios
- SCSS / CSS Modules
- React Toastify
- ESLint + TypeScript support
- Husky + lint-staged

### Backend

- Django + Django REST Framework
- PostgreSQL (Supabase)
- Hosted on Render
- API: https://craft-beer-catalogue-api.onrender.com
- Backend created by [Anastasiia](https://github.com/anastasiiaoshega513)

> The backend is a separate project. The API may take up to a minute to respond on the first load due to Render's free tier cold start.

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone <repository-url>
cd beer-catalogue
npm install
```

### Environment variables

Create a `.env` file in the root: VITE_BASE_URL=/beer-catalogue/

For Vercel deployment, set `VITE_BASE_URL=/` in the Vercel dashboard.

### Development

```bash
npm run dev
```

The app will usually run at http://localhost:5173/beer-catalogue/

## Available scripts

- `npm run dev` — start the Vite development server
- `npm run build` — type-check and build the production bundle
- `npm run lint` — run ESLint
- `npm run deploy` — build and deploy to GitHub Pages
- `npm run doctor` — run React Doctor checks

## Deployment

### GitHub Pages

```bash
npm run deploy
```

Builds the project, copies `404.html` for client-side routing support, and pushes to the `gh-pages` branch.

### Vercel

Connected to the GitHub repository — deploys automatically on every push to `main`. Set `VITE_BASE_URL=/` in Vercel Environment Variables.

## Project structure

```text
src/
├── api/                # Axios API setup
├── components/         # Reusable UI components
├── constants/          # Routes, navigation, FAQ, and form data
├── hooks/              # Custom hooks
├── layouts/            # Layout wrappers
├── pages/              # Route-level pages
├── services/           # API/data fetching helpers
├── store/              # Context providers and state logic
├── styles/             # Global SCSS styles
├── types/              # TypeScript types
├── utils/              # Shared helpers and validators
├── App.tsx             # App routes
└── index.tsx           # Entry point
```

## Main routes

- `/` — home page
- `/beers` — catalogue
- `/cart` — cart page
- `/signin` and `/signup` — authentication
- `/help` — help center
- `/about` — about page
- `/product/:productId` — product details

## Notes

The project uses React Compiler support through the Vite/Babel setup. For accessibility and quality checks, you can run:

```bash
npm run lint
npm run doctor
```

## License

See [LICENSE](./LICENSE).
