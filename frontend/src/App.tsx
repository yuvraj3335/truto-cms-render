import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from './components/shared/ErrorBoundary'
import { Layout } from './components/shared/Layout'
import { LoadingSkeleton } from './components/shared/LoadingSkeleton'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const ArticlePage = lazy(() => import('./pages/ArticlePage'))
const GuidesListPage = lazy(() => import('./pages/GuidesListPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Create QueryClient instance with optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Layout>
              <Suspense fallback={<LoadingSkeleton />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/articles/:slug" element={<ArticlePage />} />
                  <Route path="/guides/attio" element={<GuidesListPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </Layout>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
