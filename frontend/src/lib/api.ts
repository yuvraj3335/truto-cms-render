import type { Article, ArticleListResponse, ArticleListParams, BackendArticleData, ArticleListItem } from './types'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

export class APIError extends Error {
  status: number
  statusText: string

  constructor(message: string, status: number, statusText: string) {
    super(message)
    this.name = 'APIError'
    this.status = status
    this.statusText = statusText
  }
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`)

  if (!response.ok) {
    throw new APIError(
      `API request failed: ${response.statusText}`,
      response.status,
      response.statusText
    )
  }

  return response.json()
}

// Transform backend article data to match frontend types
function transformArticle(data: BackendArticleData): Article {
  return {
    ...data,
    // Map coverImage from backend to featuredImage for frontend
    featuredImage: data.coverImage || data.featuredImage,
  }
}

export async function getArticle(id: string): Promise<Article> {
  const response = await fetchAPI<{ success: boolean; data: BackendArticleData }>(`/articles/${id}`)
  return transformArticle(response.data)
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const response = await fetchAPI<{ success: boolean; data: BackendArticleData }>(`/articles/slug/${slug}`)
  return transformArticle(response.data)
}

export async function getArticleList(params: ArticleListParams = {}): Promise<ArticleListResponse> {
  const queryParams = new URLSearchParams()

  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.author) queryParams.append('author', params.author)
  if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom)
  if (params.dateTo) queryParams.append('dateTo', params.dateTo)
  if (params.search) queryParams.append('search', params.search)
  if (params.sort) queryParams.append('sort', params.sort)

  const queryString = queryParams.toString()
  const endpoint = `/articles/list${queryString ? `?${queryString}` : ''}`

  const response = await fetchAPI<{ success: boolean; data: BackendArticleData[]; pagination: any }>(endpoint)

  // Transform the response to match frontend expectations
  return {
    success: response.success,
    articles: response.data.map((article: BackendArticleData): ArticleListItem => ({
      id: article.id,
      title: article.title,
      slug: article.slug || `article-${article.id}`,
      excerpt: article.excerpt,
      author: typeof article.author === 'object' ? article.author?.name : article.author,
      publishedDate: article.publishedDate || article.publishedAt,
      featuredImage: typeof article.coverImage === 'object' ? article.coverImage : 
                     typeof article.featuredImage === 'object' ? article.featuredImage : undefined,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    })),
    pagination: response.pagination,
  }
}
