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
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Header - Slim Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav 
            className="flex items-center justify-between h-16"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="ClonePartner Home"
            >
              <img
                src={BrandLogo}
                alt="ClonePartner Logo"
                className="h-7"
              />
              <span className="text-lg font-semibold text-black">
                Clone Partner
              </span>
            </Link>

            {/* Talk to us button */}
            <a
              href="mailto:support@clonepartner.com"
              className="px-6 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              aria-label="Contact us via email"
            >
              Talk to us
            </a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main id="main-content">{children}</main>
    </div>
  )
}
