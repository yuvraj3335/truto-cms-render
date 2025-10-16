import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { useCategoryBySlug } from '../hooks/useCategoryBySlug'
import { ArticlesList } from '../components/article/ArticlesList'
import { LoadingSkeleton } from '../components/shared/LoadingSkeleton'
import { ErrorMessage } from '../components/shared/ErrorMessage'
import { DarkFooter } from '../components/shared/DarkFooter'
import { PreFooterCta } from '../components/shared/PreFooterCta'
import { Breadcrumb } from '../components/shared/Breadcrumb'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const currentPage = 1
  const limit = 10

  const { 
    data: categoryData, 
    isLoading,
    error,
    refetch 
  } = useCategoryBySlug(slug || '', currentPage, limit)

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load category"
        message={error instanceof Error ? error.message : 'An error occurred while loading this category'}
        onRetry={() => refetch()}
      />
    )
  }

  if (!categoryData || !categoryData.category) {
    return (
      <ErrorMessage
        title="Category not found"
        message="The category you're looking for doesn't exist"
      />
    )
  }

  const { category, articles, pagination } = categoryData

  const breadcrumbItems = [
    { label: 'Guides', href: '/' },
    { label: category.name }
  ]

  return (
    <>
      <Helmet>
        <title>{category.name} Guides - ClonePartner</title>
        <meta 
          name="description" 
          content={category.description || `Explore ${category.name} guides and tutorials`} 
        />
      </Helmet>

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Articles Section */}
      <div className="bg-gray-50 pt-8 lg:pt-12 pb-16 lg:pb-20">
        {/* Page Header */}
        <div className="max-w-[1046px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h1 className="text-[40px] font-medium leading-[111%] tracking-[-0.02em] text-gray-900 text-center">
            Clonepartner guides for {category.name}
          </h1>
        </div>

        {articles.length === 0 ? (
          <div className="max-w-[1046px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm p-16 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                No guides found
              </h2>
              <p className="text-gray-600 mb-6">
                This category doesn't have any guides yet.
              </p>
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                View all categories
              </a>
            </div>
          </div>
        ) : (
          <ArticlesList
            articles={articles}
            headerText={`${pagination?.totalDocs ?? 0} ${pagination?.totalDocs === 1 ? 'guide' : 'guides'} in ${category.name}`}
          />
        )}
      </div>

      {/* Pre-Footer CTA */}
      <PreFooterCta categoryName={category.name} />

      {/* Dark Footer */}
      <DarkFooter />
    </>
  )
}

