# Beer Catalogue

A modern web application for browsing and managing a catalogue of beers. Built with React, TypeScript, and Vite, featuring user authentication and a responsive design.

## Features

- 🍺 Browse a catalogue of beers
- 👤 User authentication (login & registration)
- 📱 Responsive design for all devices
- ⚡ Fast development and build with Vite
- 🔒 Type-safe with TypeScript
- 🎨 SCSS styling for modern UI
- 🛡️ ESLint configuration for code quality

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 8
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **Styling**: SCSS/Sass
- **Compiler**: React Compiler (Babel)
- **Linting**: ESLint with TypeScript support
- **Git Hooks**: Husky with lint-staged

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/alexmotalex/beer-catalogue.git
cd beer-catalogue
```

2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

- `npm run dev` - Start development server with Vite
- `npm run build` - Build TypeScript and create optimized production bundle
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run deploy` - Deploy to GitHub Pages

## Project Structure

```
src/
├── api/              # API communication (axios instance)
├── components/       # Reusable React components
├── pages/           # Page components (Home, Login, Register, etc.)
├── layouts/         # Layout components (MainLayout, etc.)
├── hooks/           # Custom React hooks
├── store/           # State management
├── styles/          # Global styles
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Main App component
├── App.scss         # App-level styles
└── index.tsx        # Entry point
```

## Pages

- **Home** (`/`) - Main page displaying the beer catalogue
- **Login** (`/login`) - User login page
- **Register** (`/register`) - User registration page

## Code Quality

The project uses ESLint for code quality checks. Code formatting is enforced on commit through Husky hooks:

```bash
npm run lint
```

## React Compiler

The React Compiler is enabled for optimized performance. See [React Compiler documentation](https://react.dev/learn/react-compiler) for more details.

## Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

## License

See [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
