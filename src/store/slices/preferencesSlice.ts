import type { StateCreator } from 'zustand'
import type { PreferencesStoreState } from '../types'
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

