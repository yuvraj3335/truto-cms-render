export function LoadingSkeleton() {
  return (
    <div 
      className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      {/* Header skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32 mb-4" aria-hidden="true"></div>
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4" aria-hidden="true"></div>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-10 w-10 bg-gray-200 rounded-full" aria-hidden="true"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2" aria-hidden="true"></div>
            <div className="h-3 bg-gray-200 rounded w-24" aria-hidden="true"></div>
          </div>
        </div>
        <div className="h-64 bg-gray-200 rounded-lg mb-8" aria-hidden="true"></div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-full" aria-hidden="true"></div>
        <div className="h-4 bg-gray-200 rounded w-full" aria-hidden="true"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4" aria-hidden="true"></div>
        <div className="h-4 bg-gray-200 rounded w-full" aria-hidden="true"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6" aria-hidden="true"></div>
        <div className="h-8 bg-gray-200 rounded w-2/3 mt-8" aria-hidden="true"></div>
        <div className="h-4 bg-gray-200 rounded w-full" aria-hidden="true"></div>
        <div className="h-4 bg-gray-200 rounded w-full" aria-hidden="true"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5" aria-hidden="true"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
