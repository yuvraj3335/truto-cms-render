// Media type
export interface Media {
  id: string
  alt?: string
  url: string
  filename: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
  focalX?: number
  focalY?: number
  sizes?: {
    thumbnail?: { url: string; width: number; height: number }
    card?: { url: string; width: number; height: number }
    tablet?: { url: string; width: number; height: number }
  }
}

// User type
export interface User {
  id: string
  name?: string
  email: string
  avatar?: Media
}

// Lexical/Rich Text format
export interface RichTextNode {
  type: string
  version?: number
  text?: string
  format?: number
  detail?: number
  mode?: string
  style?: string
  children?: RichTextNode[]
  direction?: 'ltr' | 'rtl'
  tag?: string
  url?: string
  rel?: string
  target?: string
  title?: string
  listType?: 'bullet' | 'number' | 'check'
  value?: number
  checked?: boolean
}

export interface RichText {
  root: {
    type: string
    children: RichTextNode[]
    direction: 'ltr' | 'rtl'
    format: string
    indent: number
    version: number
  }
}

// Block types
export interface HeadingBlock {
  blockType: 'heading'
  id?: string
  level: 1 | 2 | 3 | 4 | 5 | 6
  content: RichText | string
}

export interface ParagraphBlock {
  blockType: 'paragraph'
  id?: string
  content: RichText
}

export interface ImageBlock {
  blockType: 'image'
  id?: string
  image: Media | string
  caption?: string
  alt?: string
}

export interface CodeBlock {
  blockType: 'code'
  id?: string
  code: string
  language: string
}

export interface QuoteBlock {
  blockType: 'quote'
  id?: string
  quote: RichText | string
  author?: string
  role?: string
}

export interface VideoBlock {
  blockType: 'video'
  id?: string
  video?: Media | string
  url?: string
  caption?: string
  poster?: Media | string
}

export interface EmbedBlock {
  blockType: 'embed'
  id?: string
  url: string
  embedType?: 'youtube' | 'vimeo' | 'twitter' | 'codepen' | 'other'
  caption?: string
}

export interface AccordionItem {
  title: string
  content: RichText
}

export interface AccordionBlock {
  blockType: 'accordion'
  id?: string
  items: AccordionItem[]
}

export interface ListBlock {
  blockType: 'list'
  id?: string
  listType: 'ul' | 'ol' | 'checklist'
  items: Array<{
    content: RichText | string
    checked?: boolean
  }>
}

export interface ColumnsBlock {
  blockType: 'columns'
  id?: string
  columns: Array<{
    content: ArticleBlock[]
  }>
}

export interface DividerBlock {
  blockType: 'divider'
  id?: string
  style?: 'solid' | 'dashed' | 'dotted'
}

export interface CallToActionBlock {
  blockType: 'cta'
  id?: string
  title: string
  description?: RichText | string
  buttonText: string
  buttonUrl: string
  style?: 'primary' | 'secondary' | 'outline'
}

// Union type for all blocks
export type ArticleBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | CodeBlock
  | QuoteBlock
  | VideoBlock
  | EmbedBlock
  | AccordionBlock
  | ListBlock
  | ColumnsBlock
  | DividerBlock
  | CallToActionBlock

// Article type
export interface Article {
  id: string | number
  title: string
  slug?: string
  content: {
    root: {
      type: string
      children: RichTextNode[]
      direction: 'ltr' | 'rtl' | null
      format: string
      indent: number
      version: number
    }
    quote?: RichText
  }
  publishedDate?: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
  author?: User | string
  featuredImage?: Media | string
  excerpt?: string
  tags?: Array<{ id: string; name: string }>
  categories?: Array<{ id: string; name: string }>
  status?: 'draft' | 'published'
  jsonLd?: string
  seo?: {
    title?: string
    description?: string
    image?: Media | string
  }
}

// API Response types
export interface ArticleResponse {
  doc: Article
}

export interface ArticlesResponse {
  docs: Article[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// Article List endpoint types
export interface ArticleListItem {
  id: string | number
  title: string
  slug: string
  excerpt?: string
  author?: string
  publishedDate?: string
  featuredImage?: Media
  createdAt: string
  updatedAt: string
}

export interface PaginationMeta {
  page: number
  limit: number
  totalPages: number
  totalDocs: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
}

export interface ArticleListResponse {
  success: boolean
  articles: ArticleListItem[]
  pagination: PaginationMeta
}

export interface ArticleListParams {
  page?: number
  limit?: number
  author?: string
  dateFrom?: string
  dateTo?: string
  search?: string
  sort?: string
}

export interface BackendArticleData {
  id: string | number
  title: string
  slug?: string
  content: {
    root: {
      type: string
      children: RichTextNode[]
      direction: 'ltr' | 'rtl' | null
      format: string
      indent: number
      version: number
    }
    quote?: RichText
  }
  publishedDate?: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
  author?: User | string
  coverImage?: Media | string // This is the key difference from Article
  featuredImage?: Media | string
  excerpt?: string
  tags?: Array<{ id: string; name: string }>
  categories?: Array<{ id: string; name: string }>
  status?: 'draft' | 'published'
  jsonLd?: string
  seo?: {
    title?: string
    description?: string
    image?: Media | string
  }
}
