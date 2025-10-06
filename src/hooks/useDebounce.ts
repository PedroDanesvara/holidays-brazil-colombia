import { useState, useEffect } from 'react'
import type { UseDebouncedValue, UseDebounceOptions } from './types'

export function useDebounce<T>(
  value: T,
  options: UseDebounceOptions = { delay: 500 }
): UseDebouncedValue<T> {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, options.delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, options.delay])

  return debouncedValue
}

