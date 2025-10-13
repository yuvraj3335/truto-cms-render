import { useQuery } from '@tanstack/react-query'
import { getArticleBySlug } from '../lib/api'
import type { Article } from '../lib/types'

export function useArticle(slug: string) {
  return useQuery<Article>({
    queryKey: ['article', slug],
    queryFn: () => getArticleBySlug(slug),
    staleTime: 60000, // 1 minute
    retry: 3,
    enabled: !!slug,
  })
}
