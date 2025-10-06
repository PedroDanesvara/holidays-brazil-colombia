export const ROUTES = {
  HOME: '/',
  CALENDAR: '/calendar',
  ABOUT: '/about',
  NOT_FOUND: '/404',
} as const

export type RoutePath = typeof ROUTES[keyof typeof ROUTES]

