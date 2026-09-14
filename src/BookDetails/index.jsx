import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'
const BookDetails = () => {
  const {bookId} = useParams()

  const [bookDetails, setBookDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getBookDetails = async () => {
    setIsLoading(true)
    setIsError(false)

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${bookId}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (response.ok) {
        setBookDetails(data.book_details)
      } else {
        setIsError(true)
      }
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getBookDetails()
  }, [bookId])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return (
      <div>
        <p>Something went wrong</p>
        <button type="button" onClick={getBookDetails}>
          Try Again
        </button>
      </div>
    )
  }

  return (
  <div className="book-details-page">
    <Header />

    <main className="book-details-container">
      <div className="book-details-card">
        <div className="book-main-information">
          <img
            src={bookDetails.cover_pic}
            alt={bookDetails.title}
            className="details-book-image"
          />

          <div>
            <h1>{bookDetails.title}</h1>
            <p>{bookDetails.author_name}</p>
            <p>Rating: {bookDetails.rating} ★</p>
            <p>
              Status:{' '}
              <span className="read-status">
                {bookDetails.read_status}
              </span>
            </p>
          </div>
        </div>

        <hr />

        <h2>About Author</h2>
        <p>{bookDetails.about_author}</p>

        <h2>About Book</h2>
        <p>{bookDetails.about_book}</p>
      </div>
    </main>

    <Footer />
  </div>
)
}

export default BookDetails