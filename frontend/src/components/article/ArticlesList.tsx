import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { ArticleListItem } from '../../lib/types'
import { getImageUrl } from '../../lib/utils'

interface ArticlesListProps {
  articles: ArticleListItem[]
  headerText: string
}

function ArticlesListComponent({ articles, headerText }: ArticlesListProps) {
  const navigate = useNavigate()

  return (
    <>
      {/* existing list card */}
      <section className="w-full max-w-[1046px] mx-auto bg-white rounded-xl overflow-hidden shadow-[0_2px_4px_0_rgba(0,0,0,0.05),0_0_1px_0_rgba(0,0,0,0.25)]">
        {/* Top header strip */}
        <div className="h-[74px] px-8 py-6 border-t border-b border-[#3535371A] flex items-center">
          <span className="text-sm leading-[26px] text-gray-600 font-sans">
            {headerText}
          </span>
        </div>

        {/* List */}
        <ul role="list" className="divide-y divide-[#3535371A]">
          {articles.map((article) => (
            <li key={article.id} className="relative min-h-[140px]">
              {/* Whole-row anchor overlay */}
              <Link
                to={`/articles/${article.slug}`}
                className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                aria-label={`Open ${article.title}`}
              />

              {/* Row content */}
              <div className="relative px-8 py-5 flex items-center gap-8 hover:bg-[#FAFAFA] transition-colors">
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-[112px] h-[118px] rounded-xl overflow-hidden bg-gray-100">
                  {article.featuredImage?.url ? (
                    <img
                      src={getImageUrl(article.featuredImage.url)}
                      alt={article.featuredImage.alt || article.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>

                {/* Content block */}
                <div className="flex-1 max-w-[700px]">
                  <h3 className="text-[22px] leading-[28px] font-semibold text-gray-600 mb-1 line-clamp-2 font-sans">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-sm leading-[22px] text-gray-400 line-clamp-2 font-sans">
                      {article.excerpt}
                    </p>
                  )}
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="relative z-30 inline-flex items-center justify-center h-8 px-4 rounded-xl text-sm font-medium leading-none whitespace-nowrap bg-white text-gray-600 shadow-sm ring-1 ring-black/10 hover:bg-gray-50 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(`/articles/${article.slug}`)
                    }}
                  >
                    View Guide
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer strip */}
        <div className="h-[74px] px-8 py-6 border-t border-[#3535371A] flex items-center">
          <p className="text-sm leading-[26px] text-gray-600 font-sans">
            Have questions? Write to us on{' '}
            <a
              href="mailto:support@clonepartner.com"
              className="underline underline-offset-2"
            >
              support@clonepartner.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}

export const ArticlesList = memo(ArticlesListComponent)
