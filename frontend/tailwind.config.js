/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Instrument Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            fontFamily: 'Instrument Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#2563eb',
              },
              textDecoration: 'none',
            },
            code: {
              color: '#e11d48',
              backgroundColor: '#fef2f2',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.375rem',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
