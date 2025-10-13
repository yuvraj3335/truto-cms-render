import type { PaginationMeta } from '../../lib/types'

interface PaginationProps {
  pagination: PaginationMeta
  onPageChange: (page: number) => void
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { page, totalPages, hasPrevPage, hasNextPage } = pagination

  if (totalPages <= 1) return null

  const getPageNumbers = () => {
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
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Pagination">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevPage}
        className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
          hasPrevPage
            ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
        }`}
        aria-label="Previous page"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </span>
      </button>

      {/* Page Numbers */}
      <div className="hidden sm:flex gap-2">
        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-4 py-2.5 text-gray-400 font-medium"
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
              className={`min-w-[2.75rem] px-4 py-2.5 rounded-xl font-medium transition-all ${
                isCurrentPage
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md'
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
      <div className="sm:hidden px-5 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
        <span className="text-gray-700 font-medium">
          {page} / {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
          hasNextPage
            ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
        }`}
        aria-label="Next page"
      >
        <span className="flex items-center gap-2">
          <span className="hidden sm:inline">Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>
    </nav>
  )
}
