/**
 * Constantes globais da aplicação
 */

export const APP_NAME = 'Holidays Calendar'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Public holidays calendar for Brazil and Colombia'

/**
 * Anos disponíveis
 */
export const AVAILABLE_YEARS = [2025, 2026] as const

/**
 * Meses do ano
 */
export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

/**
 * Dias da semana (começando no domingo)
 */
export const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

/**
 * Breakpoints responsivos
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

