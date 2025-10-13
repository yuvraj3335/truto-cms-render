import BrandImage from '../../assets/Brand_image_rectangle-1.png'
import BrandLogo from '../../assets/Brand.png'

export function DarkFooter() {
  return (
    <footer className="bg-[#1a2332] text-gray-300">
      {/* Main CTA Section with Background Image */}
      <div className="relative border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-30">
          <img
            src={BrandImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            <br />
          </h2>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={BrandLogo} 
                alt="ClonePartner" 
                className="h-6"
              />
            </div>
            <p className="text-sm text-gray-400 mb-6 max-w-md">
              Professional data migration services for customer support platforms, CRM systems, and ATS solutions.
            </p>
            <a
              href="mailto:info@clonepartner.com"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              info@clonepartner.com
            </a>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-4 text-sm">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Helpdesk Migration
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  CRM Migration
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
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
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Migration Process
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Become a Partner
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>


        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ClonePartner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
