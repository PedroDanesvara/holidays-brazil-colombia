import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HolidayList } from './HolidayList'
import { Country } from '../../types/holiday.types'
import type { Holiday } from '../../types/holiday.types'

describe('HolidayList', () => {
  const mockHolidays: Holiday[] = [
    {
      id: '1',
      name: 'New Year',
      date: '2025-01-01',
      country: Country.BRAZIL,
      year: 2025,
      month: 1,
      day: 1,
      week: 1,
    },
    {
      id: '2',
      name: 'Christmas',
      date: '2025-12-25',
      country: Country.BRAZIL,
      year: 2025,
      month: 12,
      day: 25,
      week: 52,
    },
  ]

  it('renders list of holidays', () => {
    render(<HolidayList holidays={mockHolidays} />)
    
    expect(screen.getByText('New Year')).toBeInTheDocument()
    expect(screen.getByText('Christmas')).toBeInTheDocument()
  })

  it('sorts holidays by date', () => {
    const unsortedHolidays = [...mockHolidays].reverse()
    
    render(<HolidayList holidays={unsortedHolidays} />)
    
    const cards = screen.getAllByText(/New Year|Christmas/)
    expect(cards[0]).toHaveTextContent('New Year')
    expect(cards[1]).toHaveTextContent('Christmas')
  })

  it('shows empty state when no holidays', () => {
    render(<HolidayList holidays={[]} />)
    
    expect(screen.getByText('No holidays found')).toBeInTheDocument()
    expect(screen.getByText(/Try adjusting your filters/)).toBeInTheDocument()
  })

  it('passes showWeek prop to cards', () => {
    render(<HolidayList holidays={mockHolidays} showWeek={true} />)
    
    expect(screen.getAllByText('Week')).toHaveLength(2)
  })
})

