import { useMemo } from 'react'
import { useStore } from '@/store'
import { useHolidays } from '@/features/holidays/hooks/useHolidays'
import { getWeeksInMonth } from '@/features/holidays/utils/weekUtils'
import { getMonthName } from '@/features/holidays/utils/dateUtils'
import type { FilterOption } from '../types/filter.types'

export function useFilterOptions() {
  const { availableYears } = useHolidays()
  const month = useStore((state) => state.filters.month)
  const year = useStore((state) => state.filters.year)

  // Year options
  const yearOptions = useMemo<FilterOption<number>[]>(() => {
    return availableYears.map((y) => ({
      label: String(y),
      value: y,
    }))
  }, [availableYears])

  // Month options
  const monthOptions = useMemo<FilterOption<number | 'all'>[]>(() => {
    return [
      { label: 'All Months', value: 'all' },
      ...Array.from({ length: 12 }, (_, i) => ({
        label: getMonthName(i + 1),
        value: i + 1,
      })),
    ]
  }, [])

  // Week options (dynamic based on selected month)
  const weekOptions = useMemo<FilterOption<number | 'all'>[]>(() => {
    if (month === 'all') {
      return [{ label: 'All Weeks', value: 'all' }]
    }

    const weeks = getWeeksInMonth(year, month)
    return [
      { label: 'All Weeks', value: 'all' },
      ...weeks.map((w) => ({
        label: `Week ${w}`,
        value: w,
      })),
    ]
  }, [month, year])

  return {
    yearOptions,
    monthOptions,
    weekOptions,
  }
}

