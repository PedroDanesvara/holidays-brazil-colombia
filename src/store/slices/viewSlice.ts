import type { StateCreator } from 'zustand'
import type { ViewStoreState } from '../types'
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

