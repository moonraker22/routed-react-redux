import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { clearUser } from '../features/user/userSlice'

const LogoutForm = ({ setUser, setMessage, setType }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    dispatch(clearUser())
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
