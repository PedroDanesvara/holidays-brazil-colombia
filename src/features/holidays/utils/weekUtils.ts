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

