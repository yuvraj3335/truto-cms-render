import { useMemo } from 'react'
import { User } from 'lucide-react'
import type { Article, Media, User as UserType } from '../../lib/types'
import { formatDate } from '../../lib/utils'

interface ArticleHeaderProps {
  article: Article
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const author = typeof article.author === 'string' ? null : (article.author as UserType | undefined)
  const featuredImage = typeof article.featuredImage === 'string' ? null : (article.featuredImage as Media | undefined)

  // Calculate reading time based on content (memoized for performance)
  const readingTime = useMemo(() => {
    const wordsPerMinute = 200

    // Count words from Lexical content
    const countWords = (node: any): number => {
      if (!node) return 0

      if (node.text) {
        return node.text.split(/\s+/).length
      }

      if (node.children && Array.isArray(node.children)) {
        return node.children.reduce((count: number, child: any) => count + countWords(child), 0)
      }

      return 0
    }

    const wordCount = article.content?.root?.children
      ? countWords(article.content.root)
      : 0

    return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
  }, [article.content])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Header Content */}
        <div className="lg:col-span-8">
          <header className="mb-8">
            {/* Meta info first */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              {/* Author */}
              {(author || typeof article.author === 'string') && (
                <div className="flex items-center gap-3">
                  {author?.avatar && typeof author.avatar !== 'string' ? (
                    <img
                      src={author.avatar.url}
                      alt={author.name || author.email}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {author ? (author.name || author.email) : (typeof article.author === 'string' ? article.author : '')}
                    </p>
                    <div className="flex items-center gap-2.5 text-xs text-gray-500">
                      {(article.publishedAt || article.publishedDate) && (
                        <time dateTime={article.publishedAt || article.publishedDate}>
                          {formatDate(article.publishedAt || article.publishedDate || '')}
                        </time>
                      )}
                      <span>·</span>
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-[1.15] tracking-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                {article.excerpt}
              </p>
            )}

            {/* Featured Image - if exists */}
            {featuredImage && (
              <div className="mb-8">
                <img
                  src={featuredImage.url}
                  alt={featuredImage.alt || article.title}
                  className="w-full h-auto max-h-[400px] object-cover rounded-xl"
                  loading="eager"
                />
              </div>
            )}
          </header>
        </div>

        {/* Sidebar space for consistency */}
        <div className="lg:col-span-4">
          {/* This space is intentionally left for sidebar alignment */}
        </div>
      </div>
    </div>
  )
}
