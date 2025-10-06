import { Country } from '@/features/holidays/types/holiday.types'

/**
 * Estado dos filtros de países
 */
export type CountryFilter = {
  [K in Country]: boolean
}

/**
 * Filtro de mês (1-12 ou 'all')
 */
export type MonthFilter = number | 'all'

/**
 * Filtro de semana (1-53 ou 'all')
 */
export type WeekFilter = number | 'all'

/**
 * Filtro de ano
 */
export type YearFilter = number

/**
 * Estado completo dos filtros
 */
export interface FilterState {
  countries: CountryFilter
  month: MonthFilter
  week: WeekFilter
  year: YearFilter
}

/**
 * Valores iniciais dos filtros
 */
export const DEFAULT_FILTERS: FilterState = {
  countries: {
    [Country.BRAZIL]: true,
    [Country.COLOMBIA]: true,
  },
  month: 'all',
  week: 'all',
  year: new Date().getFullYear(),
}

/**
 * Opções de filtro para UI
 */
export interface FilterOption<T = unknown> {
  label: string
  value: T
  disabled?: boolean
}

/**
 * Configuração de um filtro
 */
export interface FilterConfig {
  id: string
  label: string
  type: 'select' | 'checkbox' | 'radio'
  options: FilterOption[]
  multiple?: boolean
}

