import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <header className="header-container">
      <Link to="/" className="header-logo-link">
  <img
    src="https://res.cloudinary.com/dyo49bced/image/upload/v1788327853/Group_7731.png"
    alt="BookHub logo"
    className="header-logo"
  />
</Link>

      <nav className="navigation-container">
        <a href="/" className="nav-link">
          Home
        </a>

        <a href="/bookshelves" className="nav-link">
          Bookshelves
        </a>

        <button
          type="button"
          className="logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  )
}

export default Header