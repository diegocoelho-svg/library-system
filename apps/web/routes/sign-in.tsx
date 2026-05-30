import { createRoute } from '@tanstack/react-router'
import SignIn from '@/pages/auth/sign-in'
import { Route as rootRoute } from './__root'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  component: SignIn,
})
