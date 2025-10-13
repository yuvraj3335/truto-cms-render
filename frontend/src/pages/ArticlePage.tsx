import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useArticle } from '../hooks/useArticle'
import { ArticleHeader } from '../components/article/ArticleHeader'
import { ArticleContent } from '../components/article/ArticleContent'
import { LoadingSkeleton } from '../components/shared/LoadingSkeleton'
import { ErrorMessage } from '../components/shared/ErrorMessage'
import { DarkFooter } from '../components/shared/DarkFooter'
import { Breadcrumb } from '../components/shared/Breadcrumb'
import type { Media } from '../lib/types'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: article, isLoading, error, refetch } = useArticle(slug!)

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load article"
        message={error instanceof Error ? error.message : 'An error occurred while loading the article'}
        onRetry={() => refetch()}
      />
    )
  }

  if (!article) {
    return (
      <ErrorMessage
        title="Article not found"
        message="The article you're looking for doesn't exist or has been removed."
      />
    )
  }

  const featuredImage = typeof article.featuredImage === 'string' ? null : (article.featuredImage as Media | undefined)
  const seoTitle = article.seo?.title || article.title
  const seoDescription = article.seo?.description || article.excerpt || `Read ${article.title}`
  const seoImage = article.seo?.image
    ? typeof article.seo.image === 'string'
      ? null
      : (article.seo.image as Media)
    : featuredImage

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />

        {/* Open Graph tags */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        {seoImage && <meta property="og:image" content={seoImage.url} />}
        {article.publishedAt && (
          <meta property="article:published_time" content={article.publishedAt} />
        )}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {seoImage && <meta name="twitter:image" content={seoImage.url} />}

        {/* JSON-LD Structured Data */}
        {article.jsonLd && (
          <script type="application/ld+json">
            {article.jsonLd}
          </script>
        )}
      </Helmet>

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Articles', href: '/' },
          { label: article.title }
        ]}
      />

      <div className="bg-gray-50 min-h-screen">
        <ArticleHeader article={article} />
        <ArticleContent content={article.content} />
      </div>

      <DarkFooter />
    </>
  )
}
