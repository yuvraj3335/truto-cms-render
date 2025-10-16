import { useEffect, useState } from 'react'
import { List } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

interface ContentNavigationProps {
  inSidebar?: boolean
}

export function ContentNavigation({ inSidebar = false }: ContentNavigationProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Extract all headings from the article content
    const articleElement = document.querySelector('.lexical-content')
    if (!articleElement) return

    const headingElements = articleElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const extractedHeadings: Heading[] = []

    headingElements.forEach((heading, index) => {
      const id = `heading-${index}`
      heading.id = id
      extractedHeadings.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      })
    })

    setHeadings(extractedHeadings)

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%' }
    )

    headingElements.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
    }
  }

  if (headings.length === 0) return null

  // If in sidebar, render simplified version
  if (inSidebar) {
    return (
      <nav className="space-y-1">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={`
              w-full text-left py-1.5 text-sm transition-colors
              ${activeId === heading.id
                ? 'text-gray-900 font-semibold'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
          >
            <span className="line-clamp-2">{heading.text}</span>
          </button>
        ))}
      </nav>
    )
  }

  // Original fixed overlay version for mobile/legacy
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-white p-4 rounded-full shadow-lg hover:shadow-xl border border-gray-200 hover:scale-105 transition-all"
        aria-label="Toggle content navigation"
      >
        <List className="w-6 h-6 text-gray-700" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Panel - Top Right Corner (Fixed) */}
      <div
        className={`
          fixed top-24 right-6 h-fit max-h-[calc(100vh-7rem)]
          bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200
          p-5 w-72 overflow-y-auto z-40
          transition-all duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)] lg:translate-x-0'}
        `}
      >
        <div className="mb-4 pb-3 border-b border-gray-100">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            On This Page
          </h3>
        </div>

        <nav className="space-y-0.5">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`
                w-full text-left py-2 px-2.5 rounded-lg text-sm transition-all
                hover:bg-gray-50
                ${activeId === heading.id
                  ? 'text-blue-600 font-medium bg-blue-50/50'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
              style={{ paddingLeft: `${0.625 + (heading.level - 1) * 0.5}rem` }}
            >
              <span className="line-clamp-2">{heading.text}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
