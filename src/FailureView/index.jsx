import './index.css'

const FailureView = props => {
  const {onRetry} = props

  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dyo49bced/image/upload/v1788668496/Group_7522.png"
        alt="failure view"
        className="failure-view-image"
      />

      <p className="failure-view-message">
        Something went wrong, Please try again.
      </p>

      <button
        type="button"
        className="failure-retry-button"
        onClick={onRetry}
      >
        Try Again
      </button>
    </div>
  )
}

export default FailureView