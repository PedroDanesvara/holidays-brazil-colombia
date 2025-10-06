import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatFullDate,
  isTodayDate,
  isWeekendDate,
  getDaysInMonth,
  getMonthName,
} from './dateUtils'

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats date object', () => {
      const date = new Date('2025-10-06')
      const formatted = formatDate(date, 'yyyy-MM-dd')
      expect(formatted).toMatch(/2025-10-0[56]/)
    })

    it('formats date string', () => {
      const dateString = '2025-10-06'
      const formatted = formatDate(dateString, 'yyyy-MM-dd')
      expect(formatted).toBe('2025-10-06')
    })
  })

  describe('formatFullDate', () => {
    it('formats full date with day of week', () => {
      const date = '2025-10-06'
      const formatted = formatFullDate(date)
      expect(formatted).toContain('2025')
      expect(formatted).toContain('October')
    })
  })

  describe('isTodayDate', () => {
    it('returns true for today', () => {
      const today = new Date()
      expect(isTodayDate(today)).toBe(true)
    })

    it('returns false for other dates', () => {
      const otherDate = new Date('2025-01-01')
      expect(isTodayDate(otherDate)).toBe(false)
    })
  })

  describe('isWeekendDate', () => {
    it('returns true for Saturday', () => {
      // Create date at noon to avoid timezone issues
      const saturday = new Date(2025, 9, 4, 12) // October 4, 2025 (Saturday)
      expect(isWeekendDate(saturday)).toBe(true)
    })

    it('returns true for Sunday', () => {
      const sunday = new Date(2025, 9, 5, 12) // October 5, 2025 (Sunday)
      expect(isWeekendDate(sunday)).toBe(true)
    })

    it('returns false for weekday', () => {
      const monday = new Date(2025, 9, 6, 12) // October 6, 2025 (Monday)
      expect(isWeekendDate(monday)).toBe(false)
    })
  })

  describe('getDaysInMonth', () => {
    it('returns correct number of days for January', () => {
      const days = getDaysInMonth(2025, 1)
      expect(days).toHaveLength(31)
    })

    it('returns correct number of days for February (non-leap year)', () => {
      const days = getDaysInMonth(2025, 2)
      expect(days).toHaveLength(28)
    })

    it('returns correct number of days for February (leap year)', () => {
      const days = getDaysInMonth(2024, 2)
      expect(days).toHaveLength(29)
    })

    it('returns correct number of days for April', () => {
      const days = getDaysInMonth(2025, 4)
      expect(days).toHaveLength(30)
    })
  })

  describe('getMonthName', () => {
    it('returns correct month name for January', () => {
      expect(getMonthName(1)).toBe('January')
    })

    it('returns correct month name for December', () => {
      expect(getMonthName(12)).toBe('December')
    })

    it('returns correct month name for June', () => {
      expect(getMonthName(6)).toBe('June')
    })
  })
})

