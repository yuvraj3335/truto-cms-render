import { memo, useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCategoryList } from '../../hooks/useCategoryList'
import { CategoryCard } from './CategoryCard'
import { Pagination } from '../shared/Pagination'
import { ChevronDown, Search } from 'lucide-react'

interface CategoriesSectionProps {
  onCategoryClick?: (slug: string) => void
}

function CategoriesSectionComponent({ onCategoryClick }: CategoriesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '12', 10)
  const { data, isLoading, error } = useCategoryList({
    page: currentPage,
    limit: limit,
    includeArticles: true // keep counts
  })

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCategoryClick = (slug: string) => {
    if (onCategoryClick) onCategoryClick(slug)
    else navigate(`/categories/${slug}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleItemsPerPageChange = (newLimit: number) => {
    const params = new URLSearchParams()
    params.set('page', '1') // Reset to page 1 when changing items per page
    params.set('limit', newLimit.toString())
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredCategories =
    data?.data.filter((category) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        category.name.toLowerCase().includes(q) ||
        category.description?.toLowerCase().includes(q)
      const matchesCategory = selectedCategory === null || category.slug === selectedCategory
      return matchesSearch && matchesCategory
    }) || []

  const selectedCategoryName =
    selectedCategory === null
      ? 'All Categories'
      : data?.data.find((c) => c.slug === selectedCategory)?.name || 'All Categories'

  if (error) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-800 font-medium">Failed to load categories</p>
          <p className="text-red-600 text-sm mt-1">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        {/* T1 Typography: 400 weight, 112% line-height */}
        <h1 className="text-[64px] font-normal leading-[112%] tracking-normal text-gray-900">
          Guides
        </h1>
        <p className="text-neutral-500 text-base">
          Simple one liner to introduce guides
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center gap-4 relative">
        {/* Dropdown pill */}
        <div className="md:flex-shrink-0 relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="inline-flex items-center justify-between gap-2 min-w-[200px] md:min-w-[240px] px-5 py-3 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition"
          >
            <span className="truncate">{selectedCategoryName}</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-[300px] overflow-y-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null)
                  setIsDropdownOpen(false)
                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                  selectedCategory === null ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                }`}
              >
                All Categories
              </button>
              <div className="border-t border-gray-100" />
              {data?.data.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category.slug)
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                    selectedCategory === category.slug ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Removed the decorative “G” avatar */}

        {/* Rounder search field */}
        <div className="md:flex-1 md:max-w-[360px] md:ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="search"
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-full border border-gray-300 bg-white text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Divider between controls and grid */}
      <div className="border-t border-gray-200 mb-6 md:mb-8" />

      {/* Categories Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-gray-200" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-600">Try a different search or clear filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={handleCategoryClick}
              />
            ))}
          </div>

          {/* Pagination */}
          {data?.pagination && !searchQuery && !selectedCategory && (
            <Pagination
              pagination={data.pagination}
              onPageChange={handlePageChange}
              itemsPerPage={limit}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemsPerPageOptions={[12, 24, 36, 48]}
            />
          )}
        </>
      )}
    </section>
  )
}

export const CategoriesSection = memo(CategoriesSectionComponent)
