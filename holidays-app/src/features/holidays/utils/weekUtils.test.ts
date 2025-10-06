import { describe, it, expect } from 'vitest'
import { calculateWeekNumber, getWeeksInMonth } from './weekUtils'

describe('weekUtils', () => {
  describe('calculateWeekNumber', () => {
    it('calculates week number for date', () => {
      const date = new Date('2025-01-06')
      const weekNumber = calculateWeekNumber(date)
      
      expect(typeof weekNumber).toBe('number')
      expect(weekNumber).toBeGreaterThan(0)
      expect(weekNumber).toBeLessThanOrEqual(53)
    })

    it('calculates week 1 for early January', () => {
      const date = new Date('2025-01-01')
      const weekNumber = calculateWeekNumber(date)
      
      expect(weekNumber).toBeGreaterThanOrEqual(1)
      expect(weekNumber).toBeLessThanOrEqual(2)
    })

    it('calculates week number for late December', () => {
      const date = new Date('2025-12-31')
      const weekNumber = calculateWeekNumber(date)
      
      // December 31 can be week 1 of next year or week 52/53 depending on the year
      expect(weekNumber).toBeGreaterThan(0)
      expect(weekNumber).toBeLessThanOrEqual(53)
    })
  })

  describe('getWeeksInMonth', () => {
    it('returns array of week numbers', () => {
      const weeks = getWeeksInMonth(2025, 1)
      
      expect(Array.isArray(weeks)).toBe(true)
      expect(weeks.length).toBeGreaterThan(0)
    })

    it('returns sorted week numbers', () => {
      const weeks = getWeeksInMonth(2025, 6)
      
      for (let i = 1; i < weeks.length; i++) {
        expect(weeks[i]).toBeGreaterThan(weeks[i - 1])
      }
    })

    it('returns unique week numbers', () => {
      const weeks = getWeeksInMonth(2025, 3)
      const uniqueWeeks = new Set(weeks)
      
      expect(uniqueWeeks.size).toBe(weeks.length)
    })

    it('handles February correctly', () => {
      const weeks = getWeeksInMonth(2025, 2)
      
      expect(weeks.length).toBeGreaterThanOrEqual(4)
      expect(weeks.length).toBeLessThanOrEqual(6)
    })
  })
})

