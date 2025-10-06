# 🎉 Passo 6: Feature Holidays (Core Business Logic)

## Objetivo
Implementar toda a lógica de negócio relacionada aos feriados, incluindo listagem, calendário, e utilitários de data.

## Estrutura

```
src/features/holidays/
├── components/
│   ├── HolidayList/
│   ├── HolidayCard/
│   ├── HolidayCalendar/
│   ├── CalendarDay/
│   └── HolidayStats/
├── hooks/
│   ├── useHolidays.ts
│   ├── useFilteredHolidays.ts
│   ├── useHolidayStats.ts
│   ├── useCalendar.ts
│   └── useViewActions.ts
├── services/
│   └── holidayService.ts
├── utils/
│   ├── dateUtils.ts
│   └── weekUtils.ts
└── types/
    ├── holiday.types.ts
    └── calendar.types.ts
```

## 1. Dados dos Feriados

**`src/data/holidays.json`**
```json
[
  {
    "id": "br-2025-new-year",
    "country": "brazil",
    "name": "New Year's Day",
    "date": "2025-01-01",
    "month": 1,
    "day": 1,
    "year": 2025,
    "week": 1
  },
  {
    "id": "br-2025-carnival-1",
    "country": "brazil",
    "name": "Carnival",
    "date": "2025-03-03",
    "month": 3,
    "day": 3,
    "year": 2025,
    "week": 10
  }
  // ... rest of holidays
]
```

### 2. Service Layer

**`src/features/holidays/services/holidayService.ts`**
```typescript
import holidaysData from '@/data/holidays.json'
import { Holiday, Country } from '../types/holiday.types'
import { calculateWeekNumber } from '../utils/weekUtils'

/**
 * Service para gerenciar feriados
 */
export class HolidayService {
  private holidays: Holiday[]

  constructor() {
    this.holidays = holidaysData as Holiday[]
    this.ensureWeekNumbers()
  }

  /**
   * Garante que todos os feriados têm número da semana
   */
  private ensureWeekNumbers(): void {
    this.holidays = this.holidays.map((holiday) => ({
      ...holiday,
      week: holiday.week || calculateWeekNumber(new Date(holiday.date)),
    }))
  }

  /**
   * Retorna todos os feriados
   */
  getAllHolidays(): Holiday[] {
    return [...this.holidays]
  }

  /**
   * Retorna feriados por ano
   */
  getHolidaysByYear(year: number): Holiday[] {
    return this.holidays.filter((h) => h.year === year)
  }

  /**
   * Retorna feriados por país
   */
  getHolidaysByCountry(country: Country): Holiday[] {
    return this.holidays.filter((h) => h.country === country)
  }

  /**
   * Retorna feriados em uma data específica
   */
  getHolidaysByDate(date: Date): Holiday[] {
    const dateString = this.formatDateToISO(date)
    return this.holidays.filter((h) => h.date === dateString)
  }

  /**
   * Retorna feriados em um mês específico
   */
  getHolidaysByMonth(year: number, month: number): Holiday[] {
    return this.holidays.filter((h) => h.year === year && h.month === month)
  }

  /**
   * Retorna feriados em uma semana específica
   */
  getHolidaysByWeek(year: number, week: number): Holiday[] {
    return this.holidays.filter((h) => h.year === year && h.week === week)
  }

  /**
   * Busca feriados por nome
   */
  searchHolidays(query: string): Holiday[] {
    const lowerQuery = query.toLowerCase()
    return this.holidays.filter((h) =>
      h.name.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * Retorna anos disponíveis
   */
  getAvailableYears(): number[] {
    const years = new Set(this.holidays.map((h) => h.year))
    return Array.from(years).sort()
  }

  /**
   * Formata data para ISO string
   */
  private formatDateToISO(date: Date): string {
    return date.toISOString().split('T')[0]
  }
}

// Singleton instance
export const holidayService = new HolidayService()
```

### 3. Utils - Date

**`src/features/holidays/utils/dateUtils.ts`**
```typescript
import { format, parseISO, isToday, isWeekend, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import type { Locale } from '@/types/utils.types'

/**
 * Formata uma data para exibição
 */
export function formatDate(
  date: Date | string,
  formatStr: string = 'PPPP',
  locale?: Locale
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr)
}

/**
 * Formata data completa com dia da semana
 */
export function formatFullDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'EEEE, MMMM d, yyyy')
}

/**
 * Verifica se uma data é hoje
 */
export function isTodayDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isToday(dateObj)
}

/**
 * Verifica se uma data é fim de semana
 */
export function isWeekendDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isWeekend(dateObj)
}

/**
 * Retorna todos os dias de um mês
 */
export function getDaysInMonth(year: number, month: number): Date[] {
  const start = startOfMonth(new Date(year, month - 1))
  const end = endOfMonth(new Date(year, month - 1))
  return eachDayOfInterval({ start, end })
}

/**
 * Retorna o nome do mês
 */
export function getMonthName(month: number): string {
  const date = new Date(2025, month - 1, 1)
  return format(date, 'MMMM')
}

/**
 * Retorna o nome abreviado do dia da semana
 */
export function getWeekdayName(dayIndex: number): string {
  const date = new Date(2025, 0, dayIndex + 1)
  return format(date, 'EEE')
}
```

**`src/features/holidays/utils/weekUtils.ts`**
```typescript
import { getWeek, startOfYear } from 'date-fns'

/**
 * Calcula o número da semana no ano
 */
export function calculateWeekNumber(date: Date): number {
  return getWeek(date, { weekStartsOn: 0 })
}

/**
 * Retorna todas as semanas de um mês
 */
export function getWeeksInMonth(year: number, month: number): number[] {
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)

  const weeks = new Set<number>()

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month - 1, day)
    weeks.add(calculateWeekNumber(date))
  }

  return Array.from(weeks).sort((a, b) => a - b)
}

/**
 * Retorna a data do primeiro dia de uma semana
 */
export function getFirstDayOfWeek(year: number, week: number): Date {
  const yearStart = startOfYear(new Date(year, 0, 1))
  const daysToAdd = (week - 1) * 7
  return new Date(yearStart.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
}
```

### 4. Custom Hooks

**`src/features/holidays/hooks/useHolidays.ts`**
```typescript
import { useMemo } from 'react'
import { holidayService } from '../services/holidayService'

/**
 * Hook para acessar todos os feriados
 */
export function useHolidays() {
  const holidays = useMemo(() => holidayService.getAllHolidays(), [])

  const availableYears = useMemo(
    () => holidayService.getAvailableYears(),
    []
  )

  return {
    holidays,
    availableYears,
  }
}
```

**`src/features/holidays/hooks/useCalendar.ts`**
```typescript
import { useState, useMemo, useCallback } from 'react'
import { CalendarMonth, CalendarWeek, CalendarDay } from '../types/calendar.types'
import { Holiday } from '../types/holiday.types'
import { getDaysInMonth } from '../utils/dateUtils'
import { calculateWeekNumber } from '../utils/weekUtils'
import { holidayService } from '../services/holidayService'

interface UseCalendarProps {
  initialMonth?: number
  initialYear?: number
}

export function useCalendar({
  initialMonth = new Date().getMonth() + 1,
  initialYear = new Date().getFullYear(),
}: UseCalendarProps = {}) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth)
  const [currentYear, setCurrentYear] = useState(initialYear)

  // Gerar calendário do mês atual
  const calendar = useMemo((): CalendarMonth => {
    const days = getDaysInMonth(currentYear, currentMonth)
    const holidays = holidayService.getHolidaysByMonth(currentYear, currentMonth)

    // Agrupar dias por semana
    const weeks: CalendarWeek[] = []
    let currentWeek: CalendarDay[] = []
    let currentWeekNumber = -1

    // Adicionar dias vazios no início
    const firstDayOfWeek = days[0].getDay()
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDate = new Date(currentYear, currentMonth - 1, 1 - (firstDayOfWeek - i))
      currentWeek.push({
        date: emptyDate,
        dateString: emptyDate.toISOString().split('T')[0],
        day: emptyDate.getDate(),
        month: emptyDate.getMonth() + 1,
        year: emptyDate.getFullYear(),
        isToday: false,
        isCurrentMonth: false,
        isWeekend: emptyDate.getDay() === 0 || emptyDate.getDay() === 6,
        holidays: [],
        weekNumber: calculateWeekNumber(emptyDate),
      })
    }

    // Adicionar dias do mês
    days.forEach((date) => {
      const weekNumber = calculateWeekNumber(date)
      const dateString = date.toISOString().split('T')[0]
      const dayHolidays = holidays.filter((h) => h.date === dateString)

      const calendarDay: CalendarDay = {
        date,
        dateString,
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        isToday: date.toDateString() === new Date().toDateString(),
        isCurrentMonth: true,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        holidays: dayHolidays,
        weekNumber,
      }

      if (weekNumber !== currentWeekNumber && currentWeek.length > 0) {
        weeks.push({
          weekNumber: currentWeekNumber,
          days: currentWeek,
        })
        currentWeek = []
      }

      currentWeekNumber = weekNumber
      currentWeek.push(calendarDay)
    })

    // Adicionar última semana
    if (currentWeek.length > 0) {
      // Preencher dias restantes da semana
      while (currentWeek.length < 7) {
        const lastDate = currentWeek[currentWeek.length - 1].date
        const nextDate = new Date(lastDate)
        nextDate.setDate(lastDate.getDate() + 1)

        currentWeek.push({
          date: nextDate,
          dateString: nextDate.toISOString().split('T')[0],
          day: nextDate.getDate(),
          month: nextDate.getMonth() + 1,
          year: nextDate.getFullYear(),
          isToday: false,
          isCurrentMonth: false,
          isWeekend: nextDate.getDay() === 0 || nextDate.getDay() === 6,
          holidays: [],
          weekNumber: calculateWeekNumber(nextDate),
        })
      }

      weeks.push({
        weekNumber: currentWeekNumber,
        days: currentWeek,
      })
    }

    return {
      month: currentMonth,
      year: currentYear,
      weeks,
      holidays,
    }
  }, [currentMonth, currentYear])

  // Navegação
  const goToNext = useCallback(() => {
    if (currentMonth === 12) {
      setCurrentMonth(1)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }, [currentMonth])

  const goToPrevious = useCallback(() => {
    if (currentMonth === 1) {
      setCurrentMonth(12)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }, [currentMonth])

  const goToToday = useCallback(() => {
    const today = new Date()
    setCurrentMonth(today.getMonth() + 1)
    setCurrentYear(today.getFullYear())
  }, [])

  const goToDate = useCallback((date: Date) => {
    setCurrentMonth(date.getMonth() + 1)
    setCurrentYear(date.getFullYear())
  }, [])

  return {
    calendar,
    currentMonth,
    currentYear,
    navigation: {
      goToNext,
      goToPrevious,
      goToToday,
      goToDate,
    },
  }
}
```

### 5. Componentes

**`src/features/holidays/components/HolidayCard/HolidayCard.tsx`**
```typescript
import { Holiday, CountryColors, CountryLabels } from '../../types/holiday.types'
import { Card } from '@/components/ui/Card'
import { formatFullDate } from '../../utils/dateUtils'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface HolidayCardProps {
  holiday: Holiday
  showWeek?: boolean
}

export function HolidayCard({ holiday, showWeek = true }: HolidayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card hoverable className="group">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-brazil transition-colors">
              {holiday.name}
            </h3>
            
            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-3 py-1 text-xs font-medium text-white rounded-full"
                style={{ backgroundColor: CountryColors[holiday.country] }}
              >
                {CountryLabels[holiday.country]}
              </span>
            </div>
            
            <p className="text-sm text-gray-600">
              {formatFullDate(holiday.date)}
            </p>
            
            {holiday.description && (
              <p className="text-sm text-gray-500 mt-2">
                {holiday.description}
              </p>
            )}
          </div>
          
          {showWeek && (
            <div className="flex flex-col items-center bg-brazil-light px-4 py-2 rounded-lg">
              <span className="text-xs text-gray-600">Week</span>
              <span className="text-lg font-bold text-brazil">
                {holiday.week}
              </span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
```

**`src/features/holidays/components/HolidayList/HolidayList.tsx`**
```typescript
import { Holiday } from '../../types/holiday.types'
import { HolidayCard } from '../HolidayCard'
import { EmptyState } from '@/components/common/EmptyState'
import { Calendar } from 'lucide-react'

interface HolidayListProps {
  holidays: Holiday[]
  showWeek?: boolean
}

export function HolidayList({ holidays, showWeek }: HolidayListProps) {
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
```

---

**Próximo Passo**: [07-feature-calendar.md](./07-feature-calendar.md)

