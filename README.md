# Truto CMS Render

A modern, high-performance React application for rendering CMS content with a focus on guides and documentation.

## Features

- **Fast and Responsive**: Built with Vite for lightning-fast development and optimized production builds
- **Modern React Stack**: Leverages React 18 with lazy loading and code splitting
- **Type-Safe**: Written in TypeScript for better developer experience and fewer runtime errors
- **SEO Optimized**: Implements React Helmet for dynamic meta tags and SEO
- **Smart Caching**: Uses TanStack Query (React Query) for efficient data fetching and caching
- **Lexical Content Rendering**: Supports rich content rendering from Lexical editor format
- **Syntax Highlighting**: Built-in code syntax highlighting for technical documentation
- **Pagination**: Supports paginated article and category listings
- **Error Handling**: Comprehensive error boundaries and loading states
- **Responsive Design**: Mobile-first design with Tailwind CSS



## Project Structure

```
truto-cms-render/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── article/       # Article-related components
│   │   │   ├── guides/        # Category and guide components
│   │   │   ├── lexical/       # Lexical content renderer
│   │   │   └── shared/        # Shared UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/
│   │   │   ├── api.ts         # API client and utilities
│   │   │   ├── types.ts       # TypeScript type definitions
│   │   │   └── utils.ts       # Helper functions
│   │   ├── pages/             # Page components
│   │   ├── App.tsx            # Main application component
│   │   ├── main.tsx           # Application entry point
│   │   └── index.css          # Global styles
│   ├── package.json
│   └── vite.config.ts
├── postcss.config.js
├── tailwind.config.js
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd truto-cms-render
```

2. Install dependencies:
```bash
cd frontend
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/guides/`

### Building for Production

Build the optimized production bundle:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Configuration

### Environment Variables

Create a `.env` file in the `frontend` directory (optional):

```env
VITE_API_BASE_URL=/api
```

### Base Path

The application is configured to run under the `/guides/` base path. This is set in:
- [vite.config.ts:6](vite.config.ts#L6) - `base: '/guides/'`
- [App.tsx:33](frontend/src/App.tsx#L33) - `<BrowserRouter basename="/guides">`

### API Proxy

The development server proxies API requests to:
- Target: `https://truto-cms.yuvraj-432.workers.dev`
- Proxy path: `/api`

Configure this in [vite.config.ts:9-15](frontend/vite.config.ts#L9-L15)

## Routes

- `/` - Home page with categories
- `/categories/:slug` - Category page with articles list
- `/articles/:slug` - Individual article page
- `*` - 404 Not Found page

## Performance Optimizations

- **Code Splitting**: Pages are lazy-loaded using React.lazy()
- **Bundle Optimization**: Separate chunks for React vendor, React Query, and syntax highlighter
- **Caching**: React Query configured with 5-minute stale time and 10-minute garbage collection
- **CSS Code Splitting**: Enabled for smaller initial bundle size
- **Asset Inlining**: Assets smaller than 4KB are inlined

## API Integration

The application fetches content from a CMS backend API with the following endpoints:

- `GET /api/articles` - List articles
- `GET /api/articles/:slug` - Get single article
- `GET /api/categories` - List categories
- `GET /api/categories/:slug` - Get category with articles

## Development Guidelines

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add lazy import in [App.tsx](frontend/src/App.tsx)
3. Add route in the Routes configuration

### Adding New Components

- Shared components: `src/components/shared/`
- Feature-specific components: `src/components/<feature>/`

### Type Definitions

All TypeScript types are defined in [src/lib/types.ts](frontend/src/lib/types.ts)


