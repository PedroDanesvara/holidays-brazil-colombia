import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layout'
import { Home, About, NotFound } from '@/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
    errorElement: (
      <MainLayout>
        <NotFound />
      </MainLayout>
    ),
  },
  {
    path: '/about',
    element: (
      <MainLayout>
        <About />
      </MainLayout>
    ),
  },
  {
    path: '*',
    element: (
      <MainLayout>
        <NotFound />
      </MainLayout>
    ),
  },
])

