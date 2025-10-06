# 🔍 Passo 8: Feature Filters (Sistema de Filtros)

## Objetivo
Implementar sistema completo de filtros com componentes reutilizáveis e lógica de negócio isolada.

## Estrutura

```
src/features/filters/
├── components/
│   ├── FilterBar/
│   ├── CountryFilter/
│   ├── DateFilter/
│   └── FilterActions/
├── hooks/
│   ├── useFilters.ts
│   └── useFilterOptions.ts
└── types/
    └── filter.types.ts
```

## 1. FilterBar Container

**`src/features/filters/components/FilterBar/FilterBar.tsx`**
```typescript
import { CountryFilter } from '../CountryFilter'
import { DateFilter } from '../DateFilter'
import { FilterActions } from '../FilterActions'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'

export function FilterBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <div className="flex flex-wrap items-end gap-4">
          {/* Country Filters */}
          <CountryFilter />
          
          {/* Date Filters */}
          <DateFilter />
          
          {/* Actions */}
          <FilterActions />
        </div>
      </Card>
    </motion.div>
  )
}
```

**`src/features/filters/components/FilterBar/index.ts`**
```typescript
export { FilterBar } from './FilterBar'
```

## 2. CountryFilter

**`src/features/filters/components/CountryFilter/CountryFilter.tsx`**
```typescript
import { Checkbox } from '@/components/ui/Checkbox'
import { useStore } from '@/store'
import { Country, CountryLabels } from '@/features/holidays/types/holiday.types'
import { useFilterActions } from '../../hooks/useFilterActions'

export function CountryFilter() {
  const countries = useStore((state) => state.filters.countries)
  const { toggleCountry } = useFilterActions()

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">
        Countries
      </label>
      <div className="flex gap-4">
        <Checkbox
          checked={countries[Country.BRAZIL]}
          onChange={() => toggleCountry(Country.BRAZIL)}
          label={CountryLabels[Country.BRAZIL]}
        />
        <Checkbox
          checked={countries[Country.COLOMBIA]}
          onChange={() => toggleCountry(Country.COLOMBIA)}
          label={CountryLabels[Country.COLOMBIA]}
        />
      </div>
    </div>
  )
}
```

**`src/features/filters/components/CountryFilter/index.ts`**
```typescript
export { CountryFilter } from './CountryFilter'
```

## 3. DateFilter

**`src/features/filters/components/DateFilter/DateFilter.tsx`**
```typescript
import { Select } from '@/components/ui/Select'
import { useStore } from '@/store'
import { useFilterActions } from '../../hooks/useFilterActions'
import { useFilterOptions } from '../../hooks/useFilterOptions'

export function DateFilter() {
  const year = useStore((state) => state.filters.year)
  const month = useStore((state) => state.filters.month)
  const week = useStore((state) => state.filters.week)
  
  const { setYearFilter, setMonthFilter, setWeekFilter } = useFilterActions()
  const { yearOptions, monthOptions, weekOptions } = useFilterOptions()

  return (
    <div className="flex gap-4">
      {/* Year */}
      <Select
        label="Year"
        value={year}
        onChange={(value) => setYearFilter(Number(value))}
        options={yearOptions}
      />

      {/* Month */}
      <Select
        label="Month"
        value={month}
        onChange={setMonthFilter}
        options={monthOptions}
      />

      {/* Week */}
      <Select
        label="Week"
        value={week}
        onChange={setWeekFilter}
        options={weekOptions}
        disabled={month === 'all'}
      />
    </div>
  )
}
```

**`src/features/filters/components/DateFilter/index.ts`**
```typescript
export { DateFilter } from './DateFilter'
```

## 4. FilterActions

**`src/features/filters/components/FilterActions/FilterActions.tsx`**
```typescript
import { Button } from '@/components/ui/Button'
import { useFilterActions } from '../../hooks/useFilterActions'
import { RotateCcw } from 'lucide-react'

export function FilterActions() {
  const { resetFilters } = useFilterActions()

  return (
    <div className="flex items-end">
      <Button
        variant="danger"
        onClick={resetFilters}
        leftIcon={<RotateCcw size={16} />}
      >
        Clear Filters
      </Button>
    </div>
  )
}
```

**`src/features/filters/components/FilterActions/index.ts`**
```typescript
export { FilterActions } from './FilterActions'
```

## 5. Custom Hooks

**`src/features/filters/hooks/useFilterActions.ts`** (já criado no passo 5)

**`src/features/filters/hooks/useFilterOptions.ts`**
```typescript
import { useMemo } from 'react'
import { useStore } from '@/store'
import { useHolidays } from '@/features/holidays/hooks/useHolidays'
import { getWeeksInMonth } from '@/features/holidays/utils/weekUtils'
import { getMonthName } from '@/features/holidays/utils/dateUtils'
import type { FilterOption } from '../types/filter.types'

export function useFilterOptions() {
  const { availableYears } = useHolidays()
  const month = useStore((state) => state.filters.month)
  const year = useStore((state) => state.filters.year)

  // Year options
  const yearOptions = useMemo<FilterOption<number>[]>(() => {
    return availableYears.map((y) => ({
      label: String(y),
      value: y,
    }))
  }, [availableYears])

  // Month options
  const monthOptions = useMemo<FilterOption<number | 'all'>[]>(() => {
    return [
      { label: 'All Months', value: 'all' },
      ...Array.from({ length: 12 }, (_, i) => ({
        label: getMonthName(i + 1),
        value: i + 1,
      })),
    ]
  }, [])

  // Week options (dynamic based on selected month)
  const weekOptions = useMemo<FilterOption<number | 'all'>[]>(() => {
    if (month === 'all') {
      return [{ label: 'All Weeks', value: 'all' }]
    }

    const weeks = getWeeksInMonth(year, month)
    return [
      { label: 'All Weeks', value: 'all' },
      ...weeks.map((w) => ({
        label: `Week ${w}`,
        value: w,
      })),
    ]
  }, [month, year])

  return {
    yearOptions,
    monthOptions,
    weekOptions,
  }
}
```

## 6. Active Filters Display

**`src/features/filters/components/ActiveFilters/ActiveFilters.tsx`**
```typescript
import { useStore } from '@/store'
import { useFilterActions } from '../../hooks/useFilterActions'
import { Country, CountryLabels } from '@/features/holidays/types/holiday.types'
import { getMonthName } from '@/features/holidays/utils/dateUtils'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ActiveFilters() {
  const filters = useStore((state) => state.filters)
  const { setMonthFilter, setWeekFilter, setCountryFilter } = useFilterActions()

  const activeFilters: Array<{ id: string; label: string; onRemove: () => void }> = []

  // Country filters
  Object.entries(filters.countries).forEach(([country, enabled]) => {
    if (!enabled) {
      activeFilters.push({
        id: `country-${country}`,
        label: `Excluding ${CountryLabels[country as Country]}`,
        onRemove: () => setCountryFilter(country as Country, true),
      })
    }
  })

  // Month filter
  if (filters.month !== 'all') {
    activeFilters.push({
      id: 'month',
      label: getMonthName(filters.month),
      onRemove: () => setMonthFilter('all'),
    })
  }

  // Week filter
  if (filters.week !== 'all') {
    activeFilters.push({
      id: 'week',
      label: `Week ${filters.week}`,
      onRemove: () => setWeekFilter('all'),
    })
  }

  if (activeFilters.length === 0) return null

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-gray-600">Active filters:</span>
      <AnimatePresence mode="popLayout">
        {activeFilters.map((filter) => (
          <motion.div
            key={filter.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="inline-flex items-center gap-1 px-3 py-1 bg-brazil-light text-brazil rounded-full text-sm"
          >
            <span>{filter.label}</span>
            <button
              onClick={filter.onRemove}
              className="hover:bg-brazil hover:text-white rounded-full p-0.5 transition-colors"
              aria-label={`Remove ${filter.label} filter`}
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
```

**`src/features/filters/components/ActiveFilters/index.ts`**
```typescript
export { ActiveFilters } from './ActiveFilters'
```

## 7. Filter Presets (Bonus)

**`src/features/filters/components/FilterPresets/FilterPresets.tsx`**
```typescript
import { Button } from '@/components/ui/Button'
import { useFilterActions } from '../../hooks/useFilterActions'
import { Country } from '@/features/holidays/types/holiday.types'

interface FilterPreset {
  id: string
  label: string
  apply: () => void
}

export function FilterPresets() {
  const {
    setCountryFilter,
    setMonthFilter,
    setYearFilter,
    resetFilters,
  } = useFilterActions()

  const presets: FilterPreset[] = [
    {
      id: 'all',
      label: 'All Holidays',
      apply: resetFilters,
    },
    {
      id: 'brazil-only',
      label: 'Brazil Only',
      apply: () => {
        setCountryFilter(Country.BRAZIL, true)
        setCountryFilter(Country.COLOMBIA, false)
      },
    },
    {
      id: 'colombia-only',
      label: 'Colombia Only',
      apply: () => {
        setCountryFilter(Country.BRAZIL, false)
        setCountryFilter(Country.COLOMBIA, true)
      },
    },
    {
      id: 'this-month',
      label: 'This Month',
      apply: () => {
        const now = new Date()
        setYearFilter(now.getFullYear())
        setMonthFilter(now.getMonth() + 1)
      },
    },
  ]

  return (
    <div className="flex gap-2 flex-wrap">
      <span className="text-sm font-medium text-gray-600 self-center">
        Quick filters:
      </span>
      {presets.map((preset) => (
        <Button
          key={preset.id}
          variant="ghost"
          size="sm"
          onClick={preset.apply}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  )
}
```

**`src/features/filters/components/FilterPresets/index.ts`**
```typescript
export { FilterPresets } from './FilterPresets'
```

## 8. URL Sync (Advanced)

Para sincronizar filtros com a URL:

**`src/features/filters/hooks/useUrlFilters.ts`**
```typescript
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStore } from '@/store'
import { useFilterActions } from './useFilterActions'
import { Country } from '@/features/holidays/types/holiday.types'

export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useStore((state) => state.filters)
  const { setCountryFilter, setMonthFilter, setWeekFilter, setYearFilter } =
    useFilterActions()

  // Read from URL on mount
  useEffect(() => {
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const week = searchParams.get('week')
    const countries = searchParams.get('countries')

    if (year) setYearFilter(Number(year))
    if (month) setMonthFilter(month === 'all' ? 'all' : Number(month))
    if (week) setWeekFilter(week === 'all' ? 'all' : Number(week))
    
    if (countries) {
      const countryList = countries.split(',')
      setCountryFilter(Country.BRAZIL, countryList.includes('brazil'))
      setCountryFilter(Country.COLOMBIA, countryList.includes('colombia'))
    }
  }, []) // Only on mount

  // Write to URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    params.set('year', String(filters.year))
    
    if (filters.month !== 'all') {
      params.set('month', String(filters.month))
    }
    
    if (filters.week !== 'all') {
      params.set('week', String(filters.week))
    }
    
    const enabledCountries = Object.entries(filters.countries)
      .filter(([_, enabled]) => enabled)
      .map(([country]) => country)
    
    if (enabledCountries.length > 0 && enabledCountries.length < 2) {
      params.set('countries', enabledCountries.join(','))
    }
    
    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])
}
```

## 9. Testes

**`src/features/filters/components/CountryFilter/CountryFilter.test.tsx`**
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CountryFilter } from './CountryFilter'
import { useStore } from '@/store'

describe('CountryFilter', () => {
  it('renders country checkboxes', () => {
    render(<CountryFilter />)
    expect(screen.getByLabelText('Brazil')).toBeInTheDocument()
    expect(screen.getByLabelText('Colombia')).toBeInTheDocument()
  })

  it('toggles country filter on click', async () => {
    render(<CountryFilter />)
    
    const brazilCheckbox = screen.getByLabelText('Brazil')
    expect(brazilCheckbox).toBeChecked()
    
    await userEvent.click(brazilCheckbox)
    expect(useStore.getState().filters.countries.brazil).toBe(false)
    
    await userEvent.click(brazilCheckbox)
    expect(useStore.getState().filters.countries.brazil).toBe(true)
  })
})
```

## 10. Performance Optimization

### Debounce para Filtros

```typescript
import { useDebouncedValue } from '@/hooks/useDebounce'

// Em FilterBar
const debouncedFilters = useDebouncedValue(filters, 300)
```

### Memoização

```typescript
import { memo } from 'react'

export const CountryFilter = memo(CountryFilterComponent)
export const DateFilter = memo(DateFilterComponent)
```

---

**Próximo Passo**: [09-layouts-e-rotas.md](./09-layouts-e-rotas.md)

