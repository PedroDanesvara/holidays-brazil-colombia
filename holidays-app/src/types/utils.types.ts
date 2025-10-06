/**
 * Status de carregamento
 */
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error'

/**
 * Estado assíncrono genérico
 */
export interface AsyncState<T> {
  data: T | null
  status: LoadingStatus
  error: Error | null
}

/**
 * Resultado paginado
 */
export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

/**
 * Resposta de API genérica
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * Opções de ordenação
 */
export type SortDirection = 'asc' | 'desc'

export interface SortConfig<T> {
  field: keyof T
  direction: SortDirection
}

/**
 * Locales suportados
 */
export type Locale = 'en-US' | 'pt-BR' | 'es-CO'

/**
 * Configuração de formatação de data
 */
export interface DateFormatConfig {
  locale: Locale
  dateFormat: string
  timeFormat: string
  dateTimeFormat: string
}

