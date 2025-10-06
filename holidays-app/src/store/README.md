# 🗄️ State Management com Zustand

Gerenciamento de estado global usando Zustand com TypeScript, DevTools e persistência.

## 📦 Estrutura

```
store/
├── slices/
│   ├── filterSlice.ts      # Filtros (países, mês, semana, ano)
│   ├── viewSlice.ts         # Visualização (list/calendar, preferências)
│   └── preferencesSlice.ts  # Preferências (tema, locale)
├── types.ts                 # TypeScript types
├── index.ts                 # Store principal + selectors
└── README.md               # Esta documentação
```

## 🎯 Stores Disponíveis

### 1. Filter Store

Gerencia todos os filtros da aplicação.

```tsx
import { useFilters, useFilterActions } from '@/store'

function FilterComponent() {
  // Selectors (otimizados - re-render apenas quando necessário)
  const filters = useFilters()
  const countries = useCountryFilters()
  
  // Actions
  const {
    setCountryFilter,
    setMonthFilter,
    setWeekFilter,
    setYearFilter,
    resetFilters,
    toggleCountry
  } = useFilterActions()

  return (
    <>
      <button onClick={() => setCountryFilter(Country.BRAZIL, true)}>
        Enable Brazil
      </button>
      <button onClick={() => toggleCountry(Country.COLOMBIA)}>
        Toggle Colombia
      </button>
      <button onClick={() => setMonthFilter(6)}>
        Filter June
      </button>
      <button onClick={resetFilters}>
        Reset All
      </button>
    </>
  )
}
```

**Estado:**
```typescript
{
  countries: {
    brazil: boolean
    colombia: boolean
  },
  month: number | 'all',
  week: number | 'all',
  year: number
}
```

**Actions:**
- `setCountryFilter(country, enabled)` - Ativar/desativar país
- `setMonthFilter(month)` - Filtrar por mês (reseta week automaticamente)
- `setWeekFilter(week)` - Filtrar por semana
- `setYearFilter(year)` - Filtrar por ano
- `resetFilters()` - Resetar para valores padrão

### 2. View Store

Gerencia o modo de visualização e preferências de UI.

```tsx
import { useViewMode, useViewActions } from '@/store'

function ViewToggle() {
  const viewMode = useViewMode()
  const {
    setViewMode,
    switchToList,
    switchToCalendar,
    toggleWeekNumbers,
    toggleHighlightToday
  } = useViewActions()

  return (
    <>
      <button onClick={switchToList}>
        List View
      </button>
      <button onClick={switchToCalendar}>
        Calendar View
      </button>
      <button onClick={toggleWeekNumbers}>
        Toggle Week Numbers
      </button>
    </>
  )
}
```

**Estado:**
```typescript
{
  viewMode: 'list' | 'calendar',
  showWeekNumbers: boolean,
  highlightToday: boolean
}
```

**Actions:**
- `setViewMode(mode)` - Mudar modo de visualização
- `switchToList()` - Atalho para list view
- `switchToCalendar()` - Atalho para calendar view
- `toggleWeekNumbers()` - Toggle números de semana
- `toggleHighlightToday()` - Toggle destaque do dia atual

### 3. Preferences Store

Gerencia preferências globais do usuário (tema, idioma).

```tsx
import { useTheme, usePreferencesActions } from '@/store'

function ThemeToggle() {
  const theme = useTheme()
  const { setTheme, setLocale } = usePreferencesActions()

  return (
    <>
      <button onClick={() => setTheme('dark')}>
        Dark Mode
      </button>
      <button onClick={() => setLocale('pt-BR')}>
        Português
      </button>
    </>
  )
}
```

**Estado:**
```typescript
{
  theme: 'light' | 'dark' | 'system',
  locale: 'en-US' | 'pt-BR' | 'es-CO'
}
```

## 🎣 Hooks Customizados

### Computed Values

Hooks que derivam valores do estado:

```tsx
import { useFilteredHolidays } from '@/features/holidays/hooks/useFilteredHolidays'
import { useHolidayStats } from '@/features/holidays/hooks/useHolidayStats'

function HolidaysList() {
  const allHolidays = useHolidays()
  const filteredHolidays = useFilteredHolidays(allHolidays)
  const stats = useHolidayStats(allHolidays, filteredHolidays)

  return (
    <>
      <p>Total: {stats.total}</p>
      <p>Filtered: {stats.filtered}</p>
      {filteredHolidays.map(h => <div key={h.id}>{h.name}</div>)}
    </>
  )
}
```

### Utility Hooks

```tsx
import { useLocalStorage, useMediaQuery, useDebounce } from '@/hooks'

function Component() {
  // LocalStorage
  const { value, setValue, removeValue } = useLocalStorage('key', defaultValue)

  // Media Queries
  const { isMobile, isTablet, isDesktop } = useMediaQuery()

  // Debounce
  const debouncedValue = useDebounce(searchTerm, { delay: 500 })

  return <div>...</div>
}
```

## 🔄 Persistência

O Zustand automaticamente persiste algumas partes do estado no LocalStorage:

**Persistido:**
- ✅ Theme
- ✅ Locale
- ✅ Show week numbers
- ✅ Highlight today

**NÃO Persistido:**
- ❌ Filtros (melhor UX começar limpo)
- ❌ View mode (contextual)

## 🛠️ DevTools

Redux DevTools funciona out-of-the-box:

1. Instale a extensão Redux DevTools
2. Abra o DevTools no navegador
3. Navegue para a aba "Redux"
4. Veja todas as actions e mudanças de estado

**Nome do Store:** `HolidaysApp`

## ⚡ Performance

### Selectors Otimizados

```tsx
// ❌ BAD - Re-render em qualquer mudança de filtro
const filters = useStore((state) => state.filters)

// ✅ GOOD - Re-render apenas quando o mês muda
const month = useStore((state) => state.filters.month)

// ✅ GOOD - Usar selector específico
const filters = useFilters() // otimizado internamente
```

### Shallow Comparison

Para objetos/arrays, use shallow comparison:

```tsx
import { shallow } from 'zustand/shallow'

const countries = useStore(
  (state) => state.filters.countries,
  shallow
)
```

### Custom Equality

```tsx
const filters = useStore(
  (state) => state.filters,
  (prev, next) => prev.month === next.month && prev.year === next.year
)
```

## 🧪 Testando o Store

```typescript
import { useStore } from '@/store'
import { Country } from '@/features/holidays/types/holiday.types'

// Em testes
beforeEach(() => {
  useStore.setState(useStore.getInitialState())
})

test('should toggle country filter', () => {
  const { setCountryFilter } = useStore.getState()
  
  setCountryFilter(Country.BRAZIL, false)
  expect(useStore.getState().filters.countries.brazil).toBe(false)
})
```

## 📚 Regras de Negócio

### Filtros

1. **Quando o mês muda**: Week filter é resetado para 'all'
2. **Reset filters**: Volta para estado inicial (DEFAULT_FILTERS)
3. **Country filter**: Pelo menos um país deve estar selecionado

### View Mode

1. **List view**: Padrão ao carregar
2. **Calendar view**: Preserva filtros ativos
3. **Week numbers**: Mostrado por padrão

### Preferences

1. **Theme**: Padrão 'light'
2. **Locale**: Padrão 'en-US'
3. **Persistência**: Salvo automaticamente

## 🔗 Integrações

O store se integra perfeitamente com:

- ✅ React Router (filtros via URL - futuro)
- ✅ LocalStorage (persistência automática)
- ✅ Redux DevTools (debug)
- ✅ TypeScript (100% type-safe)

## 📖 Exemplos Completos

### Filtro Completo

```tsx
import { useFilters, useFilterActions } from '@/store'
import { Country } from '@/features/holidays/types/holiday.types'

function FilterBar() {
  const filters = useFilters()
  const actions = useFilterActions()

  return (
    <div>
      {/* Country Filters */}
      {Object.values(Country).map(country => (
        <label key={country}>
          <input
            type="checkbox"
            checked={filters.countries[country]}
            onChange={(e) => actions.setCountryFilter(country, e.target.checked)}
          />
          {country}
        </label>
      ))}

      {/* Month Filter */}
      <select
        value={filters.month}
        onChange={(e) => actions.setMonthFilter(
          e.target.value === 'all' ? 'all' : Number(e.target.value)
        )}
      >
        <option value="all">All Months</option>
        {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
          <option key={m} value={m}>Month {m}</option>
        ))}
      </select>

      {/* Reset */}
      <button onClick={actions.resetFilters}>
        Reset
      </button>
    </div>
  )
}
```

---

**Status**: ✅ Completo e testado  
**Build**: ✅ Passa sem erros  
**TypeScript**: ✅ 100% type-safe  
**DevTools**: ✅ Funcionando  
**Persistência**: ✅ LocalStorage ativo

