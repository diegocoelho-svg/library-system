import { Link, Route, Routes } from 'react-router-dom'
import SignIn from '@/pages/auth/sign-in'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>Home</h1>
            <Link to="/sign-in">Ir para tela de Login</Link>
          </div>
        }
      />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  )
}
