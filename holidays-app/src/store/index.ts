import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createFilterSlice } from './slices/filterSlice'
import { createViewSlice } from './slices/viewSlice'
import { createPreferencesSlice } from './slices/preferencesSlice'
import type { FilterStoreState, ViewStoreState, PreferencesStoreState } from './types'

// Combine all slices
type StoreState = FilterStoreState & ViewStoreState & PreferencesStoreState

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...args) => ({
        ...createFilterSlice(...args),
        ...createViewSlice(...args),
        ...createPreferencesSlice(...args),
      }),
      {
        name: 'holidays-app-storage',
        // Only persist preferences and some view settings
        partialize: (state) => ({
          theme: state.theme,
          locale: state.locale,
          showWeekNumbers: state.showWeekNumbers,
          highlightToday: state.highlightToday,
        }),
      }
    ),
    {
      name: 'HolidaysApp',
    }
  )
)

// Selectors for better performance
export const useFilters = () => useStore((state) => state.filters)
export const useCountryFilters = () => useStore((state) => state.filters.countries)
export const useViewMode = () => useStore((state) => state.viewMode)
export const useTheme = () => useStore((state) => state.theme)

// Actions
export const useFilterActions = () => ({
  setCountryFilter: useStore((state) => state.setCountryFilter),
  setMonthFilter: useStore((state) => state.setMonthFilter),
  setWeekFilter: useStore((state) => state.setWeekFilter),
  setYearFilter: useStore((state) => state.setYearFilter),
  resetFilters: useStore((state) => state.resetFilters),
})

export const useViewActions = () => ({
  setViewMode: useStore((state) => state.setViewMode),
  toggleWeekNumbers: useStore((state) => state.toggleWeekNumbers),
  toggleHighlightToday: useStore((state) => state.toggleHighlightToday),
})

export const usePreferencesActions = () => ({
  setTheme: useStore((state) => state.setTheme),
  setLocale: useStore((state) => state.setLocale),
})

