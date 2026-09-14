import {useNavigate} from 'react-router-dom'
import './index.css'

const NotFound = () => {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/', {replace: true})
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dyo49bced/image/upload/v1788431800/Group_7484.png"
        alt="page not found"
        className="not-found-image"
      />

      <h1 className="not-found-heading">Page Not Found</h1>

      <p className="not-found-description">
        We are sorry, the page you requested could not be found.
      </p>

      <button
        type="button"
        className="go-home-button"
        onClick={goToHome}
      >
        Go Back To Home
      </button>
    </div>
  )
}

export default NotFound