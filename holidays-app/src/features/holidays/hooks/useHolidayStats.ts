import { useMemo } from 'react'
import type { Holiday, HolidayStats, Country } from '@/features/holidays/types/holiday.types'

export function useHolidayStats(
  allHolidays: Holiday[],
  filteredHolidays: Holiday[]
): HolidayStats {
  return useMemo(() => {
    const byCountry = filteredHolidays.reduce((acc, holiday) => {
      acc[holiday.country] = (acc[holiday.country] || 0) + 1
      return acc
    }, {} as Record<Country, number>)

    const byMonth = filteredHolidays.reduce((acc, holiday) => {
      acc[holiday.month] = (acc[holiday.month] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    return {
      total: allHolidays.length,
      filtered: filteredHolidays.length,
      byCountry,
      byMonth,
    }
  }, [allHolidays, filteredHolidays])
}

