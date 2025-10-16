import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from '../../assets/Brand.png'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to main content for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:shadow"
      >
        Skip to main content
      </a>

      {/* Floating, rounded header bar */}
      <header className="sticky top-0 z-50 bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6 pt-2">
          <nav
            aria-label="Main navigation"
            className="
              w-full flex items-center justify-between
              rounded-2xl border border-black/10
              bg-white/80 backdrop-blur-md
              shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]
              px-4 sm:px-6 py-2.5
            "
          >
            {/* Brand */}
            <Link
              to="/"
              aria-label="ClonePartner Home"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <img src={BrandLogo} alt="ClonePartner Logo" className="h-6 w-6 sm:h-7 sm:w-7" />
              <span className="text-base sm:text-lg font-semibold text-gray-900">ClonePartner</span>
            </Link>

            {/* Talk to us — pill with gradient border */}
            <a
              href="mailto:support@clonepartner.com"
              aria-label="Contact us via email"
              className="
                group relative inline-flex items-center
                rounded-xl p-[2px]
                bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-500
                shadow-[0_1px_2px_rgba(0,0,0,0.06)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2
              "
            >
              <span
                className="
                  inline-flex items-center justify-center
                  rounded-[12px] bg-black text-white
                  px-4 sm:px-5 py-2 text-sm font-medium leading-none whitespace-nowrap
                  transition-colors group-hover:bg-gray-900
                "
              >
                Talk to us
              </span>
            </a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main id="main-content">{children}</main>
    </div>
  )
}
