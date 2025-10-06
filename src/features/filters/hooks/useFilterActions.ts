import { useStore } from '@/store'
import { useCallback } from 'react'
import { Country } from '@/features/holidays/types/holiday.types'

export function useFilterActions() {
  const setCountryFilter = useStore((state) => state.setCountryFilter)
  const setMonthFilter = useStore((state) => state.setMonthFilter)
  const setWeekFilter = useStore((state) => state.setWeekFilter)
  const setYearFilter = useStore((state) => state.setYearFilter)
  const resetFilters = useStore((state) => state.resetFilters)

  const toggleCountry = useCallback(
    (country: Country) => {
      const currentFilters = useStore.getState().filters
      const currentValue = currentFilters.countries[country]
      setCountryFilter(country, !currentValue)
    },
    [setCountryFilter]
  )

  return {
    setCountryFilter,
    setMonthFilter,
    setWeekFilter,
    setYearFilter,
    resetFilters,
    toggleCountry,
  }
}

