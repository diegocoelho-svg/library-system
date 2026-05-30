import { createRoute, Link } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <div>
      <h1>Home</h1>
      <Link to="/sign-in">Ir para tela de Login</Link>
    </div>
  ),
})
