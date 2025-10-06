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

