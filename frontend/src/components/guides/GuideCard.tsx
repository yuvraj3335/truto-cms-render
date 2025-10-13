import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface GuideCardProps {
  guide: {
    id: string
    title: string
    description: string
    slug: string
    iconColor: string
  }
}

function GuideCardComponent({ guide }: GuideCardProps) {
  return (
    <Link
      to={`/guides/attio/${guide.slug}`}
      className="group flex items-center gap-6 p-6 hover:bg-gray-50 transition-all duration-300"
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-16 h-16 ${guide.iconColor} rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
        <img
          src={`/assets/guide-icons/${guide.slug}.svg`}
          alt={`${guide.title} icon`}
          className="w-8 h-8"
          onError={(e) => {
            // Fallback if image doesn't exist - show first letter
            e.currentTarget.style.display = 'none'
            const parent = e.currentTarget.parentElement
            if (parent && !parent.querySelector('span')) {
              const letter = document.createElement('span')
              letter.className = 'text-2xl font-bold text-gray-700'
              letter.textContent = guide.title.charAt(0)
              parent.appendChild(letter)
            }
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
          {guide.title}
        </h3>
        <p className="text-sm md:text-base text-gray-600 line-clamp-2 leading-relaxed">
          {guide.description}
        </p>
      </div>

      {/* CTA Button */}
      <div className="flex-shrink-0">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm group-hover:shadow-md">
          View Guide
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const GuideCard = memo(GuideCardComponent)
