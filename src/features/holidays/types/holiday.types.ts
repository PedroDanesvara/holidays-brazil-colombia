/**
 * Países suportados pelo sistema
 */
export enum Country {
  BRAZIL = 'brazil',
  COLOMBIA = 'colombia',
}

/**
 * Mapeamento de nomes de países para exibição
 */
export const CountryLabels: Record<Country, string> = {
  [Country.BRAZIL]: 'Brazil',
  [Country.COLOMBIA]: 'Colombia',
}

/**
 * Cores associadas a cada país
 */
export const CountryColors: Record<Country, string> = {
  [Country.BRAZIL]: '#47A1C3',
  [Country.COLOMBIA]: '#FF6B6B',
}

/**
 * Interface principal para um feriado
 */
export interface Holiday {
  /** Identificador único do feriado */
  id: string
  /** País do feriado */
  country: Country
  /** Nome do feriado */
  name: string
  /** Data do feriado no formato ISO (YYYY-MM-DD) */
  date: string
  /** Mês (1-12) */
  month: number
  /** Dia do mês (1-31) */
  day: number
  /** Ano */
  year: number
  /** Número da semana no ano */
  week: number
  /** Descrição adicional (opcional) */
  description?: string
}

/**
 * DTO para criação de um novo feriado
 */
export type CreateHolidayDTO = Omit<Holiday, 'id' | 'week'>

/**
 * Dados de um feriado agrupado por data
 */
export interface HolidayGroup {
  date: string
  holidays: Holiday[]
  countries: Country[]
}

/**
 * Estatísticas de feriados
 */
export interface HolidayStats {
  total: number
  filtered: number
  byCountry: Record<Country, number>
  byMonth: Record<number, number>
}

/**
 * Modos de visualização disponíveis
 */
export enum ViewMode {
  LIST = 'list',
  CALENDAR = 'calendar',
}

/**
 * Configuração de visualização
 */
export interface ViewConfig {
  mode: ViewMode
  showWeekNumbers: boolean
  highlightToday: boolean
  firstDayOfWeek: 0 | 1 // 0 = Sunday, 1 = Monday
}

