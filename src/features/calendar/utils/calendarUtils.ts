import { getDaysInMonth } from '@/features/holidays/utils/dateUtils'
import { calculateWeekNumber } from '@/features/holidays/utils/weekUtils'
import type { CalendarDay, CalendarWeek, CalendarMonth } from '@/features/holidays/types/calendar.types'
import type { Holiday } from '@/features/holidays/types/holiday.types'

/**
 * Gera os dias do calendário para um mês específico
 */
export function generateCalendarMonth(
  year: number,
  month: number,
  holidays: Holiday[]
): CalendarMonth {
  const days = getDaysInMonth(year, month)
  const firstDay = days[0]
  const startingDayOfWeek = firstDay.getDay()

  // Create calendar days
  const calendarDays: CalendarDay[] = []

  // Add empty days for previous month
  for (let i = 0; i < startingDayOfWeek; i++) {
    const prevDate = new Date(year, month - 1, -startingDayOfWeek + i + 1)
    calendarDays.push({
      date: prevDate,
      dateString: prevDate.toISOString().split('T')[0],
      day: prevDate.getDate(),
      month: prevDate.getMonth() + 1,
      year: prevDate.getFullYear(),
      isCurrentMonth: false,
      isToday: false,
      isWeekend: prevDate.getDay() === 0 || prevDate.getDay() === 6,
      holidays: [],
      weekNumber: calculateWeekNumber(prevDate),
    })
  }

  // Add days for current month
  for (const day of days) {
    const dateStr = day.toISOString().split('T')[0]
    const dayHolidays = holidays.filter((h) => h.date === dateStr)

    calendarDays.push({
      date: day,
      dateString: dateStr,
      day: day.getDate(),
      month: day.getMonth() + 1,
      year: day.getFullYear(),
      isCurrentMonth: true,
      isToday: isToday(day),
      isWeekend: day.getDay() === 0 || day.getDay() === 6,
      holidays: dayHolidays,
      weekNumber: calculateWeekNumber(day),
    })
  }

  // Add empty days for next month
  const remainingDays = 42 - calendarDays.length // 6 weeks * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const nextDate = new Date(year, month, i)
    calendarDays.push({
      date: nextDate,
      dateString: nextDate.toISOString().split('T')[0],
      day: nextDate.getDate(),
      month: nextDate.getMonth() + 1,
      year: nextDate.getFullYear(),
      isCurrentMonth: false,
      isToday: false,
      isWeekend: nextDate.getDay() === 0 || nextDate.getDay() === 6,
      holidays: [],
      weekNumber: calculateWeekNumber(nextDate),
    })
  }

  // Group into weeks
  const weeks: CalendarWeek[] = []
  for (let i = 0; i < calendarDays.length; i += 7) {
    const weekDays = calendarDays.slice(i, i + 7)
    weeks.push({
      weekNumber: weekDays[0].weekNumber,
      days: weekDays,
    })
  }

  return {
    year,
    month,
    weeks,
    holidays,
  }
}

/**
 * Verifica se uma data é hoje
 */
function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

