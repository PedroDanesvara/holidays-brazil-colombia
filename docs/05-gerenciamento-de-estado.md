# 🔄 Passo 5: Gerenciamento de Estado

## Objetivo
Implementar gerenciamento de estado global usando Zustand para filtros, visualização e preferências do usuário.

## Por que Zustand?

✅ API simples e intuitiva  
✅ Sem boilerplate desnecessário  
✅ Performance excelente (re-renders otimizados)  
✅ TypeScript first-class support  
✅ DevTools integrado  
✅ Sem Context Provider hell  

## Estrutura de Stores

```
src/store/
├── slices/
│   ├── filterSlice.ts
│   ├── viewSlice.ts
│   └── preferencesSlice.ts
├── types.ts
└── index.ts
```

## Implementação

### 1. Store de Filtros

**`src/store/slices/filterSlice.ts`**
```typescript
import { StateCreator } from 'zustand'
import { FilterStoreState } from '../types'
import { Country } from '@/features/holidays/types/holiday.types'
import { DEFAULT_FILTERS } from '@/features/filters/types/filter.types'
import type { MonthFilter, WeekFilter } from '@/features/filters/types/filter.types'

export const createFilterSlice: StateCreator<FilterStoreState> = (set) => ({
  filters: DEFAULT_FILTERS,

  setCountryFilter: (country: Country, enabled: boolean) =>
    set((state) => ({
      filters: {
        ...state.filters,
        countries: {
          ...state.filters.countries,
          [country]: enabled,
        },
      },
    })),

  setMonthFilter: (month: MonthFilter) =>
    set((state) => ({
      filters: {
        ...state.filters,
        month,
        // Reset week filter when month changes
        week: 'all',
      },
    })),

  setWeekFilter: (week: WeekFilter) =>
    set((state) => ({
      filters: {
        ...state.filters,
        week,
      },
    })),

  setYearFilter: (year: number) =>
    set((state) => ({
      filters: {
        ...state.filters,
        year,
      },
    })),

  resetFilters: () =>
    set({
      filters: DEFAULT_FILTERS,
    }),
})
```

### 2. Store de Visualização

**`src/store/slices/viewSlice.ts`**
```typescript
import { StateCreator } from 'zustand'
import { ViewStoreState } from '../types'
import { ViewMode } from '@/features/holidays/types/holiday.types'

export const createViewSlice: StateCreator<ViewStoreState> = (set) => ({
  viewMode: ViewMode.LIST,
  showWeekNumbers: true,
  highlightToday: true,

  setViewMode: (mode: ViewMode) =>
    set({
      viewMode: mode,
    }),

  toggleWeekNumbers: () =>
    set((state) => ({
      showWeekNumbers: !state.showWeekNumbers,
    })),

  toggleHighlightToday: () =>
    set((state) => ({
      highlightToday: !state.highlightToday,
    })),
})
```

### 3. Store de Preferências

**`src/store/slices/preferencesSlice.ts`**
```typescript
import { StateCreator } from 'zustand'
import { PreferencesStoreState } from '../types'
import type { Locale } from '@/types/utils.types'

export const createPreferencesSlice: StateCreator<PreferencesStoreState> = (set) => ({
  theme: 'light',
  locale: 'en-US',

  setTheme: (theme: 'light' | 'dark' | 'system') =>
    set({
      theme,
    }),

  setLocale: (locale: Locale) =>
    set({
      locale,
    }),
})
```

### 4. Store Principal com Persistência

**`src/store/index.ts`**
```typescript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createFilterSlice } from './slices/filterSlice'
import { createViewSlice } from './slices/viewSlice'
import { createPreferencesSlice } from './slices/preferencesSlice'
import type { FilterStoreState, ViewStoreState, PreferencesStoreState } from './types'

// Combine all slices
type StoreState = FilterStoreState & ViewStoreState & PreferencesStoreState

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...args) => ({
        ...createFilterSlice(...args),
        ...createViewSlice(...args),
        ...createPreferencesSlice(...args),
      }),
      {
        name: 'holidays-app-storage',
        // Only persist preferences and some view settings
        partialize: (state) => ({
          theme: state.theme,
          locale: state.locale,
          showWeekNumbers: state.showWeekNumbers,
          highlightToday: state.highlightToday,
        }),
      }
    ),
    {
      name: 'HolidaysApp',
    }
  )
)

// Selectors for better performance
export const useFilters = () => useStore((state) => state.filters)
export const useCountryFilters = () => useStore((state) => state.filters.countries)
export const useViewMode = () => useStore((state) => state.viewMode)
export const useTheme = () => useStore((state) => state.theme)
```

### 5. Custom Hooks para Actions

**`src/features/filters/hooks/useFilterActions.ts`**
```typescript
import { useStore } from '@/store'
import { useCallback } from 'react'
import { Country } from '@/features/holidays/types/holiday.types'

export function useFilterActions() {
  const setCountryFilter = useStore((state) => state.setCountryFilter)
  const setMonthFilter = useStore((state) => state.setMonthFilter)
  const setWeekFilter = useStore((state) => state.setWeekFilter)
  const setYearFilter = useStore((state) => state.setYearFilter)
  const resetFilters = useStore((state) => state.resetFilters)

  const toggleCountry = useCallback(
    (country: Country) => {
      const currentFilters = useStore.getState().filters
      const currentValue = currentFilters.countries[country]
      setCountryFilter(country, !currentValue)
    },
    [setCountryFilter]
  )

  return {
    setCountryFilter,
    setMonthFilter,
    setWeekFilter,
    setYearFilter,
    resetFilters,
    toggleCountry,
  }
}
```

**`src/features/holidays/hooks/useViewActions.ts`**
```typescript
import { useStore } from '@/store'
import { useCallback } from 'react'
import { ViewMode } from '@/features/holidays/types/holiday.types'

export function useViewActions() {
  const setViewMode = useStore((state) => state.setViewMode)
  const toggleWeekNumbers = useStore((state) => state.toggleWeekNumbers)
  const toggleHighlightToday = useStore((state) => state.toggleHighlightToday)

  const switchToList = useCallback(() => {
    setViewMode(ViewMode.LIST)
  }, [setViewMode])

  const switchToCalendar = useCallback(() => {
    setViewMode(ViewMode.CALENDAR)
  }, [setViewMode])

  return {
    setViewMode,
    switchToList,
    switchToCalendar,
    toggleWeekNumbers,
    toggleHighlightToday,
  }
}
```

## Computed Values (Derived State)

**`src/features/holidays/hooks/useFilteredHolidays.ts`**
```typescript
import { useMemo } from 'react'
import { useFilters } from '@/store'
import { Holiday, Country } from '@/features/holidays/types/holiday.types'

export function useFilteredHolidays(holidays: Holiday[]) {
  const filters = useFilters()

  return useMemo(() => {
    return holidays.filter((holiday) => {
      // Filter by country
      const enabledCountries = Object.entries(filters.countries)
        .filter(([_, enabled]) => enabled)
        .map(([country]) => country as Country)

      if (enabledCountries.length > 0 && !enabledCountries.includes(holiday.country)) {
        return false
      }

      // Filter by year
      if (holiday.year !== filters.year) {
        return false
      }

      // Filter by month
      if (filters.month !== 'all' && holiday.month !== filters.month) {
        return false
      }

      // Filter by week
      if (filters.week !== 'all' && holiday.week !== filters.week) {
        return false
      }

      return true
    })
  }, [holidays, filters])
}
```

**`src/features/holidays/hooks/useHolidayStats.ts`**
```typescript
import { useMemo } from 'react'
import { Holiday, HolidayStats, Country } from '@/features/holidays/types/holiday.types'

export function useHolidayStats(
  allHolidays: Holiday[],
  filteredHolidays: Holiday[]
): HolidayStats {
  return useMemo(() => {
    const byCountry = filteredHolidays.reduce((acc, holiday) => {
      acc[holiday.country] = (acc[holiday.country] || 0) + 1
      return acc
    }, {} as Record<Country, number>)

    const byMonth = filteredHolidays.reduce((acc, holiday) => {
      acc[holiday.month] = (acc[holiday.month] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    return {
      total: allHolidays.length,
      filtered: filteredHolidays.length,
      byCountry,
      byMonth,
    }
  }, [allHolidays, filteredHolidays])
}
```

## Testando o Store

**`src/store/__tests__/filterSlice.test.ts`**
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from '../index'
import { Country } from '@/features/holidays/types/holiday.types'

describe('Filter Store', () => {
  beforeEach(() => {
    useStore.setState(useStore.getInitialState())
  })

  it('should toggle country filter', () => {
    const { setCountryFilter } = useStore.getState()

    setCountryFilter(Country.BRAZIL, false)
    expect(useStore.getState().filters.countries[Country.BRAZIL]).toBe(false)

    setCountryFilter(Country.BRAZIL, true)
    expect(useStore.getState().filters.countries[Country.BRAZIL]).toBe(true)
  })

  it('should set month filter', () => {
    const { setMonthFilter } = useStore.getState()

    setMonthFilter(3)
    expect(useStore.getState().filters.month).toBe(3)
  })

  it('should reset week when month changes', () => {
    const { setMonthFilter, setWeekFilter } = useStore.getState()

    setWeekFilter(10)
    expect(useStore.getState().filters.week).toBe(10)

    setMonthFilter(5)
    expect(useStore.getState().filters.week).toBe('all')
  })

  it('should reset all filters', () => {
    const { setMonthFilter, setWeekFilter, setYearFilter, resetFilters } =
      useStore.getState()

    setMonthFilter(6)
    setWeekFilter(20)
    setYearFilter(2026)

    resetFilters()

    const filters = useStore.getState().filters
    expect(filters.month).toBe('all')
    expect(filters.week).toBe('all')
    expect(filters.year).toBe(new Date().getFullYear())
  })
})
```

## DevTools

Para usar o Redux DevTools Extension:

1. Instale a extensão no navegador
2. O middleware `devtools` já está configurado
3. Abra o DevTools e navegue para a tab "Redux"
4. Você verá todas as actions e state changes

## Performance Tips

### 1. Seletores Específicos

```typescript
// ❌ Ruim - Re-renderiza quando qualquer filtro muda
const filters = useStore((state) => state.filters)

// ✅ Bom - Re-renderiza apenas quando o mês muda
const month = useStore((state) => state.filters.month)
```

### 2. Shallow Comparison

```typescript
import { shallow } from 'zustand/shallow'

// Para objetos/arrays
const countries = useStore(
  (state) => state.filters.countries,
  shallow
)
```

### 3. Custom Equality Function

```typescript
const filters = useStore(
  (state) => state.filters,
  (prev, next) => {
    // Custom comparison logic
    return prev.month === next.month && prev.year === next.year
  }
)
```

## Integração com LocalStorage

O middleware `persist` já salva automaticamente:
- Tema do usuário
- Locale
- Preferências de visualização

Os filtros **não** são persistidos propositalmente (melhor UX começar limpo).

## Migrações de Schema

Se a estrutura do store mudar:

```typescript
persist(
  (...args) => ({ /* ... */ }),
  {
    name: 'holidays-app-storage',
    version: 1,
    migrate: (persistedState: any, version: number) => {
      if (version === 0) {
        // Migração da versão 0 para 1
        persistedState.newField = 'default value'
      }
      return persistedState
    },
  }
)
```

---

**Próximo Passo**: [06-feature-holidays.md](./06-feature-holidays.md)

