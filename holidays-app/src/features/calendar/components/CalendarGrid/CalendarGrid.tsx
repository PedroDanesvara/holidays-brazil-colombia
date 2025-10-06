import { useMemo } from 'react'
import { useStore } from '@/store'
import { useFilteredHolidays } from '@/features/holidays/hooks/useFilteredHolidays'
import { generateCalendarMonth } from '../../utils/calendarUtils'
import { CalendarDay } from '../CalendarDay'
import { Card } from '@/components/ui/Card'
import { getMonthName } from '@/features/holidays/utils/dateUtils'
import type { Holiday } from '@/features/holidays/types/holiday.types'

interface CalendarGridProps {
  holidays: Holiday[]
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function CalendarGrid({ holidays }: CalendarGridProps) {
  const year = useStore((state) => state.filters.year)
  const month = useStore((state) => state.filters.month)
  const showWeekNumbers = useStore((state) => state.showWeekNumbers)
  const highlightToday = useStore((state) => state.highlightToday)

  const filteredHolidays = useFilteredHolidays(holidays)

  const calendarMonth = useMemo(() => {
    const currentMonth = month === 'all' ? new Date().getMonth() + 1 : month
    return generateCalendarMonth(year, currentMonth, filteredHolidays)
  }, [year, month, filteredHolidays])

  const displayMonth = month === 'all' ? new Date().getMonth() + 1 : month

  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {getMonthName(displayMonth)} {year}
        </h2>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-0 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-700 py-2 bg-gray-100"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0">
        {calendarMonth.weeks.map((week, weekIndex) =>
          week.days.map((day, dayIndex) => (
            <CalendarDay
              key={`${weekIndex}-${dayIndex}`}
              day={day}
              showWeekNumbers={showWeekNumbers}
              highlightToday={highlightToday}
            />
          ))
        )}
      </div>
    </Card>
  )
}

