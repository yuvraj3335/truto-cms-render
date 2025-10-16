import { memo } from 'react'
import type { Category } from '../../lib/types'
import { getImageUrl } from '../../lib/utils'

interface CategoryCardProps {
  category: Category
  onClick: (slug: string) => void
}

function CategoryCardComponent({ category, onClick }: CategoryCardProps) {
  const handleActivate = () => onClick(category.slug)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleActivate()
    }
  }

  const initial = category.name.charAt(0).toUpperCase()
  const cover = category.coverImage?.url ? getImageUrl(category.coverImage.url) : null
  const alt = category.coverImage?.alt || category.name
  const count =
    typeof (category as any).articleCount === 'number'
      ? (category as any).articleCount
      : 0
  const countLabel = `${count} ${count === 1 ? 'Guide' : 'Guides'}`

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`${category.name} – ${countLabel}`}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      className="group relative cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      {/* Taller row, but DON'T let the image stretch to full height */}
      <div className="flex items-center gap-4 ">
        {/* Fixed-size thumbnail (bigger than before, but capped) */}
        <div className="shrink-0 w-[120px] h-[120px] rounded-[16px] overflow-hidden bg-gray-100 border border-gray-200">
          {cover ? (
            <img
              src={cover}
              alt={alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="grid w-full h-full place-items-center bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-white text-lg font-semibold">{initial}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className=" text-[15px] font-medium text-gray-900">
            {category.name}
          </h3>

          {category.description && (
            <p className="mt-0.5  text-xs text-gray-500">
              {category.description}
            </p>
          )}

          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 group-hover:text-gray-700">
            <span>{countLabel}</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CategoryCard = memo(CategoryCardComponent)
