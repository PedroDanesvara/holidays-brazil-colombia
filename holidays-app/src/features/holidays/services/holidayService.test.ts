import { describe, it, expect, beforeEach } from 'vitest'
import { HolidayService } from './holidayService'
import { Country } from '../types/holiday.types'

describe('HolidayService', () => {
  let service: HolidayService

  beforeEach(() => {
    service = new HolidayService()
  })

  describe('getAllHolidays', () => {
    it('returns all holidays', () => {
      const holidays = service.getAllHolidays()
      expect(holidays).toBeDefined()
      expect(Array.isArray(holidays)).toBe(true)
      expect(holidays.length).toBeGreaterThan(0)
    })

    it('ensures all holidays have week numbers', () => {
      const holidays = service.getAllHolidays()
      holidays.forEach((holiday) => {
        expect(holiday.week).toBeDefined()
        expect(typeof holiday.week).toBe('number')
      })
    })
  })

  describe('getHolidaysByYear', () => {
    it('returns holidays for specific year', () => {
      const year = 2025
      const holidays = service.getHolidaysByYear(year)
      
      holidays.forEach((holiday) => {
        expect(holiday.year).toBe(year)
      })
    })

    it('returns empty array for non-existent year', () => {
      const holidays = service.getHolidaysByYear(9999)
      expect(holidays).toEqual([])
    })
  })

  describe('getHolidaysByCountry', () => {
    it('returns holidays for Brazil', () => {
      const holidays = service.getHolidaysByCountry(Country.BRAZIL)
      
      expect(holidays.length).toBeGreaterThan(0)
      holidays.forEach((holiday) => {
        expect(holiday.country).toBe(Country.BRAZIL)
      })
    })

    it('returns holidays for Colombia', () => {
      const holidays = service.getHolidaysByCountry(Country.COLOMBIA)
      
      expect(holidays.length).toBeGreaterThan(0)
      holidays.forEach((holiday) => {
        expect(holiday.country).toBe(Country.COLOMBIA)
      })
    })
  })

  describe('getHolidaysByMonth', () => {
    it('returns holidays for specific month and year', () => {
      const holidays = service.getHolidaysByMonth(2025, 1)
      
      holidays.forEach((holiday) => {
        expect(holiday.year).toBe(2025)
        expect(holiday.month).toBe(1)
      })
    })
  })

  describe('getHolidaysByWeek', () => {
    it('returns holidays for specific week', () => {
      const holidays = service.getHolidaysByWeek(2025, 1)
      
      holidays.forEach((holiday) => {
        expect(holiday.year).toBe(2025)
        expect(holiday.week).toBe(1)
      })
    })
  })

  describe('searchHolidays', () => {
    it('finds holidays by name (case insensitive)', () => {
      const allHolidays = service.getAllHolidays()
      
      if (allHolidays.length > 0) {
        const firstHolidayName = allHolidays[0].name.toLowerCase()
        const searchTerm = firstHolidayName.substring(0, 3)
        
        const results = service.searchHolidays(searchTerm)
        expect(results.length).toBeGreaterThan(0)
        
        results.forEach((holiday) => {
          expect(holiday.name.toLowerCase()).toContain(searchTerm)
        })
      }
    })

    it('returns empty array when no match', () => {
      const results = service.searchHolidays('xyznonexistent')
      expect(results).toEqual([])
    })
  })

  describe('getAvailableYears', () => {
    it('returns sorted array of unique years', () => {
      const years = service.getAvailableYears()
      
      expect(Array.isArray(years)).toBe(true)
      expect(years.length).toBeGreaterThan(0)
      
      // Check if sorted
      for (let i = 1; i < years.length; i++) {
        expect(years[i]).toBeGreaterThan(years[i - 1])
      }
      
      // Check if unique
      const uniqueYears = new Set(years)
      expect(uniqueYears.size).toBe(years.length)
    })
  })

  describe('getHolidaysByDate', () => {
    it('returns holidays for specific date', () => {
      const allHolidays = service.getAllHolidays()
      
      if (allHolidays.length > 0) {
        const firstHoliday = allHolidays[0]
        const date = new Date(firstHoliday.date)
        
        const holidays = service.getHolidaysByDate(date)
        
        expect(holidays.length).toBeGreaterThan(0)
        expect(holidays[0].date).toBe(firstHoliday.date)
      }
    })
  })
})

