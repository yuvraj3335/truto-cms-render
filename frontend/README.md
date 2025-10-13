# Frontend Codebase Overview

This document provides a detailed overview of the frontend application, designed for AI-assisted understanding and interaction. The application is a React-based frontend built with Vite, responsible for rendering dynamic content, primarily articles, using a Lexical editor output.

## 1. Project Structure (`frontend/`)

The core application logic resides in `frontend/src/`. Key subdirectories and files are:

-   `frontend/src/assets/`: Static assets like images.
-   `frontend/src/components/`: Reusable UI components.
    -   `article/`: Components for displaying articles (e.g., `ArticleCard`, `ArticleContent`, `ArticleHeader`).
    -   `lexical/`: Components for rendering Lexical editor output (`LexicalRenderer`).
    -   `shared/`: Generic, reusable UI components (e.g., `ErrorBoundary`, `ErrorMessage`, `Layout`, `LoadingSkeleton`, `Pagination`).
-   `frontend/src/hooks/`: Custom React hooks for stateful logic.
    -   `useArticle.ts`: Fetches a single article.
    -   `useArticleList.ts`: Fetches a list of articles.
-   `frontend/src/lib/`: Utility functions, API services, and type definitions.
    -   `api.ts`: Centralized API interaction logic.
    -   `lexical-styles.ts`: Lexical-specific styling utilities.
    -   `types.ts`: TypeScript type definitions.
    -   `utils.ts`: General utilities.
-   `frontend/src/pages/`: Top-level components representing application views.
    -   `ArticlePage.tsx`: Displays a single article.
    -   `HomePage.tsx`: Displays a list of articles.
    -   `NotFoundPage.tsx`: 404 error page.
-   `frontend/src/App.tsx`: Root application component, global contexts, and routing setup.
-   `frontend/src/index.css`: Global CSS, including Tailwind CSS imports.
-   `frontend/src/main.tsx`: Application entry point.

## 2. Core Application Flow (`main.tsx`, `App.tsx`)

The application starts at `frontend/src/main.tsx` and renders `frontend/src/App.tsx`, which establishes global contexts:

-   **`main.tsx`**: Renders `App.tsx` within React's `StrictMode` for development-time checks and imports global CSS (`index.css`).
-   **`App.tsx`**:
    -   **`ErrorBoundary`**: Catches JavaScript errors in its children, preventing crashes and displaying fallback UI.
    -   **`HelmetProvider`**: Manages document head tags (`<title>`, `<meta>`) for SEO.
    -   **`QueryClientProvider`**: Provides `@tanstack/react-query` for data fetching and caching. Configured with `refetchOnWindowFocus: false`, `retry: 2`, `staleTime: 5 minutes`, `gcTime: 10 minutes`.
    -   **`BrowserRouter`**: Enables client-side routing.
    -   **`Layout`**: Wraps all routes, providing a consistent header/footer/navigation.
    -   **`Routes`**: Defines application routes.

## 3. Routing (`react-router-dom`)

Routing is configured in `frontend/src/App.tsx` using `react-router-dom`:

-   **`/`**: Renders `HomePage.tsx`.
    -   Fetches a paginated list of articles using `useArticleList`.
    -   Manages pagination with `useSearchParams`.
    -   Displays articles via `ArticleCard` and `Pagination`.
    -   Handles loading, error, and empty states with `LoadingSkeleton` and `ErrorMessage`.
-   **`/articles/:slug`**: Renders `ArticlePage.tsx`.
    -   Extracts `slug` from URL using `useParams`.
    -   Fetches specific article data using `useArticle`.
    -   Displays article header (`ArticleHeader`) and content (`ArticleContent`).
    -   Handles loading, error, and "not found" states.
    -   Dynamically sets SEO metadata using `Helmet`.
-   **`*`**: Renders `NotFoundPage.tsx`.
    -   Generic 404 page for unmatched routes.
    -   Provides a link back to the home page.

## 4. Lexical Content Rendering (`LexicalRenderer.tsx`)

The `frontend/src/components/lexical/LexicalRenderer.tsx` component is central to rendering rich text content from a Lexical editor:

-   **`LexicalRenderer` Function**: Takes a `content` prop (Lexical JSON structure), renders a root `div` with Tailwind `prose` classes, and recursively maps `content.root.children` to `LexicalNode` components.
-   **`LexicalNode` Component**:
    -   Dispatches rendering based on `node.type`.
    -   Handles custom Payload blocks by checking `node.type === 'block' && node.fields?.blockType`, delegating to `BlockNode`.
    -   Handles standard Lexical nodes via a `switch` statement, delegating to specialized components: `ParagraphNode`, `HeadingNode`, `ListNode`, `ListItemNode`, `QuoteNode`, `CodeNode`, `TextNode`, `LinkNode`, and `<br />` for `linebreak`.
-   **`TextNode` Component**:
    -   Renders plain text (`node.text`).
    -   Applies **bitwise formatting** using `node.format` for:
        -   `16`: `<code>` (inline code)
        -   `1`: `<strong>` (bold)
        -   `2`: `<em>` (italic)
        -   `8`: `<u>` (underline)
        -   `4`: `<s>` (strikethrough)
        -   `32`: `<sub>` (subscript)
        -   `64`: `<sup>` (superscript)
    -   Applies custom inline styles based on `node.state` using `buildTextStyles` (wrapping in `<span>`).
-   **`CodeNode` Component**:
    -   Extracts code text from children.
    -   Uses `Suspense` for lazy loading `SyntaxHighlighter`.
    -   Renders code with syntax highlighting based on `node.language`.
-   **`LinkNode` Component**: Renders `<a>` tags with `href`, `target`, `rel`, and styling.
-   **`BlockNode` Component**:
    -   Handles custom content blocks from the CMS.
    -   Delegates to specific block components based on `fields.blockType`:
        -   `'image'` -> `ImageBlock` (renders `<img>` with caption).
        -   `'callout'` -> `CalloutBlock`
        -   `'table'` -> `TableBlock`
        -   `'accordion'` -> `AccordionBlock`
        -   `'quote'`, `'blockQuote'` -> `QuoteBlock`
    -   Logs warnings for unknown block types.

## 5. API Service (`frontend/src/lib/api.ts`)

Centralized module for backend communication:

-   **`API_BASE`**: Base URL for API requests, defaulting to `/api`.
-   **`APIError` Class**: Custom error class extending `Error` with `status` and `statusText` for detailed error handling.
-   **`fetchAPI<T>(endpoint: string)`**: Generic utility for making `fetch` requests.
    -   Handles `response.ok` check, throwing `APIError` on failure.
    -   Parses successful responses as JSON.
-   **`getArticle(id: string)`**: Fetches an article by its ID (`/articles/:id?depth=1`).
-   **`getArticleBySlug(slug: string)`**: Fetches an article by its slug (`/articles/slug/:slug?depth=1`).
-   **`getArticleList(params: ArticleListParams)`**: Fetches a paginated/filtered list of articles (`/articles/list?page=X&limit=Y...`).
    -   Constructs query parameters using `URLSearchParams`.

## 6. Data Fetching (`@tanstack/react-query` Hooks)

React Query hooks manage server state efficiently:

-   **`useArticleList(params)` (`frontend/src/hooks/useArticleList.ts`)**:
    -   `queryKey: ['articles', 'list', params]`: Uniquely identifies the query, re-fetches if `params` change.
    -   `queryFn: () => getArticleList(params)`: Calls the API function.
    -   `staleTime: 60000` (1 minute): Data considered stale after 1 minute; triggers background refetch.
    -   `retry: 3`: Retries failed requests up to 3 times.
-   **`useArticle(slug)` (`frontend/src/hooks/useArticle.ts`)**:
    -   `queryKey: ['article', slug]`: Uniquely identifies the query by slug.
    -   `queryFn: () => getArticleBySlug(slug)`: Calls the API function.
    -   `staleTime: 60000` (1 minute): Data considered stale after 1 minute.
    -   `retry: 3`: Retries failed requests up to 3 times.
    -   `enabled: !!slug`: Only runs the query if `slug` is a truthy value, preventing requests with undefined slugs.

## 7. Component Organization (`frontend/src/components/`)

Components are organized into logical groups:

-   **`article/`**: Article-specific components (`ArticleCard`, `ArticleContent`, `ArticleHeader`).
-   **`lexical/`**: Lexical content rendering components (`LexicalRenderer` and its sub-components).
-   **`shared/`**: General-purpose UI components (`ErrorBoundary`, `ErrorMessage`, `Layout`, `LoadingSkeleton`, `Pagination`).

## 8. Styling Implementation

The frontend utilizes:

-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development. Classes are applied directly in JSX (e.g., `className="text-blue-600 font-bold"`).
-   **Tailwind CSS Typography Plugin (`prose`)**: Used to apply sensible and aesthetically pleasing default typographic styles to raw HTML generated from rich text (e.g., in `LexicalRenderer`'s output), ensuring readability without manual styling of every HTML tag.
