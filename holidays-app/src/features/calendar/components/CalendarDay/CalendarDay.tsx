import clsx from 'clsx'
import type { CalendarDay as CalendarDayType } from '@/features/holidays/types/calendar.types'
import { CountryColors } from '@/features/holidays/types/holiday.types'

interface CalendarDayProps {
  day: CalendarDayType
  showWeekNumbers: boolean
  highlightToday: boolean
}

export function CalendarDay({
  day,
  showWeekNumbers,
  highlightToday,
}: CalendarDayProps) {
  const hasHolidays = day.holidays.length > 0

  return (
    <div
      className={clsx(
        'min-h-[100px] border border-gray-200 p-2',
        !day.isCurrentMonth && 'bg-gray-50',
        day.isToday && highlightToday && 'bg-blue-50 ring-2 ring-blue-400',
        hasHolidays && 'bg-[#E8F2FF]'
      )}
    >
      <div className="flex justify-between items-start mb-1">
        <span
          className={clsx(
            'text-sm font-medium',
            !day.isCurrentMonth && 'text-gray-400',
            day.isToday && 'text-blue-600 font-bold'
          )}
        >
          {day.day}
        </span>
        {showWeekNumbers && day.day <= 7 && (
          <span className="text-xs text-gray-400">W{day.weekNumber}</span>
        )}
      </div>

      {hasHolidays && (
        <div className="space-y-1">
          {day.holidays.map((holiday) => (
            <div
              key={holiday.id}
              className="text-xs p-1 rounded text-white truncate"
              style={{ backgroundColor: CountryColors[holiday.country] }}
              title={holiday.name}
            >
              {holiday.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

