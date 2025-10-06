import { useMemo } from 'react'
import { useFilters } from '@/store'
import type { Holiday, Country } from '@/features/holidays/types/holiday.types'

export function useFilteredHolidays(holidays: Holiday[]) {
  const filters = useFilters()

  return useMemo(() => {
    return holidays.filter((holiday) => {
      // Filter by country
      const enabledCountries = Object.entries(filters.countries)
        .filter(([, enabled]) => enabled)
        .map(([country]) => country as Country)

      if (enabledCountries.length > 0 && !enabledCountries.includes(holiday.country)) {
        return false
      }

      // Filter by year
      if (holiday.year !== filters.year) {
        return false
      }

      // Filter by month
      if (filters.month !== 'all' && holiday.month !== filters.month) {
        return false
      }

      // Filter by week
      if (filters.week !== 'all' && holiday.week !== filters.week) {
        return false
      }

      return true
    })
  }, [holidays, filters])
}

