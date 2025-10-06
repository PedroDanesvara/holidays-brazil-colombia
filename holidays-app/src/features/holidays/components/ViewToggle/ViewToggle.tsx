import { Button } from '@/components/ui/Button'
import { useStore } from '@/store'
import { useViewActions } from '../../hooks/useViewActions'
import { ViewMode } from '../../types/holiday.types'
import { List, Calendar as CalendarIcon } from 'lucide-react'

export function ViewToggle() {
  const viewMode = useStore((state) => state.viewMode)
  const { setViewMode } = useViewActions()

  return (
    <div className="flex gap-2">
      <Button
        variant={viewMode === ViewMode.LIST ? 'primary' : 'secondary'}
        onClick={() => setViewMode(ViewMode.LIST)}
        leftIcon={<List size={18} />}
      >
        List
      </Button>
      <Button
        variant={viewMode === ViewMode.CALENDAR ? 'primary' : 'secondary'}
        onClick={() => setViewMode(ViewMode.CALENDAR)}
        leftIcon={<CalendarIcon size={18} />}
      >
        Calendar
      </Button>
    </div>
  )
}

