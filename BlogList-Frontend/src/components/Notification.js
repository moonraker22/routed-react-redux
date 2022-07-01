import PropTypes from 'prop-types'

const Notification = ({ message, setMessage, type, setType }) => {
  if (message === null) {
    return null
  } else {
    setTimeout(() => {
      setMessage(null)
      setType(null)
    }, 5000)
    if (type === 'error') {
      return <div className=" notification error">{message}</div>
    } else {
      return <div className=" notification success">{message}</div>
    }
  }
}

export default Notification

Notification.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func,
  type: PropTypes.string,
  setType: PropTypes.func,
}
