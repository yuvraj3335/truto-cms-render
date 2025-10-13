import { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { ArticleListItem } from '../../lib/types'

interface ArticleCardProps {
  article: ArticleListItem
}

// Pastel colors for article icons
const pastelColors = [
  'bg-gradient-to-br from-blue-100 to-blue-200',
  'bg-gradient-to-br from-purple-100 to-purple-200',
  'bg-gradient-to-br from-green-100 to-green-200',
  'bg-gradient-to-br from-pink-100 to-pink-200',
  'bg-gradient-to-br from-yellow-100 to-yellow-200',
  'bg-gradient-to-br from-indigo-100 to-indigo-200',
  'bg-gradient-to-br from-teal-100 to-teal-200',
  'bg-gradient-to-br from-orange-100 to-orange-200',
] as const

function ArticleCardComponent({ article }: ArticleCardProps) {
  // Generate consistent color based on article ID (memoized)
  const iconColor = useMemo(() => {
    const id = String(article.id)
    const colorIndex = parseInt(id, 36) % pastelColors.length
    return pastelColors[colorIndex]
  }, [article.id])

  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group flex items-center gap-6 md:gap-8 p-6 md:p-8 hover:bg-gray-50 transition-all duration-200 bg-[#F9F9F9] rounded-lg shadow-sm"
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 ${iconColor} rounded-lg flex items-center justify-center transition-shadow`}>
        {article.featuredImage ? (
          <img
            src={article.featuredImage.url}
            alt={article.featuredImage.alt || article.title}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
            onError={(e) => {
              // Fallback to first letter if image fails
              e.currentTarget.style.display = 'none'
              const parent = e.currentTarget.parentElement
              if (parent && !parent.querySelector('span')) {
                const letter = document.createElement('span')
                letter.className = 'text-xl font-bold text-gray-700'
                letter.textContent = article.title.charAt(0)
                parent.appendChild(letter)
              }
            }}
          />
        ) : (
          <span className="text-xl md:text-2xl font-bold text-gray-700">
            {article.title.charAt(0)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        )}
      </div>

      {/* CTA Button */}
      <div className="flex-shrink-0 hidden sm:block ml-auto">
        <span className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all">
          View Article
        </span>
      </div>

      {/* Mobile: Arrow only */}
      <div className="flex-shrink-0 sm:hidden ml-auto">
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const ArticleCard = memo(ArticleCardComponent)
