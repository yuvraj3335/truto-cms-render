import { useState, useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Search } from 'lucide-react'
import { useArticleList } from '../hooks/useArticleList'
import { ArticleCard } from '../components/article/ArticleCard'
import { Pagination } from '../components/shared/Pagination'
import { LoadingSkeleton } from '../components/shared/LoadingSkeleton'
import { ErrorMessage } from '../components/shared/ErrorMessage'
import { DarkFooter } from '../components/shared/DarkFooter'
import { Breadcrumb } from '../components/shared/Breadcrumb'

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, error, refetch } = useArticleList({
    page: currentPage,
    limit: 10,
  })

  const handlePageChange = useCallback((page: number) => {
    setSearchParams({ page: page.toString() })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [setSearchParams])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  // Filter articles based on search query (memoized for performance)
  // Must be called before any early returns
  const filteredArticles = useMemo(() => {
    if (!data?.articles) return []
    if (!searchQuery) return data.articles
    
    const query = searchQuery.toLowerCase()
    return data.articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt?.toLowerCase().includes(query)
    )
  }, [data?.articles, searchQuery])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load articles"
        message={error instanceof Error ? error.message : 'An error occurred while loading articles'}
        onRetry={() => refetch()}
      />
    )
  }

  if (!data || !data.articles || data.articles.length === 0) {
    return (
      <>
        <Helmet>
          <title>ClonePartner Articles</title>
          <meta name="description" content="Read our latest articles and guides" />
        </Helmet>
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              No Articles Yet
            </h1>
            <p className="text-xl text-gray-600">
              Check back later for new articles.
            </p>
          </div>
        </div>
        <DarkFooter />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{currentPage === 1 ? 'ClonePartner Articles' : `Articles - Page ${currentPage}`}</title>
        <meta name="description" content="Explore our collection of articles and guides" />
      </Helmet>

      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Articles' }]} />

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-10">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ClonePartner Articles
            </h1>
          </div>

          {/* White Card Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Article Count */}
            <div className="px-6 pt-6 pb-4">
              <p className="text-sm text-gray-600">
                {data.pagination.totalDocs} {data.pagination.totalDocs === 1 ? 'article' : 'articles'}
              </p>
            </div>

            {/* Search Bar */}
            <div className="px-6 pb-6 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  aria-label="Search articles"
                />
              </div>
            </div>

            {/* Article List */}
            <div className="divide-y divide-gray-100">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : (
                <div className="p-12 text-center">
                  <p className="text-gray-500 text-lg">No articles found matching your search.</p>
                </div>
              )}
            </div>

            {/* Support Note */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-gray-600">
                Have questions?{' '}
                <a
                  href="mailto:support@clonepartner.com"
                  className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
                >
                  Write to us at support@clonepartner.com
                </a>
              </p>
            </div>
          </div>

          {/* Pagination */}
          {!searchQuery && (
            <Pagination
              pagination={data.pagination}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {/* Dark Footer */}
      <DarkFooter />
    </>
  )
}
