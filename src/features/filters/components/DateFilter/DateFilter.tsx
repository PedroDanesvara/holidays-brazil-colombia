import { Select } from '@/components/ui/Select'
import { useStore } from '@/store'
import { useFilterActions } from '../../hooks/useFilterActions'
import { useFilterOptions } from '../../hooks/useFilterOptions'

export function DateFilter() {
  const year = useStore((state) => state.filters.year)
  const month = useStore((state) => state.filters.month)
  const week = useStore((state) => state.filters.week)
  
  const { setYearFilter, setMonthFilter, setWeekFilter } = useFilterActions()
  const { yearOptions, monthOptions, weekOptions } = useFilterOptions()

  const handleMonthChange = (value: string | number) => {
    if (value === 'all') {
      setMonthFilter('all')
    } else {
      setMonthFilter(Number(value))
    }
  }

  const handleWeekChange = (value: string | number) => {
    if (value === 'all') {
      setWeekFilter('all')
    } else {
      setWeekFilter(Number(value))
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Year */}
      <Select
        label="Year"
        value={year}
        onChange={(value) => setYearFilter(Number(value))}
        options={yearOptions}
      />

      {/* Month */}
      <Select
        label="Month"
        value={month}
        onChange={handleMonthChange}
        options={monthOptions}
      />

      {/* Week */}
      <Select
        label="Week"
        value={week}
        onChange={handleWeekChange}
        options={weekOptions}
        disabled={month === 'all'}
      />
    </div>
  )
}

