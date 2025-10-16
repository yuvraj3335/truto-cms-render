import type { 
  Article, 
  ArticleListResponse, 
  ArticleListParams, 
  BackendArticleData, 
  ArticleListItem,
  Category,
  CategoryListResponse,
  CategoryListParams,
  CategoryDetailResponse,
  Media,
  BackendCategoryData,
  PaginationMeta
} from './types'

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

// Transform backend article data to ArticleListItem format
function transformArticleListItem(article: BackendArticleData): ArticleListItem {
  return {
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
  }
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

  const response = await fetchAPI<{ success: boolean; data: BackendArticleData[]; pagination: PaginationMeta }>(endpoint)

  return {
    success: response.success,
    articles: response.data.map(transformArticleListItem),
    pagination: response.pagination,
  }
}

// Transform backend category data to frontend format
function transformCategory(data: BackendCategoryData): Category {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    coverImage: typeof data.coverImage === 'object' ? data.coverImage as Media : undefined,
    articleCount: data.articleCount,
    articles: data.articles?.map(transformArticleListItem),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}

export async function getCategoryList(params: CategoryListParams = {}): Promise<CategoryListResponse> {
  const queryParams = new URLSearchParams()

  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.includeArticles !== undefined) queryParams.append('includeArticles', params.includeArticles.toString())

  const queryString = queryParams.toString()
  const endpoint = `/categories/list${queryString ? `?${queryString}` : ''}`

  const response = await fetchAPI<{ success: boolean; data: BackendCategoryData[]; pagination: PaginationMeta }>(endpoint)

  return {
    success: response.success,
    data: response.data.map(transformCategory),
    pagination: response.pagination,
  }
}

export async function getCategoryBySlug(slug: string, articlesPage: number = 1, articlesLimit: number = 20): Promise<CategoryDetailResponse> {
  const queryParams = new URLSearchParams()
  queryParams.append('articlesPage', articlesPage.toString())
  queryParams.append('articlesLimit', articlesLimit.toString())

  const endpoint = `/categories/slug/${slug}?${queryParams.toString()}`

  const response = await fetchAPI<{ 
    success: boolean
    category: BackendCategoryData
    articles: BackendArticleData[]
    pagination: PaginationMeta
  }>(endpoint)

  return {
    success: response.success,
    category: transformCategory(response.category),
    articles: response.articles.map(transformArticleListItem),
    pagination: response.pagination,
  }
}
