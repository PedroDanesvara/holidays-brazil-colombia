import { useStore } from '@/store'
import { useCallback } from 'react'
import { ViewMode } from '@/features/holidays/types/holiday.types'

export function useViewActions() {
  const setViewMode = useStore((state) => state.setViewMode)
  const toggleWeekNumbers = useStore((state) => state.toggleWeekNumbers)
  const toggleHighlightToday = useStore((state) => state.toggleHighlightToday)

  const switchToList = useCallback(() => {
    setViewMode(ViewMode.LIST)
  }, [setViewMode])

  const switchToCalendar = useCallback(() => {
    setViewMode(ViewMode.CALENDAR)
  }, [setViewMode])

  return {
    setViewMode,
    switchToList,
    switchToCalendar,
    toggleWeekNumbers,
    toggleHighlightToday,
  }
}

