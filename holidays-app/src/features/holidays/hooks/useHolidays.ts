import { useMemo } from 'react'
import { holidayService } from '../services/holidayService'

/**
 * Hook para acessar todos os feriados
 */
export function useHolidays() {
  const holidays = useMemo(() => holidayService.getAllHolidays(), [])

  const availableYears = useMemo(
    () => holidayService.getAvailableYears(),
    []
  )

  return {
    holidays,
    availableYears,
  }
}

