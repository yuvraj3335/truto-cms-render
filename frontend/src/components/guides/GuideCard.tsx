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
      className="group flex items-center gap-6 md:gap-8 p-6 md:p-8 hover:bg-gray-50 transition-all duration-200 bg-[#F9F9F9] rounded-lg shadow-sm"
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 ${guide.iconColor} rounded-lg flex items-center justify-center transition-shadow`}>
        <img
          src={`/assets/guide-icons/${guide.slug}.svg`}
          alt={`${guide.title} icon`}
          className="w-6 h-6 md:w-8 md:h-8"
          onError={(e) => {
            // Fallback if image doesn't exist - show first letter
            e.currentTarget.style.display = 'none'
            const parent = e.currentTarget.parentElement
            if (parent && !parent.querySelector('span')) {
              const letter = document.createElement('span')
              letter.className = 'text-xl font-bold text-gray-700'
              letter.textContent = guide.title.charAt(0)
              parent.appendChild(letter)
            }
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {guide.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {guide.description}
        </p>
      </div>

      {/* CTA Button */}
      <div className="flex-shrink-0 hidden sm:block ml-auto">
        <span className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all">
          View Guide
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
export const GuideCard = memo(GuideCardComponent)
