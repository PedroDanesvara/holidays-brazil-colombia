import type { FilterState, MonthFilter, WeekFilter } from '@/features/filters/types/filter.types'
import { ViewMode, Country } from '@/features/holidays/types/holiday.types'
import type { Locale } from '@/types/utils.types'

/**
 * Estado do store de filtros
 */
export interface FilterStoreState {
  filters: FilterState
  setCountryFilter: (country: Country, enabled: boolean) => void
  setMonthFilter: (month: MonthFilter) => void
  setWeekFilter: (week: WeekFilter) => void
  setYearFilter: (year: number) => void
  resetFilters: () => void
}

/**
 * Estado do store de visualização
 */
export interface ViewStoreState {
  viewMode: ViewMode
  showWeekNumbers: boolean
  highlightToday: boolean
  setViewMode: (mode: ViewMode) => void
  toggleWeekNumbers: () => void
  toggleHighlightToday: () => void
}

/**
 * Estado do store de preferências
 */
export interface PreferencesStoreState {
  theme: 'light' | 'dark' | 'system'
  locale: Locale
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setLocale: (locale: Locale) => void
}

