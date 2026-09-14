import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'
import './index.css'

const Home = () => {
  const [booksList, setBooksList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const booksContainer = useRef(null)
  const navigate = useNavigate()

  const onClickFindBooks = () => {
    navigate('/bookshelves')
  }

  const getBooks = async () => {
    setIsLoading(true)
    setErrorMessage('')

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl =
      'https://apis.ccbp.in/book-hub/top-rated-books'

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
        setBooksList(data.books)
      } else {
        setErrorMessage(
          data.error_msg || 'Failed to load books',
        )
      }
    } catch {
      setErrorMessage(
        'Something went wrong. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getBooks()
  }, [])

  const scrollLeft = () => {
    booksContainer.current?.scrollBy({
      left: -350,
      behavior: 'smooth',
    })
  }

  const scrollRight = () => {
    booksContainer.current?.scrollBy({
      left: 350,
      behavior: 'smooth',
    })
  }

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <div className="loader"></div>
    </div>
  )

  const renderBooks = () => (
    <div className="home-slider-container">
      <button
        type="button"
        className="home-arrow-button home-left-arrow"
        onClick={scrollLeft}
        aria-label="Scroll books left"
      >
        &#10094;
      </button>

      <ul className="home-books-list" ref={booksContainer}>
        {booksList.map(book => (
          <li
            key={book.id}
            className="home-book-item"
            onClick={() => navigate(`/books/${book.id}`)}
          >
            <img
              src={book.cover_pic}
              alt={book.title}
              className="home-book-image"
            />

            <div className="home-book-details">
              <h3 className="home-book-title">
                {book.title}
              </h3>

              <p className="home-author-name">
                {book.author_name}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="home-arrow-button home-right-arrow"
        onClick={scrollRight}
        aria-label="Scroll books right"
      >
        &#10095;
      </button>
    </div>
  )

  const renderHomeContent = () => {
    if (isLoading) {
      return renderLoadingView()
    }

    if (errorMessage !== '') {
      return <FailureView onRetry={getBooks} />
    }

    return renderBooks()
  }

  return (
    <div className="home-page">
      <Header />

      <main className="home-content">
        <section className="introduction-section">
          <h1 className="home-heading">
            Find Your Next Favorite Books?
          </h1>

          <p className="home-description">
            You are in the right place. Tell us what titles or
            genres you have enjoyed in the past, and we will give
            you surprisingly insightful recommendations.
          </p>
        </section>

        <section className="top-rated-section">
          <div className="top-rated-header">
            <h2 className="section-heading">
              Top Rated Books
            </h2>

            <button
              type="button"
              className="find-books-button"
              onClick={onClickFindBooks}
            >
              Find Books
            </button>
          </div>

          {renderHomeContent()}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home