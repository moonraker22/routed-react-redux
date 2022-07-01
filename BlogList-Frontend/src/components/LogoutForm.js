import PropTypes from 'prop-types'

const LogoutForm = ({ setUser, setMessage, setType }) => {
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    setMessage('Logged out!')
    setType('success')
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutForm

LogoutForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
}
