import { useQuery } from '@tanstack/react-query'
import { getCategoryList } from '../lib/api'
import type { CategoryListResponse, CategoryListParams } from '../lib/types'

export function useCategoryList(params: CategoryListParams = {}) {
  return useQuery<CategoryListResponse>({
    queryKey: ['categories', 'list', params],
    queryFn: () => getCategoryList(params),
    staleTime: 5 * 60000, // 5 minutes (categories change less frequently)
    retry: 3,
  })
}

