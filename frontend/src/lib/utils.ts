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
