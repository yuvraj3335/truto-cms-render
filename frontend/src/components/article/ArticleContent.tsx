import type { Article, Media } from '../../lib/types'
import { LexicalRenderer } from '../lexical/LexicalRenderer'
import { ContentNavigation } from './ContentNavigation'
import { getImageUrl } from '../../lib/utils'

interface ArticleContentProps {
  content: Article['content']
  featuredImage?: Media | null
}

export function ArticleContent({ content, featuredImage }: ArticleContentProps) {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 px-8 pb-16 lg:px-12 lg:pb-20">
        <article className="max-w-[900px]">
          {/* Inline media box - appears below title, above first section */}
          {featuredImage && (
            <div className="mb-10">
              <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={getImageUrl(featuredImage.url)}
                  alt={featuredImage.alt || ''}
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
            </div>
          )}

          <LexicalRenderer content={content} />
        </article>
      </div>

      {/* Right Sidebar - TOC with fixed height and scrollbar */}
      <div className="lg:w-64 xl:w-72 border-l border-gray-200 bg-gray-50/50">
        <div
          className="sticky top-0 h-[calc(100vh-200px)] max-h-[600px] overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#9ca3af #e5e7eb'
          }}
        >
          <style>{`
            .sticky::-webkit-scrollbar {
              width: 8px;
            }
            .sticky::-webkit-scrollbar-track {
              background: #e5e7eb;
              border-radius: 4px;
            }
            .sticky::-webkit-scrollbar-thumb {
              background: #9ca3af;
              border-radius: 4px;
            }
            .sticky::-webkit-scrollbar-thumb:hover {
              background: #6b7280;
            }
          `}</style>
          <div className="p-6">
            <div className="pb-3 mb-4 border-b border-gray-300">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                On This Page
              </h3>
            </div>
            <ContentNavigation inSidebar={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
