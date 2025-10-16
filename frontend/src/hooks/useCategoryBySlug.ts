import { useQuery } from '@tanstack/react-query'
import { getCategoryBySlug } from '../lib/api'
import type { CategoryDetailResponse } from '../lib/types'

export function useCategoryBySlug(slug: string | null, articlesPage: number = 1, articlesLimit: number = 20) {
  return useQuery<CategoryDetailResponse>({
    queryKey: ['categories', 'detail', slug, articlesPage, articlesLimit],
    queryFn: () => getCategoryBySlug(slug!, articlesPage, articlesLimit),
    staleTime: 60000, // 1 minute
    retry: 3,
    enabled: !!slug, // Only run query if slug is provided
  })
}

