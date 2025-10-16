import { useMemo, memo } from 'react'
import { User } from 'lucide-react'
import type { Article, User as UserType } from '../../lib/types'
import { formatDate, getImageUrl } from '../../lib/utils'

interface ArticleHeaderProps {
  article: Article
}

function ArticleHeaderComponent({ article }: ArticleHeaderProps) {
  const author = typeof article.author === 'string' ? null : (article.author as UserType | undefined)

  // Calculate reading time based on content (memoized for performance)
  const readingTime = useMemo(() => {
    const wordsPerMinute = 200

    // Count words from Lexical content
    const countWords = (node: { text?: string; children?: unknown[] }): number => {
      if (!node) return 0

      if (node.text) {
        return node.text.split(/\s+/).length
      }

      if (node.children && Array.isArray(node.children)) {
        return node.children.reduce((count: number, child: unknown) => {
          return count + countWords(child as { text?: string; children?: unknown[] })
        }, 0)
      }

      return 0
    }

    const wordCount = article.content?.root?.children
      ? countWords(article.content.root)
      : 0

    return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
  }, [article.content])

  return (
    <div className="px-8 pt-10 pb-6 lg:px-12 lg:pt-12 lg:pb-8">
      <div className="max-w-[900px]">
        <header>
          {/* Meta info first */}
          <div className="flex items-center gap-3 mb-6">
            {/* Author */}
            {(author || typeof article.author === 'string') && (
              <>
                {author?.avatar && typeof author.avatar !== 'string' ? (
                  <img
                    src={getImageUrl(author.avatar.url)}
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
              </>
            )}
          </div>

          {/* Title - Large sans-serif */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </header>
      </div>
    </div>
  )
}

export const ArticleHeader = memo(ArticleHeaderComponent)
