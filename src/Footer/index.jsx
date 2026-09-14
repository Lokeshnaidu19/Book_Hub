import {
  FaGoogle,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div className="social-icons">
      <FaGoogle />
      <FaTwitter />
      <FaInstagram />
      <FaYoutube />
    </div>

    <p>Contact us</p>
  </footer>
)

export default Footer