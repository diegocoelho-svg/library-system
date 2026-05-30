import { createRouter } from '@tanstack/react-router'
import { Route as rootRoute } from '../routes/__root'
import { Route as indexRoute } from '../routes/index'
import { Route as signInRoute } from '../routes/sign-in'

const routeTree = rootRoute.addChildren([indexRoute, signInRoute])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
