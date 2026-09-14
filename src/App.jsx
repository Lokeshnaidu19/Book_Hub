import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Cookies from 'js-cookie'

import Login from './Login'
import Home from './Home'
import Bookshelves from './Bookshelves'
import BookDetails from './BookDetails'
import NotFound from './NotFound'

const LoginRoute = () => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return <Login />
}

const ProtectedRoute = ({children}) => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Navigate to="/login" replace />
  }

  return children
}

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginRoute />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookshelves"
        element={
          <ProtectedRoute>
            <Bookshelves />
          </ProtectedRoute>
        }
      />

      <Route
        path="/books/:bookId"
        element={
          <ProtectedRoute>
            <BookDetails />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App