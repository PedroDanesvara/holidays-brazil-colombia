import { format, parseISO, isToday, isWeekend, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

/**
 * Formata uma data para exibição
 */
export function formatDate(
  date: Date | string,
  formatStr: string = 'PPP'
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

