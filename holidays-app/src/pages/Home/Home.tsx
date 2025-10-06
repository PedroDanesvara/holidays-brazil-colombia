import { useHolidays } from '@/features/holidays'
import { useFilteredHolidays } from '@/features/holidays/hooks/useFilteredHolidays'
import { useHolidayStats } from '@/features/holidays/hooks/useHolidayStats'
import { HolidayList, HolidayStats, ViewToggle } from '@/features/holidays/components'
import { FilterBar } from '@/features/filters/components'
import { CalendarGrid } from '@/features/calendar/components'
import { useStore } from '@/store'
import { ViewMode } from '@/features/holidays/types/holiday.types'
import { motion } from 'framer-motion'

export function Home() {
  const { holidays } = useHolidays()
  const filteredHolidays = useFilteredHolidays(holidays)
  const stats = useHolidayStats(holidays, filteredHolidays)
  const viewMode = useStore((state) => state.viewMode)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Holidays Calendar
        </h1>
        <p className="text-white/90 text-lg">
          Explore holidays from Brazil and Colombia
        </p>
      </motion.div>

      {/* Statistics */}
      <HolidayStats stats={stats} />

      {/* Filters */}
      <FilterBar />

      {/* View Toggle */}
      <div className="flex justify-end">
        <ViewToggle />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {viewMode === ViewMode.LIST ? (
          <HolidayList holidays={filteredHolidays} />
        ) : (
          <CalendarGrid holidays={holidays} />
        )}
      </motion.div>
    </div>
  )
}

