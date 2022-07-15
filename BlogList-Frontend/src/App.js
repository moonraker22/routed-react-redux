/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { Outlet, Routes, Route } from 'react-router-dom'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import loginService from './services/auth'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import './App.css'
import { useGetBlogsQuery } from './features/api/apiSlice'
import { useDispatch } from 'react-redux'
import { setUser as setReduxUser } from './features/user/userSlice'
import Spinner from './components/Spinner'
import Blog from './components/Blog'
import UserList from './components/UserList'
import BlogDisplay from './components/BlogDisplay'
import Layout from './components/Layout'
import UserBlogList from './components/UserBlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()
  useEffect(() => {
    blogService.getAll().then((res) => {
      setBlogs([...res])
      // set user in redux store
      dispatch(setReduxUser(JSON.parse(window.localStorage.getItem('user'))))
    })
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      const user = JSON.parse(window.localStorage.getItem('user'))
      setUser(user)
      // blogService.setToken(user.token)
    }
  }, [])

  // Get blogs from redux store
  const { data, error, isLoading } = useGetBlogsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <Layout />
      <Notification
        message={message}
        setMessage={setMessage}
        type={type}
        setType={setType}
      />

      {user === null ? (
        <>
          <h2>Please Log In</h2>
          <hr />
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            setMessage={setMessage}
            setType={setType}
            loginService={loginService}
            blogService={blogService}
            setUser={setUser}
          />
        </>
      ) : (
        <>
          <hr />
          <p>Welcome {user.name}</p>
          <LogoutForm
            setUser={setUser}
            setMessage={setMessage}
            setType={setType}
          />
          <br />
          <Routes>
            <Route
              path='/'
              element={
                <BlogList
                  data={data}
                  setBlogs={setBlogs}
                  blogs={blogs}
                  setMessage={setMessage}
                  setType={setType}
                  blogFormRef={blogFormRef}
                />
              }
            />
            <Route path='users' element={<UserList />} />
            <Route path='users/:id' element={<UserBlogList />} />
            <Route path='blogs/:id' element={<BlogDisplay />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
