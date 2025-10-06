import { Country } from '@/features/holidays/types/holiday.types'
import type { Holiday } from '@/features/holidays/types/holiday.types'

/**
 * Verifica se um valor é um Country válido
 */
export function isCountry(value: unknown): value is Country {
  return (
    typeof value === 'string' &&
    Object.values(Country).includes(value as Country)
  )
}

/**
 * Verifica se um objeto é um Holiday válido
 */
export function isHoliday(obj: unknown): obj is Holiday {
  if (typeof obj !== 'object' || obj === null) return false
  
  const holiday = obj as Record<string, unknown>
  
  return (
    typeof holiday.id === 'string' &&
    isCountry(holiday.country) &&
    typeof holiday.name === 'string' &&
    typeof holiday.date === 'string' &&
    typeof holiday.month === 'number' &&
    typeof holiday.day === 'number' &&
    typeof holiday.year === 'number' &&
    typeof holiday.week === 'number'
  )
}

/**
 * Verifica se um valor é um array de Holidays
 */
export function isHolidayArray(value: unknown): value is Holiday[] {
  return Array.isArray(value) && value.every(isHoliday)
}

