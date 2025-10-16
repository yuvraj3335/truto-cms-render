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
      className="group relative cursor-pointer h-[96px] rounded-[16px] p-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      style={{
        background: '#FFFFFFCC',
        boxShadow: '0px 2px 4px 0px #0000000D, 0px 0px 1px 0px #00000040'
      }}
    >
      {/* Content row with 24px gap */}
      <div className="flex items-center gap-6 h-full">
        {/* Fixed-size thumbnail */}
        <div className="shrink-0 w-[80px] h-[80px] rounded-[12px] overflow-hidden bg-gray-100">
          {cover ? (
            <img
              src={cover}
              alt={alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="grid w-full h-full place-items-center bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-white text-base font-semibold">{initial}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 flex flex-col justify-center gap-2">
          <h3 className="text-[18px] font-medium text-gray-900 leading-tight">
            {category.name}
          </h3>

          {category.description && (
            <p className="text-xs text-gray-500 leading-tight line-clamp-1">
              {category.description}
            </p>
          )}

          <div className="flex items-center gap-1 text-[14px] text-gray-600 group-hover:text-gray-800">
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
