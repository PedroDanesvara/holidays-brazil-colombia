import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HolidayCard } from './HolidayCard'
import { Country } from '../../types/holiday.types'
import type { Holiday } from '../../types/holiday.types'

describe('HolidayCard', () => {
  const mockHoliday: Holiday = {
    id: '1',
    name: 'New Year',
    date: '2025-01-01',
    country: Country.BRAZIL,
    year: 2025,
    month: 1,
    day: 1,
    week: 1,
  }

  it('renders holiday name', () => {
    render(<HolidayCard holiday={mockHoliday} />)
    expect(screen.getByText('New Year')).toBeInTheDocument()
  })

  it('renders country badge', () => {
    render(<HolidayCard holiday={mockHoliday} />)
    expect(screen.getByText('Brazil')).toBeInTheDocument()
  })

  it('renders week number when showWeek is true', () => {
    render(<HolidayCard holiday={mockHoliday} showWeek={true} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('Week')).toBeInTheDocument()
  })

  it('does not render week number when showWeek is false', () => {
    render(<HolidayCard holiday={mockHoliday} showWeek={false} />)
    expect(screen.queryByText('Week')).not.toBeInTheDocument()
  })

  it('renders description when provided', () => {
    const holidayWithDesc: Holiday = {
      ...mockHoliday,
      description: 'First day of the year',
    }
    
    render(<HolidayCard holiday={holidayWithDesc} />)
    expect(screen.getByText('First day of the year')).toBeInTheDocument()
  })

  it('renders Colombia holidays with correct badge', () => {
    const colombiaHoliday: Holiday = {
      ...mockHoliday,
      country: Country.COLOMBIA,
    }
    
    render(<HolidayCard holiday={colombiaHoliday} />)
    expect(screen.getByText('Colombia')).toBeInTheDocument()
  })
})

