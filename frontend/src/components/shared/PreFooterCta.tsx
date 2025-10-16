interface PreFooterCtaProps {
  categoryName?: string
}

export function PreFooterCta({ categoryName }: PreFooterCtaProps) {
  return (
    <section
      aria-labelledby="pre-footer-cta"
      className="relative bg-black text-white"
    >
      {/* subtle spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_50%_-80px,rgba(255,255,255,0.10),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <h2
          id="pre-footer-cta"
          className="mx-auto max-w-3xl text-2xl sm:text-3xl md:text-4xl font-light tracking-tight"
        >
          Learn how clonepartner can help integrate with {categoryName || 'your platform'}
        </h2>

        <div className="mt-8 flex justify-center">
          {/* same pill button as header */}
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
                px-5 py-2.5 text-sm font-medium leading-none
                transition-colors group-hover:bg-gray-900
              "
            >
              Talk to us
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
