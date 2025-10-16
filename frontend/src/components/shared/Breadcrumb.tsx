import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** use "minimal" for the figma look */
  variant?: 'minimal' | 'bar'
}

export function Breadcrumb({ items, variant = 'minimal' }: BreadcrumbProps) {
  if (items.length === 0) return null

  const isMinimal = variant === 'minimal'

  return (
    <nav
      aria-label="Breadcrumb"
      className={isMinimal ? 'border-b border-gray-200/80 bg-transparent' : 'bg-white border-b border-gray-200'}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ol
          role="list"
          className={
            isMinimal
              ? 'flex items-center gap-1 sm:gap-2 py-3 text-xs sm:text-sm text-gray-500'
              : 'flex items-center gap-2 py-3 text-sm'
          }
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={index} className="flex items-center gap-1 sm:gap-2">
                {index > 0 && <ChevronRight className="w-4 h-4 text-gray-300" aria-hidden="true" />}
                {isLast ? (
                  <span className="text-gray-500" aria-current="page">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link to={item.href} className="text-gray-500 hover:text-gray-700 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-500">{item.label}</span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}