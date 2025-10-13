import { AlertCircle } from 'lucide-react'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = 'Error',
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div 
      className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start">
          <AlertCircle 
            className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" 
            aria-hidden="true"
          />
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-red-900">{title}</h3>
            <p className="mt-2 text-sm text-red-700">{message}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                aria-label="Retry loading content"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
