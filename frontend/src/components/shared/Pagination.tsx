import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import type { PaginationMeta } from '../../lib/types'

interface PaginationProps {
  pagination: PaginationMeta
  onPageChange: (page: number) => void
  itemsPerPage?: number
  onItemsPerPageChange?: (limit: number) => void
  itemsPerPageOptions?: number[]
}

export function Pagination({
  pagination,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 20, 30, 50]
}: PaginationProps) {
  const { page, totalPages, hasPrevPage, hasNextPage, totalDocs } = pagination
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Memoize page numbers calculation
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = []
    const delta = 2 // Number of pages to show on each side of current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }

    return pages
  }, [page, totalPages])

  // Memoize handlers
  const handleToggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev)
  }, [])

  const handleItemsPerPageSelect = useCallback((option: number) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(option)
      setIsDropdownOpen(false)
      setShowCustomInput(false)
    }
  }, [onItemsPerPageChange])

  const handleShowCustomInput = useCallback(() => {
    setShowCustomInput(true)
    setIsDropdownOpen(false)
  }, [])

  const handleCustomValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomValue(e.target.value)
  }, [])

  const handleApplyCustomValue = useCallback(() => {
    const num = parseInt(customValue, 10)
    if (onItemsPerPageChange && num >= 1 && num <= 100) {
      onItemsPerPageChange(num)
      setShowCustomInput(false)
      setCustomValue('')
    }
  }, [customValue, onItemsPerPageChange])

  const handleCancelCustomInput = useCallback(() => {
    setShowCustomInput(false)
    setCustomValue('')
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const num = parseInt(customValue, 10)
      if (onItemsPerPageChange && num >= 1 && num <= 100) {
        onItemsPerPageChange(num)
        setShowCustomInput(false)
        setCustomValue('')
      }
    } else if (e.key === 'Escape') {
      setShowCustomInput(false)
      setCustomValue('')
    }
  }, [customValue, onItemsPerPageChange])

  if (totalPages <= 1 && !onItemsPerPageChange) return null

  return (
    <div className="mt-16">
      {/* Items per page selector */}
      {onItemsPerPageChange && itemsPerPage && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xs text-gray-600">Show</span>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={handleToggleDropdown}
              className="inline-flex items-center justify-between gap-1.5 min-w-[70px] px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 text-xs font-medium hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition"
            >
              <span>{itemsPerPage}</span>
              <ChevronDown
                className={`w-3 h-3 text-gray-500 shrink-0 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full min-w-[120px] bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {itemsPerPageOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleItemsPerPageSelect(option)}
                    className={`w-full text-center px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors ${
                      option === itemsPerPage && !showCustomInput ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
                <div className="border-t border-gray-100" />
                <button
                  type="button"
                  onClick={handleShowCustomInput}
                  className="w-full text-center px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors rounded-b-md"
                >
                  Custom...
                </button>
              </div>
            )}
          </div>

          {showCustomInput ? (
            <>
              <input
                type="number"
                min="1"
                max="100"
                value={customValue}
                onChange={handleCustomValueChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter"
                className="w-20 px-2 py-1 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                autoFocus
              />
              <button
                type="button"
                onClick={handleApplyCustomValue}
                className="px-2 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 transition-colors"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleCancelCustomInput}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md hover:bg-gray-200 focus:outline-none transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span className="text-xs text-gray-600">per page</span>
              <span className="text-xs text-gray-500">·</span>
              <span className="text-xs text-gray-600">
                {totalDocs} total {totalDocs === 1 ? 'item' : 'items'}
              </span>
            </>
          )}
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevPage}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          hasPrevPage
            ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
        }`}
        aria-label="Previous page"
      >
        <span className="flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </span>
      </button>

      {/* Page Numbers */}
      <div className="hidden sm:flex gap-1.5">
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1.5 text-gray-400 text-xs font-medium"
              >
                ...
              </span>
            )
          }

          const isCurrentPage = pageNum === page

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum as number)}
              className={`min-w-[2rem] px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isCurrentPage
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
              }`}
              aria-label={`Page ${pageNum}`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      {/* Mobile: Current Page Indicator */}
      <div className="sm:hidden px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
        <span className="text-gray-700 text-xs font-medium">
          {page} / {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          hasNextPage
            ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
        }`}
        aria-label="Next page"
      >
        <span className="flex items-center gap-1.5">
          <span className="hidden sm:inline">Next</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>
        </nav>
      )}
    </div>
  )
}
