/**
 * Color and style mappings for Lexical rich text formatting
 * These match the TextStateFeature configuration in the backend
 */

// Text color mappings with light-dark() CSS for theme support
export const TEXT_COLORS: Record<string, string> = {
  'text-red': 'light-dark(#DC2626, #EF4444)',
  'text-orange': 'light-dark(#EA580C, #FB923C)',
  'text-yellow': 'light-dark(#CA8A04, #FDE047)',
  'text-green': 'light-dark(#16A34A, #4ADE80)',
  'text-blue': 'light-dark(#2563EB, #60A5FA)',
  'text-purple': 'light-dark(#9333EA, #C084FC)',
  'text-pink': 'light-dark(#DB2777, #F472B6)',
}

// Background/highlight color mappings
export const BACKGROUND_COLORS: Record<string, string> = {
  'bg-red': 'light-dark(#FEE2E2, #7F1D1D)',
  'bg-orange': 'light-dark(#FFEDD5, #7C2D12)',
  'bg-yellow': 'light-dark(#FEF3C7, #78350F)',
  'bg-green': 'light-dark(#DCFCE7, #14532D)',
  'bg-blue': 'light-dark(#DBEAFE, #1E3A8A)',
  'bg-purple': 'light-dark(#F3E8FF, #581C87)',
  'bg-pink': 'light-dark(#FCE7F3, #831843)',
}

/**
 * Build inline styles from Lexical state object
 */
export function buildTextStyles(state?: Record<string, string>): React.CSSProperties {
  if (!state) return {}

  const styles: React.CSSProperties = {}

  // Apply text color
  if (state.color && TEXT_COLORS[state.color]) {
    styles.color = TEXT_COLORS[state.color]
  }

  // Apply background/highlight color
  if (state.background && BACKGROUND_COLORS[state.background]) {
    styles.backgroundColor = BACKGROUND_COLORS[state.background]
  }

  // Apply font size (value is already in format like "24px")
  if (state.fontSize) {
    styles.fontSize = state.fontSize
  }

  return styles
}
