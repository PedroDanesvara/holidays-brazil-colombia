# 📝 Passo 3: Sistema de Tipos (TypeScript)

## Objetivo
Definir todos os tipos, interfaces e enums necessários para garantir type safety em todo o projeto.

## Localização dos Arquivos
- Types globais: `src/types/`
- Types específicos de features: `src/features/{feature}/types/`

## Implementação

### 1. Types Globais

**`src/types/global.d.ts`**
```typescript
export {}

declare global {
  type Nullable<T> = T | null
  type Optional<T> = T | undefined
  type Maybe<T> = T | null | undefined
  
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  
  type ArrayElement<ArrayType extends readonly unknown[]> = 
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never
}
```

### 2. Feature: Holidays

**`src/features/holidays/types/holiday.types.ts`**
```typescript
/**
 * Países suportados pelo sistema
 */
export enum Country {
  BRAZIL = 'brazil',
  COLOMBIA = 'colombia',
}

/**
 * Mapeamento de nomes de países para exibição
 */
export const CountryLabels: Record<Country, string> = {
  [Country.BRAZIL]: 'Brazil',
  [Country.COLOMBIA]: 'Colombia',
}

/**
 * Cores associadas a cada país
 */
export const CountryColors: Record<Country, string> = {
  [Country.BRAZIL]: '#47A1C3',
  [Country.COLOMBIA]: '#FF6B6B',
}

/**
 * Interface principal para um feriado
 */
export interface Holiday {
  /** Identificador único do feriado */
  id: string
  /** País do feriado */
  country: Country
  /** Nome do feriado */
  name: string
  /** Data do feriado no formato ISO (YYYY-MM-DD) */
  date: string
  /** Mês (1-12) */
  month: number
  /** Dia do mês (1-31) */
  day: number
  /** Ano */
  year: number
  /** Número da semana no ano */
  week: number
  /** Descrição adicional (opcional) */
  description?: string
}

/**
 * DTO para criação de um novo feriado
 */
export type CreateHolidayDTO = Omit<Holiday, 'id' | 'week'>

/**
 * Dados de um feriado agrupado por data
 */
export interface HolidayGroup {
  date: string
  holidays: Holiday[]
  countries: Country[]
}

/**
 * Estatísticas de feriados
 */
export interface HolidayStats {
  total: number
  filtered: number
  byCountry: Record<Country, number>
  byMonth: Record<number, number>
}

/**
 * Modos de visualização disponíveis
 */
export enum ViewMode {
  LIST = 'list',
  CALENDAR = 'calendar',
}

/**
 * Configuração de visualização
 */
export interface ViewConfig {
  mode: ViewMode
  showWeekNumbers: boolean
  highlightToday: boolean
  firstDayOfWeek: 0 | 1 // 0 = Sunday, 1 = Monday
}
```

### 3. Feature: Filters

**`src/features/filters/types/filter.types.ts`**
```typescript
import { Country } from '@/features/holidays/types/holiday.types'

/**
 * Estado dos filtros de países
 */
export type CountryFilter = {
  [K in Country]: boolean
}

/**
 * Filtro de mês (1-12 ou 'all')
 */
export type MonthFilter = number | 'all'

/**
 * Filtro de semana (1-53 ou 'all')
 */
export type WeekFilter = number | 'all'

/**
 * Filtro de ano
 */
export type YearFilter = number

/**
 * Estado completo dos filtros
 */
export interface FilterState {
  countries: CountryFilter
  month: MonthFilter
  week: WeekFilter
  year: YearFilter
}

/**
 * Valores iniciais dos filtros
 */
export const DEFAULT_FILTERS: FilterState = {
  countries: {
    [Country.BRAZIL]: true,
    [Country.COLOMBIA]: true,
  },
  month: 'all',
  week: 'all',
  year: new Date().getFullYear(),
}

/**
 * Opções de filtro para UI
 */
export interface FilterOption<T = unknown> {
  label: string
  value: T
  disabled?: boolean
}

/**
 * Configuração de um filtro
 */
export interface FilterConfig {
  id: string
  label: string
  type: 'select' | 'checkbox' | 'radio'
  options: FilterOption[]
  multiple?: boolean
}
```

### 4. Types de Componentes UI

**`src/components/ui/types.ts`**
```typescript
import { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react'

/**
 * Variantes de botões
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

/**
 * Tamanhos de componentes
 */
export type ComponentSize = 'sm' | 'md' | 'lg'

/**
 * Props base para componentes
 */
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

/**
 * Props para Button
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ComponentSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

/**
 * Props para Select
 */
export interface SelectProps<T = string>
  extends Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value: T
  onChange: (value: T) => void
  options: FilterOption<T>[]
  placeholder?: string
  label?: string
  error?: string
}

/**
 * Props para Checkbox
 */
export interface CheckboxProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  error?: string
}

/**
 * Props para Card
 */
export interface CardProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  footer?: ReactNode
  hoverable?: boolean
  onClick?: () => void
}

/**
 * Props para Modal
 */
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: ComponentSize
  closeOnOverlayClick?: boolean
}
```

### 5. Types de Calendário

**`src/features/holidays/types/calendar.types.ts`**
```typescript
import { Holiday } from './holiday.types'

/**
 * Dia do calendário
 */
export interface CalendarDay {
  date: Date
  dateString: string
  day: number
  month: number
  year: number
  isToday: boolean
  isCurrentMonth: boolean
  isWeekend: boolean
  holidays: Holiday[]
  weekNumber: number
}

/**
 * Semana do calendário
 */
export interface CalendarWeek {
  weekNumber: number
  days: CalendarDay[]
}

/**
 * Mês do calendário
 */
export interface CalendarMonth {
  month: number
  year: number
  weeks: CalendarWeek[]
  holidays: Holiday[]
}

/**
 * Configuração do calendário
 */
export interface CalendarConfig {
  firstDayOfWeek: 0 | 1 // 0 = Sunday, 1 = Monday
  showWeekNumbers: boolean
  minDate?: Date
  maxDate?: Date
}

/**
 * Navegação do calendário
 */
export interface CalendarNavigation {
  currentMonth: number
  currentYear: number
  goToNext: () => void
  goToPrevious: () => void
  goToToday: () => void
  goToDate: (date: Date) => void
}
```

### 6. Types de Utilidades

**`src/types/utils.types.ts`**
```typescript
/**
 * Status de carregamento
 */
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error'

/**
 * Estado assíncrono genérico
 */
export interface AsyncState<T> {
  data: T | null
  status: LoadingStatus
  error: Error | null
}

/**
 * Resultado paginado
 */
export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

/**
 * Resposta de API genérica
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * Opções de ordenação
 */
export type SortDirection = 'asc' | 'desc'

export interface SortConfig<T> {
  field: keyof T
  direction: SortDirection
}

/**
 * Locale suportados
 */
export type Locale = 'en-US' | 'pt-BR' | 'es-CO'

/**
 * Configuração de formatação de data
 */
export interface DateFormatConfig {
  locale: Locale
  dateFormat: string
  timeFormat: string
  dateTimeFormat: string
}
```

### 7. Types do Store (Zustand)

**`src/store/types.ts`**
```typescript
import { FilterState } from '@/features/filters/types/filter.types'
import { ViewMode } from '@/features/holidays/types/holiday.types'

/**
 * Estado do store de filtros
 */
export interface FilterStoreState {
  filters: FilterState
  setCountryFilter: (country: Country, enabled: boolean) => void
  setMonthFilter: (month: MonthFilter) => void
  setWeekFilter: (week: WeekFilter) => void
  setYearFilter: (year: number) => void
  resetFilters: () => void
}

/**
 * Estado do store de visualização
 */
export interface ViewStoreState {
  viewMode: ViewMode
  showWeekNumbers: boolean
  highlightToday: boolean
  setViewMode: (mode: ViewMode) => void
  toggleWeekNumbers: () => void
  toggleHighlightToday: () => void
}

/**
 * Estado do store de preferências
 */
export interface PreferencesStoreState {
  theme: 'light' | 'dark' | 'system'
  locale: Locale
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setLocale: (locale: Locale) => void
}
```

### 8. Types de Hooks

**`src/hooks/types.ts`**
```typescript
/**
 * Retorno do hook useLocalStorage
 */
export interface UseLocalStorageReturn<T> {
  value: T
  setValue: (value: T | ((prev: T) => T)) => void
  removeValue: () => void
}

/**
 * Retorno do hook useMediaQuery
 */
export interface UseMediaQueryReturn {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLandscape: boolean
  isPortrait: boolean
}

/**
 * Retorno do hook useDebounce
 */
export type UseDebouncedValue<T> = T

/**
 * Opções para useDebounce
 */
export interface UseDebounceOptions {
  delay: number
  leading?: boolean
  trailing?: boolean
}
```

## Type Guards

**`src/utils/typeGuards.ts`**
```typescript
import { Country, Holiday } from '@/features/holidays/types/holiday.types'

/**
 * Verifica se um valor é um Country válido
 */
export function isCountry(value: unknown): value is Country {
  return (
    typeof value === 'string' &&
    Object.values(Country).includes(value as Country)
  )
}

/**
 * Verifica se um objeto é um Holiday válido
 */
export function isHoliday(obj: unknown): obj is Holiday {
  if (typeof obj !== 'object' || obj === null) return false
  
  const holiday = obj as Record<string, unknown>
  
  return (
    typeof holiday.id === 'string' &&
    isCountry(holiday.country) &&
    typeof holiday.name === 'string' &&
    typeof holiday.date === 'string' &&
    typeof holiday.month === 'number' &&
    typeof holiday.day === 'number' &&
    typeof holiday.year === 'number' &&
    typeof holiday.week === 'number'
  )
}

/**
 * Verifica se um valor é um array de Holidays
 */
export function isHolidayArray(value: unknown): value is Holiday[] {
  return Array.isArray(value) && value.every(isHoliday)
}
```

## Validação de Types em Runtime

**`src/utils/validators.ts`**
```typescript
import { z } from 'zod'
import { Country } from '@/features/holidays/types/holiday.types'

// Schema para Holiday
export const HolidaySchema = z.object({
  id: z.string(),
  country: z.nativeEnum(Country),
  name: z.string().min(1, 'Name is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  month: z.number().min(1).max(12),
  day: z.number().min(1).max(31),
  year: z.number().min(2000).max(2100),
  week: z.number().min(1).max(53),
  description: z.string().optional(),
})

// Validação de Holiday
export function validateHoliday(data: unknown) {
  return HolidaySchema.safeParse(data)
}

// Validação de array de Holidays
export function validateHolidays(data: unknown) {
  return z.array(HolidaySchema).safeParse(data)
}
```

## Benefícios Obtidos

✅ **Type Safety**: Erros detectados em tempo de compilação  
✅ **IntelliSense**: Autocompletar e documentação inline  
✅ **Refatoração Segura**: Mudanças rastreadas pelo TypeScript  
✅ **Documentação**: Types servem como documentação viva  
✅ **Validação**: Type guards e schemas para runtime  

---

**Próximo Passo**: [04-componentes-ui.md](./04-componentes-ui.md)

