import BrandImage from '../../assets/Brand_image_rectangle-1.png'
import BrandLogo from '../../assets/Brand.png'

export function DarkFooter() {
  return (
    <footer className="relative bg-[#0f1720] text-gray-200 py-16 md:py-20">
      {/* Background Image with Subtle Effects and Radial Fade */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at top, rgba(19, 28, 39, 0.85) 0%, rgba(19, 28, 39, 0.95) 70%, #0f1720 100%),
            url(${BrandImage})
          `,
          filter: 'brightness(1.2) saturate(0.1) blur(0.5px)',
          opacity: 0.1
        }}
        aria-hidden="true"
      />
      
      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={BrandLogo} 
                alt="ClonePartner" 
                className="h-6"
              />
              <span className="text-lg font-semibold text-white">
                ClonePartner
              </span>
            </div>
            <p className="text-sm text-gray-200 mb-6 max-w-md leading-relaxed">
              Your AI-driven service for data migrations, data sync, and custom integrations
            </p>
            <a
              href="mailto:info@clonepartner.com"
              className="text-sm text-gray-200 hover:text-white transition-colors"
            >
              info@clonepartner.com
            </a>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-4 text-sm">Services</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-sm text-blue-200 hover:text-blue-300 underline transition-colors"
                >
                  Helpdesk Migration
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm ext-blue-200 hover:text-blue-300 underline transition-colors"
                >
                  CRM Migration
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm ext-blue-200 hover:text-blue-300 underline transition-colors"
                >
                  ATS Migration
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-4 text-sm">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-sm ext-blue-200 hover:text-blue-300 underline transition-colors"
                >
                  Migration Process
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm ext-blue-200 hover:text-blue-300 underline transition-colors"
                >
                  Become a Partner
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-blue-200 hover:text-blue-300 underline transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ClonePartner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
