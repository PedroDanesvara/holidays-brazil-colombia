import type { Holiday } from '../../types/holiday.types'
import { HolidayCard } from '../HolidayCard'
import { EmptyState } from '@/components/common/EmptyState'
import { Calendar } from 'lucide-react'

interface HolidayListProps {
  holidays: Holiday[]
  showWeek?: boolean
}

export function HolidayList({ holidays, showWeek = true }: HolidayListProps) {
  if (holidays.length === 0) {
    return (
      <EmptyState
        icon={<Calendar size={48} />}
        title="No holidays found"
        description="Try adjusting your filters to see more results."
      />
    )
  }

  // Sort by date
  const sortedHolidays = [...holidays].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return (
    <div className="space-y-4">
      {sortedHolidays.map((holiday) => (
        <HolidayCard key={holiday.id} holiday={holiday} showWeek={showWeek} />
      ))}
    </div>
  )
}

