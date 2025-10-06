# 🗺️ Passo 9: Layouts e Rotas

## Objetivo
Configurar sistema de roteamento com React Router e criar layouts reutilizáveis.

## Estrutura de Rotas

```
/                     → Home (lista de feriados)
/calendar             → Calendário
/about                → Sobre
/404                  → Página não encontrada
```

## 1. Configuração do React Router

**`src/config/routes.ts`**
```typescript
export const ROUTES = {
  HOME: '/',
  CALENDAR: '/calendar',
  ABOUT: '/about',
  NOT_FOUND: '/404',
} as const

export type RoutePath = typeof ROUTES[keyof typeof ROUTES]
```

## 2. Layout Components

### Header

**`src/components/layout/Header/Header.tsx`**
```typescript
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { Button } from '@/components/ui/Button'
import { Calendar, List, Info } from 'lucide-react'
import clsx from 'clsx'

export function Header() {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <Calendar className="text-brazil" size={32} />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Holidays Calendar
              </h1>
              <p className="text-xs text-gray-600">Brazil & Colombia</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Link to={ROUTES.HOME}>
              <Button
                variant={isActive(ROUTES.HOME) ? 'primary' : 'ghost'}
                leftIcon={<List size={16} />}
              >
                List
              </Button>
            </Link>
            
            <Link to={ROUTES.CALENDAR}>
              <Button
                variant={isActive(ROUTES.CALENDAR) ? 'primary' : 'ghost'}
                leftIcon={<Calendar size={16} />}
              >
                Calendar
              </Button>
            </Link>
            
            <Link to={ROUTES.ABOUT}>
              <Button
                variant={isActive(ROUTES.ABOUT) ? 'primary' : 'ghost'}
                leftIcon={<Info size={16} />}
              >
                About
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
```

**`src/components/layout/Header/index.ts`**
```typescript
export { Header } from './Header'
```

### Footer

**`src/components/layout/Footer/Footer.tsx`**
```typescript
import { Github, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            Made with <Heart size={16} className="text-colombia" fill="currentColor" /> by Team CALA
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>© {currentYear} Holidays Calendar</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brazil transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

**`src/components/layout/Footer/index.ts`**
```typescript
export { Footer } from './Footer'
```

### Container

**`src/components/layout/Container/Container.tsx`**
```typescript
import { ReactNode } from 'react'
import clsx from 'clsx'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1400px]',
  full: 'max-w-full',
}

export function Container({ children, className, size = 'lg' }: ContainerProps) {
  return (
    <div className={clsx('container mx-auto px-4 py-8', sizeClasses[size], className)}>
      {children}
    </div>
  )
}
```

**`src/components/layout/Container/index.ts`**
```typescript
export { Container } from './Container'
```

### MainLayout

**`src/components/layout/MainLayout/MainLayout.tsx`**
```typescript
import { ReactNode } from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

**`src/components/layout/MainLayout/index.ts`**
```typescript
export { MainLayout } from './MainLayout'
```

## 3. Pages

### Home Page

**`src/pages/Home/Home.tsx`**
```typescript
import { Container } from '@/components/layout/Container'
import { FilterBar } from '@/features/filters/components/FilterBar'
import { ActiveFilters } from '@/features/filters/components/ActiveFilters'
import { FilterPresets } from '@/features/filters/components/FilterPresets'
import { HolidayList } from '@/features/holidays/components/HolidayList'
import { HolidayStats } from '@/features/holidays/components/HolidayStats'
import { useHolidays } from '@/features/holidays/hooks/useHolidays'
import { useFilteredHolidays } from '@/features/holidays/hooks/useFilteredHolidays'
import { useHolidayStats } from '@/features/holidays/hooks/useHolidayStats'

export function Home() {
  const { holidays } = useHolidays()
  const filteredHolidays = useFilteredHolidays(holidays)
  const stats = useHolidayStats(holidays, filteredHolidays)

  return (
    <Container>
      <div className="space-y-6">
        {/* Page Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Public Holidays
          </h2>
          <p className="text-white/90">
            Explore holidays in Brazil and Colombia
          </p>
        </div>

        {/* Filters */}
        <FilterBar />
        
        {/* Quick Filters */}
        <FilterPresets />
        
        {/* Active Filters */}
        <ActiveFilters />

        {/* Stats */}
        <HolidayStats stats={stats} />

        {/* Holiday List */}
        <HolidayList holidays={filteredHolidays} showWeek />
      </div>
    </Container>
  )
}
```

**`src/pages/Home/index.ts`**
```typescript
export { Home } from './Home'
```

### Calendar Page

**`src/pages/CalendarPage/CalendarPage.tsx`**
```typescript
import { Container } from '@/components/layout/Container'
import { FilterBar } from '@/features/filters/components/FilterBar'
import { ActiveFilters } from '@/features/filters/components/ActiveFilters'
import { HolidayCalendar } from '@/features/holidays/components/HolidayCalendar'
import { CalendarLegend } from '@/features/holidays/components/CalendarLegend'

export function CalendarPage() {
  return (
    <Container size="xl">
      <div className="space-y-6">
        {/* Page Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Calendar View
          </h2>
          <p className="text-white/90">
            Visual representation of holidays
          </p>
        </div>

        {/* Filters */}
        <FilterBar />
        
        {/* Active Filters */}
        <ActiveFilters />

        {/* Calendar */}
        <HolidayCalendar />
        
        {/* Legend */}
        <CalendarLegend />
      </div>
    </Container>
  )
}
```

**`src/pages/CalendarPage/index.ts`**
```typescript
export { CalendarPage } from './CalendarPage'
```

### About Page

**`src/pages/About/About.tsx`**
```typescript
import { Container } from '@/components/layout/Container'
import { Card } from '@/components/ui/Card'

export function About() {
  return (
    <Container size="md">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">About</h2>
          <p className="text-white/90">
            Learn more about this application
          </p>
        </div>

        <Card>
          <div className="prose max-w-none">
            <h3>Holidays Calendar</h3>
            <p>
              This application helps you explore and manage public holidays in
              Brazil and Colombia. Built with modern web technologies for the
              best user experience.
            </p>

            <h4>Features</h4>
            <ul>
              <li>View holidays in list or calendar format</li>
              <li>Filter by country, year, month, and week</li>
              <li>Interactive calendar with holiday indicators</li>
              <li>Responsive design for all devices</li>
              <li>Fast and accessible</li>
            </ul>

            <h4>Technology Stack</h4>
            <ul>
              <li>React 18 with TypeScript</li>
              <li>Vite for blazing fast builds</li>
              <li>Tailwind CSS for styling</li>
              <li>Zustand for state management</li>
              <li>Framer Motion for animations</li>
            </ul>

            <h4>Data Sources</h4>
            <p>
              Holiday data is sourced from official government calendars for
              Brazil and Colombia. We update the data annually to ensure
              accuracy.
            </p>
          </div>
        </Card>
      </div>
    </Container>
  )
}
```

**`src/pages/About/index.ts`**
```typescript
export { About } from './About'
```

### 404 Page

**`src/pages/NotFound/NotFound.tsx`**
```typescript
import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Home, Calendar } from 'lucide-react'
import { ROUTES } from '@/config/routes'

export function NotFound() {
  return (
    <Container size="md">
      <Card>
        <div className="text-center py-12">
          <div className="text-9xl font-bold text-brazil mb-4">404</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link to={ROUTES.HOME}>
              <Button leftIcon={<Home size={16} />}>
                Go Home
              </Button>
            </Link>
            <Link to={ROUTES.CALENDAR}>
              <Button variant="secondary" leftIcon={<Calendar size={16} />}>
                View Calendar
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </Container>
  )
}
```

**`src/pages/NotFound/index.ts`**
```typescript
export { NotFound } from './NotFound'
```

## 4. Router Configuration

**`src/App.tsx`**
```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { Home } from './pages/Home'
import { CalendarPage } from './pages/CalendarPage'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'
import { ROUTES } from './config/routes'
import { ErrorBoundary } from './components/common/ErrorBoundary'

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CALENDAR} element={<CalendarPage />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
```

## 5. Error Boundary

**`src/components/common/ErrorBoundary/ErrorBoundary.tsx`**
```typescript
import { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brazil-dark to-brazil p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <AlertTriangle className="mx-auto mb-4 text-colombia" size={64} />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            {this.state.error && (
              <details className="text-left text-sm text-gray-500 mb-6 p-4 bg-gray-50 rounded">
                <summary className="cursor-pointer font-semibold">
                  Error details
                </summary>
                <pre className="mt-2 whitespace-pre-wrap">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

**`src/components/common/ErrorBoundary/index.ts`**
```typescript
export { ErrorBoundary } from './ErrorBoundary'
```

## 6. Loading Page

**`src/components/common/LoadingPage/LoadingPage.tsx`**
```typescript
import { LoadingSpinner } from '../LoadingSpinner'

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  )
}
```

## 7. Lazy Loading (Code Splitting)

Para otimizar o carregamento:

```typescript
import { lazy, Suspense } from 'react'
import { LoadingPage } from './components/common/LoadingPage'

const Home = lazy(() => import('./pages/Home'))
const CalendarPage = lazy(() => import('./pages/CalendarPage'))
const About = lazy(() => import('./pages/About'))

export function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CALENDAR} element={<CalendarPage />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            {/* ... */}
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  )
}
```

## 8. Scroll to Top

**`src/components/common/ScrollToTop/ScrollToTop.tsx`**
```typescript
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// Usage in App.tsx
<BrowserRouter>
  <ScrollToTop />
  <MainLayout>
    {/* ... */}
  </MainLayout>
</BrowserRouter>
```

---

**Próximo Passo**: [10-testes-e-qualidade.md](./10-testes-e-qualidade.md)

