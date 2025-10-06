# 📅 Passo 7: Feature Calendar (Visualização de Calendário)

## Objetivo
Implementar a visualização de calendário interativo com navegação, indicadores de feriados e tooltips.

## Componentes do Calendário

### 1. CalendarDay

**`src/features/holidays/components/CalendarDay/CalendarDay.tsx`**
```typescript
import { useState } from 'react'
import { CalendarDay as CalendarDayType } from '../../types/calendar.types'
import { CountryColors } from '../../types/holiday.types'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

interface CalendarDayProps {
  day: CalendarDayType
  onDayClick?: (day: CalendarDayType) => void
}

export function CalendarDay({ day, onDayClick }: CalendarDayProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  
  const hasHolidays = day.holidays.length > 0
  const hasMultipleCountries = new Set(day.holidays.map(h => h.country)).size > 1

  return (
    <motion.div
      className={clsx(
        'relative min-h-[80px] p-2 border transition-all cursor-pointer',
        day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
        day.isToday && 'ring-2 ring-brazil ring-offset-1',
        hasHolidays && 'hover:shadow-md',
        !day.isCurrentMonth && 'text-gray-400'
      )}
      onClick={() => onDayClick?.(day)}
      onMouseEnter={() => hasHolidays && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      whileHover={hasHolidays ? { scale: 1.02 } : undefined}
    >
      {/* Day Number */}
      <div
        className={clsx(
          'text-sm font-semibold mb-1',
          day.isToday && 'text-brazil',
          day.isWeekend && day.isCurrentMonth && 'text-colombia',
          !day.isToday && !day.isWeekend && day.isCurrentMonth && 'text-gray-900'
        )}
      >
        {day.day}
      </div>

      {/* Holiday Indicators */}
      {hasHolidays && (
        <div className="absolute bottom-1 left-1 right-1 flex gap-0.5">
          {hasMultipleCountries ? (
            // Gradient bar for multiple countries
            <div
              className="h-1 w-full rounded"
              style={{
                background: `linear-gradient(90deg, ${CountryColors.brazil} 50%, ${CountryColors.colombia} 50%)`,
              }}
            />
          ) : (
            // Single color bar
            <div
              className="h-1 w-full rounded"
              style={{
                backgroundColor: CountryColors[day.holidays[0].country],
              }}
            />
          )}
        </div>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && hasHolidays && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 top-full left-0 mt-2 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl min-w-[200px] max-w-[300px]"
            style={{ pointerEvents: 'none' }}
          >
            {day.holidays.map((holiday, index) => (
              <div key={holiday.id} className={index > 0 ? 'mt-2 pt-2 border-t border-gray-700' : ''}>
                <div className="font-semibold">{holiday.name}</div>
                <div className="text-gray-300 capitalize">{holiday.country}</div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
```

**`src/features/holidays/components/CalendarDay/index.ts`**
```typescript
export { CalendarDay } from './CalendarDay'
```

### 2. CalendarGrid

**`src/features/holidays/components/CalendarGrid/CalendarGrid.tsx`**
```typescript
import { CalendarMonth, CalendarDay as CalendarDayType } from '../../types/calendar.types'
import { CalendarDay } from '../CalendarDay'
import { getWeekdayName } from '../../utils/dateUtils'

interface CalendarGridProps {
  calendar: CalendarMonth
  showWeekNumbers?: boolean
  onDayClick?: (day: CalendarDayType) => void
}

const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6] // Sunday to Saturday

export function CalendarGrid({ calendar, showWeekNumbers = false, onDayClick }: CalendarGridProps) {
  return (
    <div>
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((dayIndex) => (
          <div
            key={dayIndex}
            className="text-center text-sm font-semibold text-gray-600 py-2 bg-brazil-light rounded"
          >
            {getWeekdayName(dayIndex)}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {calendar.weeks.flatMap((week) =>
          week.days.map((day) => (
            <CalendarDay
              key={`${day.year}-${day.month}-${day.day}`}
              day={day}
              onDayClick={onDayClick}
            />
          ))
        )}
      </div>
    </div>
  )
}
```

**`src/features/holidays/components/CalendarGrid/index.ts`**
```typescript
export { CalendarGrid } from './CalendarGrid'
```

### 3. CalendarHeader

**`src/features/holidays/components/CalendarHeader/CalendarHeader.tsx`**
```typescript
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { getMonthName } from '../../utils/dateUtils'

interface CalendarHeaderProps {
  month: number
  year: number
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
}

export function CalendarHeader({
  month,
  year,
  onPrevious,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrevious}
        leftIcon={<ChevronLeft size={16} />}
        aria-label="Previous month"
      >
        Previous
      </Button>

      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {getMonthName(month)} {year}
        </h2>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToday}
          leftIcon={<Calendar size={16} />}
        >
          Today
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        rightIcon={<ChevronRight size={16} />}
        aria-label="Next month"
      >
        Next
      </Button>
    </div>
  )
}
```

**`src/features/holidays/components/CalendarHeader/index.ts`**
```typescript
export { CalendarHeader } from './CalendarHeader'
```

### 4. HolidayCalendar (Container)

**`src/features/holidays/components/HolidayCalendar/HolidayCalendar.tsx`**
```typescript
import { useState } from 'react'
import { useCalendar } from '../../hooks/useCalendar'
import { useViewMode } from '@/store'
import { CalendarHeader } from '../CalendarHeader'
import { CalendarGrid } from '../CalendarGrid'
import { CalendarDay } from '../../types/calendar.types'
import { Modal } from '@/components/ui/Modal'
import { HolidayCard } from '../HolidayCard'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'

export function HolidayCalendar() {
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)
  const showWeekNumbers = useViewMode() // From store
  
  const { calendar, navigation } = useCalendar()

  const handleDayClick = (day: CalendarDay) => {
    if (day.holidays.length > 0) {
      setSelectedDay(day)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card>
          <CalendarHeader
            month={calendar.month}
            year={calendar.year}
            onPrevious={navigation.goToPrevious}
            onNext={navigation.goToNext}
            onToday={navigation.goToToday}
          />
          
          <CalendarGrid
            calendar={calendar}
            showWeekNumbers={showWeekNumbers}
            onDayClick={handleDayClick}
          />
        </Card>
      </motion.div>

      {/* Modal for Day Details */}
      <Modal
        isOpen={!!selectedDay}
        onClose={() => setSelectedDay(null)}
        title={selectedDay ? `Holidays on ${selectedDay.dateString}` : ''}
        size="md"
      >
        {selectedDay && (
          <div className="space-y-4">
            {selectedDay.holidays.map((holiday) => (
              <HolidayCard key={holiday.id} holiday={holiday} showWeek={false} />
            ))}
          </div>
        )}
      </Modal>
    </>
  )
}
```

**`src/features/holidays/components/HolidayCalendar/index.ts`**
```typescript
export { HolidayCalendar } from './HolidayCalendar'
```

### 5. CalendarLegend

**`src/features/holidays/components/CalendarLegend/CalendarLegend.tsx`**
```typescript
import { CountryColors, CountryLabels, Country } from '../../types/holiday.types'
import { Card } from '@/components/ui/Card'

export function CalendarLegend() {
  return (
    <Card className="mt-4">
      <div className="flex items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: CountryColors[Country.BRAZIL] }}
          />
          <span className="text-sm text-gray-700">
            {CountryLabels[Country.BRAZIL]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: CountryColors[Country.COLOMBIA] }}
          />
          <span className="text-sm text-gray-700">
            {CountryLabels[Country.COLOMBIA]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{
              background: `linear-gradient(90deg, ${CountryColors[Country.BRAZIL]} 50%, ${CountryColors[Country.COLOMBIA]} 50%)`,
            }}
          />
          <span className="text-sm text-gray-700">Both Countries</span>
        </div>
      </div>
    </Card>
  )
}
```

**`src/features/holidays/components/CalendarLegend/index.ts`**
```typescript
export { CalendarLegend } from './CalendarLegend'
```

## Acessibilidade

### Navegação por Teclado

Adicionar suporte para navegação:

```typescript
// Em CalendarDay
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    onDayClick?.(day)
  }
}

return (
  <div
    role="button"
    tabIndex={0}
    onKeyDown={handleKeyDown}
    aria-label={`${day.day} ${getMonthName(day.month)} ${day.year}${
      hasHolidays ? `, ${day.holidays.length} holiday(s)` : ''
    }`}
    // ... rest
  >
```

### ARIA Labels

```typescript
// Em CalendarGrid
<div
  role="grid"
  aria-label={`Calendar for ${getMonthName(calendar.month)} ${calendar.year}`}
>
```

## Otimizações de Performance

### 1. Memoização de Componentes

```typescript
import { memo } from 'react'

export const CalendarDay = memo(CalendarDayComponent)
```

### 2. Virtual Scrolling (Futuro)

Para calendários anuais ou multi-mês, considerar:
```bash
npm install @tanstack/react-virtual
```

### 3. Lazy Loading de Modais

```typescript
import { lazy, Suspense } from 'react'

const HolidayDetailModal = lazy(() => import('./HolidayDetailModal'))

// Usage
<Suspense fallback={<LoadingSpinner />}>
  <HolidayDetailModal />
</Suspense>
```

## Testes

**`src/features/holidays/components/CalendarDay/CalendarDay.test.tsx`**
```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CalendarDay } from './CalendarDay'
import { CalendarDay as CalendarDayType } from '../../types/calendar.types'
import { Country } from '../../types/holiday.types'

describe('CalendarDay', () => {
  const mockDay: CalendarDayType = {
    date: new Date(2025, 0, 1),
    dateString: '2025-01-01',
    day: 1,
    month: 1,
    year: 2025,
    isToday: false,
    isCurrentMonth: true,
    isWeekend: false,
    holidays: [
      {
        id: 'test-1',
        country: Country.BRAZIL,
        name: 'New Year',
        date: '2025-01-01',
        month: 1,
        day: 1,
        year: 2025,
        week: 1,
      },
    ],
    weekNumber: 1,
  }

  it('renders day number', () => {
    render(<CalendarDay day={mockDay} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('shows holiday indicator when holidays exist', () => {
    const { container } = render(<CalendarDay day={mockDay} />)
    const indicator = container.querySelector('[style*="background"]')
    expect(indicator).toBeInTheDocument()
  })

  it('calls onDayClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<CalendarDay day={mockDay} onDayClick={handleClick} />)

    await userEvent.click(screen.getByText('1'))
    expect(handleClick).toHaveBeenCalledWith(mockDay)
  })

  it('shows tooltip on hover when holidays exist', async () => {
    render(<CalendarDay day={mockDay} />)
    
    const dayElement = screen.getByText('1').parentElement!
    await userEvent.hover(dayElement)
    
    // Tooltip should appear
    expect(await screen.findByText('New Year')).toBeInTheDocument()
  })
})
```

## Features Futuras

1. **Multi-Month View**: Exibir 3 meses de uma vez
2. **Year View**: Calendário anual completo
3. **Export Calendar**: Exportar para iCal format
4. **Drag & Drop**: Permitir arrastar para criar ranges
5. **Recurring Events**: Suporte para feriados recorrentes
6. **Custom Events**: Usuário adicionar eventos próprios

---

**Próximo Passo**: [08-feature-filters.md](./08-feature-filters.md)

