// Utility for conditional classNames
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

// Cached DateTimeFormat instance for better performance
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

// Format date helper (optimized with cached formatter)
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return dateFormatter.format(date)
}

// Utility function to construct full image URLs
export function getImageUrl(url: string): string {
  if (!url) return ''
  // If URL is already absolute, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  // Otherwise, prepend the API base URL
  const apiBase = import.meta.env.VITE_API_BASE_URL || '/api'
  // Remove /api suffix if present to avoid duplication
  const baseUrl = apiBase.replace(/\/api$/, '')
  return `${baseUrl}${url}`
}
