import { useState, useCallback, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { GuideCard } from '../components/guides/GuideCard'
import { DarkFooter } from '../components/shared/DarkFooter'
import { Breadcrumb } from '../components/shared/Breadcrumb'
import { Search } from 'lucide-react'

// Mock data - replace with actual API call later
const guides = [
  {
    id: '1',
    title: 'The Ultimate Guide to Attio CRM',
    description: 'From Setup to Full AI Automation. Small description that goes in max two lines.',
    slug: 'ultimate-guide-attio-crm',
    iconColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
  },
  {
    id: '2',
    title: 'How to Migrate Data to Attio CRM',
    description: 'Step-by-step guide for seamless data migration from any platform to Attio.',
    slug: 'migrate-data-attio-crm',
    iconColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
  },
  {
    id: '3',
    title: 'Attio CRM Integration Best Practices',
    description: 'Learn the best practices for integrating Attio with your existing tools and workflows.',
    slug: 'attio-integration-best-practices',
    iconColor: 'bg-gradient-to-br from-green-100 to-green-200',
  },
  {
    id: '4',
    title: 'Advanced Automation in Attio CRM',
    description: 'Unlock the full potential of Attio with advanced automation techniques and workflows.',
    slug: 'advanced-automation-attio',
    iconColor: 'bg-gradient-to-br from-pink-100 to-pink-200',
  },
  {
    id: '5',
    title: 'Attio CRM Reporting and Analytics',
    description: 'Master reporting and analytics to gain actionable insights from your CRM data.',
    slug: 'attio-reporting-analytics',
    iconColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
  },
]

export default function GuidesListPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const filteredGuides = useMemo(() => {
    if (!searchQuery) return guides
    
    const query = searchQuery.toLowerCase()
    return guides.filter(
      (guide) =>
        guide.title.toLowerCase().includes(query) ||
        guide.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <>
      <Helmet>
        <title>ClonePartner Guides for Attio CRM</title>
        <meta
          name="description"
          content="Browse comprehensive guides for integrating and using Attio CRM with ClonePartner"
        />
      </Helmet>

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Guides', href: '/guides' },
          { label: 'Attio CRM' }
        ]}
      />

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-10">
            {/* Product Logo Placeholder */}
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <img
                src="/assets/attio-logo.svg"
                alt="Attio CRM Logo"
                className="w-12 h-12"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-white text-2xl font-bold">A</span>'
                }}
              />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ClonePartner guides for Attio CRM
            </h1>
          </div>

          {/* White Card Container */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
            {/* Search Bar */}
            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search guides for Attio"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  aria-label="Search guides"
                />
              </div>
            </div>

            {/* Guide List */}
            <div className="divide-y divide-gray-100">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))
              ) : (
                <div className="p-12 text-center">
                  <p className="text-gray-500 text-lg">No guides found matching your search.</p>
                </div>
              )}
            </div>

            {/* Support Note */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-gray-600">
                Have questions?{' '}
                <a
                  href="mailto:support@clonepartner.com"
                  className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
                >
                  Write to us at support@clonepartner.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Footer */}
      <DarkFooter />
    </>
  )
}
