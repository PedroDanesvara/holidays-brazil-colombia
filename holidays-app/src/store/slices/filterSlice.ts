import type { StateCreator } from 'zustand'
import type { FilterStoreState } from '../types'
import { Country } from '@/features/holidays/types/holiday.types'
import { DEFAULT_FILTERS } from '@/features/filters/types/filter.types'
import type { MonthFilter, WeekFilter } from '@/features/filters/types/filter.types'

export const createFilterSlice: StateCreator<FilterStoreState> = (set) => ({
  filters: DEFAULT_FILTERS,

  setCountryFilter: (country: Country, enabled: boolean) =>
    set((state) => ({
      filters: {
        ...state.filters,
        countries: {
          ...state.filters.countries,
          [country]: enabled,
        },
      },
    })),

  setMonthFilter: (month: MonthFilter) =>
    set((state) => ({
      filters: {
        ...state.filters,
        month,
        // Reset week filter when month changes
        week: 'all',
      },
    })),

  setWeekFilter: (week: WeekFilter) =>
    set((state) => ({
      filters: {
        ...state.filters,
        week,
      },
    })),

  setYearFilter: (year: number) =>
    set((state) => ({
      filters: {
        ...state.filters,
        year,
      },
    })),

  resetFilters: () =>
    set({
      filters: DEFAULT_FILTERS,
    }),
})

