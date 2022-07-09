import PropTypes from 'prop-types'
import { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser as setStoreUser } from '../features/user/userSlice'

const LoginForm = ({
  username,
  setPassword,
  setUsername,
  password,
  setMessage,
  setType,
  loginService,
  setUser,
  blogService,
}) => {
  const userNameRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(setStoreUser(user))
      setMessage('Welcome to the application!')
      setType('success')
      console.log('logged in user: ', user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong Credentials Try Again!')
      setType('error')
    }
  }

  useEffect(() => {
    userNameRef.current.focus()
  }, [])

  return (
    <form onSubmit={handleLogin} id='login-form'>
      <div>
        <label htmlFor='username'>Username </label>
        <input
          type='text'
          value={username}
          name='username'
          onChange={({ target }) => setUsername(target.value)}
          placeholder='username'
          id='username'
          ref={userNameRef}
        />
      </div>
      <div>
        <label htmlFor='password'>Password </label>
        <input
          type='password'
          value={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)}
          placeholder='password'
          id='password'
          ref={passwordRef}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  loginService: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  blogService: PropTypes.object.isRequired,
}
