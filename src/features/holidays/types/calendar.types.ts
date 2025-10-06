import type { Holiday } from './holiday.types'

/**
 * Dia do calendário
 */
export interface CalendarDay {
  date: Date
  dateString: string
  day: number
  month: number
  year: number
  isToday: boolean
  isCurrentMonth: boolean
  isWeekend: boolean
  holidays: Holiday[]
  weekNumber: number
}

/**
 * Semana do calendário
 */
export interface CalendarWeek {
  weekNumber: number
  days: CalendarDay[]
}

/**
 * Mês do calendário
 */
export interface CalendarMonth {
  month: number
  year: number
  weeks: CalendarWeek[]
  holidays: Holiday[]
}

/**
 * Configuração do calendário
 */
export interface CalendarConfig {
  firstDayOfWeek: 0 | 1 // 0 = Sunday, 1 = Monday
  showWeekNumbers: boolean
  minDate?: Date
  maxDate?: Date
}

/**
 * Navegação do calendário
 */
export interface CalendarNavigation {
  currentMonth: number
  currentYear: number
  goToNext: () => void
  goToPrevious: () => void
  goToToday: () => void
  goToDate: (date: Date) => void
}

