import holidaysData from '@/data/holidays.json'
import type { Holiday, Country } from '../types/holiday.types'
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

