import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'
import './index.css'

const shelfOptions = [
  {
    id: 'ALL',
    label: 'All',
  },
  {
    id: 'READ',
    label: 'Read',
  },
  {
    id: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const Bookshelves = () => {
  const [activeShelf, setActiveShelf] = useState('ALL')
  const [searchInput, setSearchInput] = useState('')
  const [searchText, setSearchText] = useState('')
  const [booksList, setBooksList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const getBooks = async () => {
    setIsLoading(true)
    setErrorMessage('')

    const jwtToken = Cookies.get('jwt_token')
    const encodedSearchText = encodeURIComponent(searchText)

    const apiUrl =
      `https://apis.ccbp.in/book-hub/books` +
      `?shelf=${activeShelf}&search=${encodedSearchText}`

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
        setBooksList(data.books || [])
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
  }, [activeShelf, searchText])

  const changeShelf = shelfId => {
    setActiveShelf(shelfId)
  }

  const changeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const submitSearch = event => {
    event.preventDefault()
    setSearchText(searchInput.trim())
  }

  const activeShelfName =
    shelfOptions.find(option => option.id === activeShelf)
      ?.label || 'All'

  const renderLoadingView = () => (
    <div
      className="loader-container"
      data-testid="loader"
    >
      <div className="loader"></div>
    </div>
  )

  const renderNoBooksView = () => (
    <div className="no-books-container">
      <img
        src="https://res.cloudinary.com/dyo49bced/image/upload/v1788431319/Asset_1_1.png"
        alt="no books"
        className="no-books-image"
      />

      <p className="no-books-text">
        Your search for {searchText} did not find any matches.
      </p>
    </div>
  )

  const renderBooksView = () => (
    <ul className="books-list">
      {booksList.map(book => (
        <li key={book.id} className="book-item">
          <Link
            to={`/books/${book.id}`}
            className="book-details-link"
          >
            <img
              src={book.cover_pic}
              alt={book.title}
              className="book-image"
            />

            <div className="book-details">
              <h2 className="book-title">
                {book.title}
              </h2>

              <p className="author-name">
                {book.author_name}
              </p>

              <p className="book-detail">
                Rating:{' '}
                <span className="rating">
                  ★ {book.rating}
                </span>
              </p>

              <p className="book-detail">
                Status:{' '}
                <span className="read-status">
                  {book.read_status}
                </span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )

  const renderBooksContent = () => {
    if (isLoading) {
      return renderLoadingView()
    }

    if (errorMessage !== '') {
      return <FailureView onRetry={getBooks} />
    }

    if (booksList.length === 0) {
      return renderNoBooksView()
    }

    return renderBooksView()
  }

  return (
    <div className="bookshelves-page">
      <Header />

      <main className="bookshelves-main">
        <aside className="sidebar">
          <h2 className="sidebar-heading">
            Bookshelves
          </h2>

          <ul className="shelf-options-list">
            {shelfOptions.map(option => (
              <li key={option.id}>
                <button
                  type="button"
                  className={
                    activeShelf === option.id
                      ? 'shelf-option active-shelf'
                      : 'shelf-option'
                  }
                  onClick={() => changeShelf(option.id)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="books-content">
          <div className="books-content-header">
            <h1 className="books-heading">
              {activeShelfName} Books
            </h1>

            <form
              className="search-form"
              onSubmit={submitSearch}
            >
              <input
                type="search"
                value={searchInput}
                onChange={changeSearchInput}
                placeholder="Search books"
                className="search-input"
              />

              <button
                type="submit"
                className="search-button"
              >
                Search
              </button>
            </form>
          </div>

          {renderBooksContent()}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Bookshelves