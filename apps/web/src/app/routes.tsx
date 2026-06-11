import { createBrowserRouter, Navigate } from 'react-router-dom'
import { SignInPage } from '@/features/auth/pages/SignInPage'
import { PlaceholderPage } from '@/shared/pages/PlaceholderPage'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate replace to="/sign-in" /> },
  { path: '/sign-in', element: <SignInPage /> },
  {
    path: '/forgot-password',
    element: <PlaceholderPage title="Recuperar senha" />,
  },
  { path: '/sign-up', element: <PlaceholderPage title="Criar conta" /> },
])
