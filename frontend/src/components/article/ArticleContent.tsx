import type { Article } from '../../lib/types'
import { LexicalRenderer } from '../lexical/LexicalRenderer'
import { ContentNavigation } from './ContentNavigation'

interface ArticleContentProps {
  content: Article['content']
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8 lg:p-12">
              <LexicalRenderer content={content} />
            </div>
          </article>
        </div>

        {/* Sidebar - On This Page */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                On This Page
              </h3>
              <ContentNavigation inSidebar={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
