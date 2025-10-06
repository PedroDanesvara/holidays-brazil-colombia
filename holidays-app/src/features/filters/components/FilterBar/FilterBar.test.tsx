import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FilterBar } from './FilterBar'

// Mock Zustand store
vi.mock('@/store', () => ({
  useStore: vi.fn((selector) => {
    const state = {
      filters: {
        countries: {
          brazil: true,
          colombia: true,
        },
        year: 2025,
        month: 'all',
        week: 'all',
      },
      setCountryFilter: vi.fn(),
      setMonthFilter: vi.fn(),
      setWeekFilter: vi.fn(),
      setYearFilter: vi.fn(),
      resetFilters: vi.fn(),
    }
    return selector ? selector(state) : state
  }),
}))

// Mock hooks
vi.mock('@/features/filters/hooks/useFilterActions', () => ({
  useFilterActions: () => ({
    resetFilters: vi.fn(),
    setCountryFilter: vi.fn(),
    setMonthFilter: vi.fn(),
    setWeekFilter: vi.fn(),
    setYearFilter: vi.fn(),
    toggleCountry: vi.fn(),
  }),
}))

vi.mock('@/features/filters/hooks/useFilterOptions', () => ({
  useFilterOptions: () => ({
    yearOptions: [{ label: '2025', value: 2025 }],
    monthOptions: [{ label: 'All Months', value: 'all' }],
    weekOptions: [{ label: 'All Weeks', value: 'all' }],
  }),
}))

vi.mock('@/features/holidays/hooks/useHolidays', () => ({
  useHolidays: () => ({
    holidays: [],
    availableYears: [2025],
  }),
}))

describe('FilterBar', () => {
  it('renders filter components', () => {
    render(<FilterBar />)
    
    expect(screen.getByText('Countries')).toBeInTheDocument()
    expect(screen.getByText('Clear Filters')).toBeInTheDocument()
  })

  it('renders country checkboxes', () => {
    render(<FilterBar />)
    
    expect(screen.getByLabelText('Brazil')).toBeInTheDocument()
    expect(screen.getByLabelText('Colombia')).toBeInTheDocument()
  })

  it('renders reset button', () => {
    render(<FilterBar />)
    
    const resetButton = screen.getByRole('button', { name: /clear filters/i })
    expect(resetButton).toBeInTheDocument()
  })
})

