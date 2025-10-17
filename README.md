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
- Target: backend Which provides the JSON to be rendered
- Proxy path: `/api`


