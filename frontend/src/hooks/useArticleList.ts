import { useQuery } from '@tanstack/react-query'
import { getArticleList } from '../lib/api'
import type { ArticleListResponse, ArticleListParams } from '../lib/types'

export function useArticleList(params: ArticleListParams = {}) {
  return useQuery<ArticleListResponse>({
    queryKey: ['articles', 'list', params],
    queryFn: () => getArticleList(params),
    staleTime: 60000, // 1 minute
    retry: 3,
  })
}
