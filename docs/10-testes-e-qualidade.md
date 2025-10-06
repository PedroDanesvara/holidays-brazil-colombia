# ✅ Passo 10: Testes e Qualidade de Código

## Objetivo
Implementar testes automatizados e ferramentas de qualidade para garantir confiabilidade e manutenibilidade.

## Estratégia de Testes

```
Unit Tests (70%)      → Funções puras, hooks, utils
Component Tests (20%) → Componentes isolados
E2E Tests (10%)       → Fluxos críticos de usuário
```

## 1. Configuração de Testes

Já configuramos Vitest no passo 2. Agora vamos adicionar mais ferramentas:

```bash
# Testing Library adicional
npm install -D @testing-library/react-hooks

# Coverage
npm install -D @vitest/coverage-v8

# MSW para mock de APIs
npm install -D msw
```

**Atualizar `package.json`:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

## 2. Unit Tests

### Utils Tests

**`src/features/holidays/utils/dateUtils.test.ts`**
```typescript
import { describe, it, expect } from 'vitest'
import { formatDate, formatFullDate, isTodayDate, getDaysInMonth } from './dateUtils'

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2025-01-15')
      const formatted = formatDate(date, 'yyyy-MM-dd')
      expect(formatted).toBe('2025-01-15')
    })

    it('formats date string correctly', () => {
      const formatted = formatDate('2025-01-15', 'yyyy-MM-dd')
      expect(formatted).toBe('2025-01-15')
    })
  })

  describe('formatFullDate', () => {
    it('formats full date with weekday', () => {
      const date = '2025-01-01'
      const formatted = formatFullDate(date)
      expect(formatted).toContain('2025')
      expect(formatted).toContain('January')
    })
  })

  describe('isTodayDate', () => {
    it('returns true for today', () => {
      const today = new Date()
      expect(isTodayDate(today)).toBe(true)
    })

    it('returns false for other dates', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(isTodayDate(yesterday)).toBe(false)
    })
  })

  describe('getDaysInMonth', () => {
    it('returns correct number of days for January', () => {
      const days = getDaysInMonth(2025, 1)
      expect(days).toHaveLength(31)
    })

    it('returns correct number of days for February (non-leap)', () => {
      const days = getDaysInMonth(2025, 2)
      expect(days).toHaveLength(28)
    })

    it('returns correct number of days for February (leap)', () => {
      const days = getDaysInMonth(2024, 2)
      expect(days).toHaveLength(29)
    })
  })
})
```

**`src/features/holidays/utils/weekUtils.test.ts`**
```typescript
import { describe, it, expect } from 'vitest'
import { calculateWeekNumber, getWeeksInMonth } from './weekUtils'

describe('weekUtils', () => {
  describe('calculateWeekNumber', () => {
    it('calculates week 1 correctly', () => {
      const date = new Date('2025-01-01')
      expect(calculateWeekNumber(date)).toBe(1)
    })

    it('calculates mid-year week correctly', () => {
      const date = new Date('2025-07-01')
      expect(calculateWeekNumber(date)).toBeGreaterThan(25)
    })
  })

  describe('getWeeksInMonth', () => {
    it('returns weeks for January', () => {
      const weeks = getWeeksInMonth(2025, 1)
      expect(weeks).toBeInstanceOf(Array)
      expect(weeks.length).toBeGreaterThan(0)
      expect(weeks[0]).toBe(1)
    })

    it('returns sorted weeks', () => {
      const weeks = getWeeksInMonth(2025, 6)
      for (let i = 1; i < weeks.length; i++) {
        expect(weeks[i]).toBeGreaterThan(weeks[i - 1])
      }
    })
  })
})
```

### Service Tests

**`src/features/holidays/services/holidayService.test.ts`**
```typescript
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
      expect(holidays.length).toBeGreaterThan(0)
      expect(holidays[0]).toHaveProperty('id')
      expect(holidays[0]).toHaveProperty('country')
      expect(holidays[0]).toHaveProperty('name')
    })
  })

  describe('getHolidaysByYear', () => {
    it('returns holidays for 2025', () => {
      const holidays = service.getHolidaysByYear(2025)
      expect(holidays.every((h) => h.year === 2025)).toBe(true)
    })

    it('returns empty array for invalid year', () => {
      const holidays = service.getHolidaysByYear(2050)
      expect(holidays).toEqual([])
    })
  })

  describe('getHolidaysByCountry', () => {
    it('returns only Brazil holidays', () => {
      const holidays = service.getHolidaysByCountry(Country.BRAZIL)
      expect(holidays.every((h) => h.country === Country.BRAZIL)).toBe(true)
    })

    it('returns only Colombia holidays', () => {
      const holidays = service.getHolidaysByCountry(Country.COLOMBIA)
      expect(holidays.every((h) => h.country === Country.COLOMBIA)).toBe(true)
    })
  })

  describe('getHolidaysByDate', () => {
    it('returns holidays for New Year 2025', () => {
      const date = new Date('2025-01-01')
      const holidays = service.getHolidaysByDate(date)
      expect(holidays.length).toBeGreaterThan(0)
      expect(holidays.some((h) => h.name.includes('New Year'))).toBe(true)
    })
  })

  describe('searchHolidays', () => {
    it('finds holidays by name', () => {
      const results = service.searchHolidays('Christmas')
      expect(results.length).toBeGreaterThan(0)
      expect(results.every((h) => h.name.toLowerCase().includes('christmas'))).toBe(true)
    })

    it('is case insensitive', () => {
      const results = service.searchHolidays('CARNIVAL')
      expect(results.length).toBeGreaterThan(0)
    })

    it('returns empty array for no matches', () => {
      const results = service.searchHolidays('xyz123')
      expect(results).toEqual([])
    })
  })

  describe('getAvailableYears', () => {
    it('returns sorted array of years', () => {
      const years = service.getAvailableYears()
      expect(years.length).toBeGreaterThan(0)
      
      for (let i = 1; i < years.length; i++) {
        expect(years[i]).toBeGreaterThan(years[i - 1])
      }
    })
  })
})
```

## 3. Component Tests

### Button Tests

```typescript
// Já implementado no passo 4
```

### HolidayCard Tests

**`src/features/holidays/components/HolidayCard/HolidayCard.test.tsx`**
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HolidayCard } from './HolidayCard'
import { Country } from '../../types/holiday.types'

const mockHoliday = {
  id: 'test-1',
  country: Country.BRAZIL,
  name: 'Test Holiday',
  date: '2025-01-01',
  month: 1,
  day: 1,
  year: 2025,
  week: 1,
}

describe('HolidayCard', () => {
  it('renders holiday name', () => {
    render(<HolidayCard holiday={mockHoliday} />)
    expect(screen.getByText('Test Holiday')).toBeInTheDocument()
  })

  it('renders country badge', () => {
    render(<HolidayCard holiday={mockHoliday} />)
    expect(screen.getByText('Brazil')).toBeInTheDocument()
  })

  it('renders week number when showWeek is true', () => {
    render(<HolidayCard holiday={mockHoliday} showWeek />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('does not render week when showWeek is false', () => {
    render(<HolidayCard holiday={mockHoliday} showWeek={false} />)
    expect(screen.queryByText('Week')).not.toBeInTheDocument()
  })

  it('renders description when provided', () => {
    const holidayWithDescription = {
      ...mockHoliday,
      description: 'Test description',
    }
    render(<HolidayCard holiday={holidayWithDescription} />)
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })
})
```

### HolidayList Tests

**`src/features/holidays/components/HolidayList/HolidayList.test.tsx`**
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HolidayList } from './HolidayList'
import { Country } from '../../types/holiday.types'

const mockHolidays = [
  {
    id: '1',
    country: Country.BRAZIL,
    name: 'Holiday 1',
    date: '2025-01-01',
    month: 1,
    day: 1,
    year: 2025,
    week: 1,
  },
  {
    id: '2',
    country: Country.COLOMBIA,
    name: 'Holiday 2',
    date: '2025-01-15',
    month: 1,
    day: 15,
    year: 2025,
    week: 3,
  },
]

describe('HolidayList', () => {
  it('renders list of holidays', () => {
    render(<HolidayList holidays={mockHolidays} />)
    expect(screen.getByText('Holiday 1')).toBeInTheDocument()
    expect(screen.getByText('Holiday 2')).toBeInTheDocument()
  })

  it('renders empty state when no holidays', () => {
    render(<HolidayList holidays={[]} />)
    expect(screen.getByText('No holidays found')).toBeInTheDocument()
  })

  it('sorts holidays by date', () => {
    const unsortedHolidays = [mockHolidays[1], mockHolidays[0]]
    render(<HolidayList holidays={unsortedHolidays} />)
    
    const cards = screen.getAllByRole('heading', { level: 3 })
    expect(cards[0]).toHaveTextContent('Holiday 1')
    expect(cards[1]).toHaveTextContent('Holiday 2')
  })
})
```

## 4. Hook Tests

**`src/features/holidays/hooks/useFilteredHolidays.test.ts`**
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFilteredHolidays } from './useFilteredHolidays'
import { useStore } from '@/store'
import { Country } from '../types/holiday.types'

const mockHolidays = [
  {
    id: '1',
    country: Country.BRAZIL,
    name: 'Holiday 1',
    date: '2025-01-01',
    month: 1,
    day: 1,
    year: 2025,
    week: 1,
  },
  {
    id: '2',
    country: Country.COLOMBIA,
    name: 'Holiday 2',
    date: '2025-06-15',
    month: 6,
    day: 15,
    year: 2025,
    week: 24,
  },
]

describe('useFilteredHolidays', () => {
  beforeEach(() => {
    useStore.setState(useStore.getInitialState())
  })

  it('returns all holidays when no filters applied', () => {
    const { result } = renderHook(() => useFilteredHolidays(mockHolidays))
    expect(result.current).toHaveLength(2)
  })

  it('filters by country', () => {
    useStore.setState({
      filters: {
        ...useStore.getState().filters,
        countries: {
          [Country.BRAZIL]: true,
          [Country.COLOMBIA]: false,
        },
      },
    })

    const { result } = renderHook(() => useFilteredHolidays(mockHolidays))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].country).toBe(Country.BRAZIL)
  })

  it('filters by month', () => {
    useStore.setState({
      filters: {
        ...useStore.getState().filters,
        month: 6,
      },
    })

    const { result } = renderHook(() => useFilteredHolidays(mockHolidays))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].month).toBe(6)
  })

  it('filters by multiple criteria', () => {
    useStore.setState({
      filters: {
        ...useStore.getState().filters,
        countries: {
          [Country.BRAZIL]: true,
          [Country.COLOMBIA]: false,
        },
        month: 1,
      },
    })

    const { result } = renderHook(() => useFilteredHolidays(mockHolidays))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe('1')
  })
})
```

## 5. Integration Tests

**`tests/integration/filters.test.tsx`**
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Home } from '@/pages/Home'

function renderWithRouter(component: React.ReactElement) {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Filters Integration', () => {
  it('filters holidays when country filter is changed', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Home />)

    // Initially all holidays are shown
    const initialHolidays = screen.getAllByRole('heading', { level: 3 })
    const initialCount = initialHolidays.length

    // Uncheck Brazil
    const brazilCheckbox = screen.getByLabelText('Brazil')
    await user.click(brazilCheckbox)

    // Should show fewer holidays
    const filteredHolidays = screen.getAllByRole('heading', { level: 3 })
    expect(filteredHolidays.length).toBeLessThan(initialCount)
  })

  it('shows correct stats after filtering', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Home />)

    // Check initial stats
    const totalStat = screen.getByText(/Total Holidays/)
    expect(totalStat).toBeInTheDocument()

    // Apply filter
    const colombiaCheckbox = screen.getByLabelText('Colombia')
    await user.click(colombiaCheckbox)

    // Stats should update
    const filteredStat = screen.getByText(/Filtered Results/)
    expect(filteredStat).toBeInTheDocument()
  })
})
```

## 6. E2E Tests com Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

**`playwright.config.ts`**
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
```

**`tests/e2e/holidays.spec.ts`**
```typescript
import { test, expect } from '@playwright/test'

test.describe('Holidays App', () => {
  test('should display holidays list', async ({ page }) => {
    await page.goto('/')
    
    // Check title
    await expect(page.getByText('Public Holidays')).toBeVisible()
    
    // Check at least one holiday is displayed
    await expect(page.locator('.holiday-item').first()).toBeVisible()
  })

  test('should filter holidays by country', async ({ page }) => {
    await page.goto('/')
    
    // Get initial count
    const initialCount = await page.locator('.holiday-item').count()
    
    // Uncheck Brazil
    await page.getByLabel('Brazil').uncheck()
    
    // Count should decrease
    const filteredCount = await page.locator('.holiday-item').count()
    expect(filteredCount).toBeLessThan(initialCount)
  })

  test('should navigate to calendar view', async ({ page }) => {
    await page.goto('/')
    
    // Click calendar button
    await page.getByRole('link', { name: 'Calendar' }).click()
    
    // Should be on calendar page
    await expect(page).toHaveURL('/calendar')
    await expect(page.getByText('Calendar View')).toBeVisible()
  })

  test('should show holiday tooltip on calendar hover', async ({ page }) => {
    await page.goto('/calendar')
    
    // Find a day with holiday
    const dayWithHoliday = page.locator('.calendar-day').filter({
      has: page.locator('.holiday-indicator'),
    }).first()
    
    // Hover over it
    await dayWithHoliday.hover()
    
    // Tooltip should appear
    await expect(page.locator('.holiday-tooltip')).toBeVisible()
  })
})
```

**Adicionar scripts:**
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report"
  }
}
```

## 7. Coverage Goals

**`vitest.config.ts`**
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/types/',
        '**/*.d.ts',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
})
```

## 8. CI/CD com GitHub Actions

**`.github/workflows/ci.yml`**
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Unit tests
        run: npm run test:coverage
      
      - name: Build
        run: npm run build
      
      - name: E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

**Próximo Passo**: [11-deploy-e-producao.md](./11-deploy-e-producao.md)

