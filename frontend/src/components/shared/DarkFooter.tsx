import BrandLogo from '../../assets/Brand.png'
import FooterWordmark from '../../assets/footer-img.png'
import HippaBadge from '../../assets/Hippa.png' 

export function DarkFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-black text-gray-300">
      {/* TOP fade only (does NOT cover the bottom) */}
     

      {/* Giant wordmark across the bottom */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none select-none
          absolute inset-x-0 bottom-[-6px] mx-auto
          h-[280px] w-[1900px] max-w-[96vw]
          z-[1]
        "
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,.30), rgba(255,255,255,.14) 55%, rgba(255,255,255,0) 95%)',
          opacity: 0.8,
          WebkitMaskImage: `url(${FooterWordmark})`,
          maskImage: `url(${FooterWordmark})`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center bottom',
          maskPosition: 'center bottom',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-4">
              <img src={BrandLogo} alt="ClonePartner logo" className="h-6" />
              <span className="text-white font-semibold">ClonePartner</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              Professional data migration services for customer support platforms.
            </p>
            <a
              href="mailto:info@clonepartner.com"
              className="mt-6 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7l9 6 9-6" />
                <rect x="3" y="5" width="18" height="14" rx="2.5" ry="2.5" strokeWidth="1.5" />
              </svg>
              info@clonepartner.com
            </a>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs tracking-wider text-gray-400 uppercase">Services</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Helpdesk Migration</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">CRM Migration</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">ATS Migration</a></li>
            </ul>
          </div>

          {/* Resources + HIPAA badge (aligned at top) */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xs tracking-wider text-gray-400 uppercase">Resources</h3>
                <ul className="mt-4 space-y-3">
                  <li><a href="#" className="text-sm hover:text-white transition-colors">Migration Process</a></li>
                  <li><a href="#" className="text-sm hover:text-white transition-colors">Become a Partner</a></li>
                  <li><a href="#" className="text-sm hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>

              {/* Badge aligned to top right */}
              <div className="hidden lg:block shrink-0">
                <img
                  src={HippaBadge}
                  alt="HIPAA Compliant"
                  className="h-16 w-auto opacity-90"
                />
              </div>
            </div>

            {/* Badge for mobile/tablet */}
            <div className="mt-6 lg:hidden">
              <img
                src={HippaBadge}
                alt="HIPAA Compliant"
                className="h-16 w-auto opacity-90"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
        </div>
      </div>
    </footer>
  )
}
