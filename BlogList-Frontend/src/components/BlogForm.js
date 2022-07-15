/* eslint-disable no-unused-vars */
import { useState } from 'react'
// import PropTypes from 'prop-types'
import { useCreateBlogMutation } from '../features/api/apiSlice'
import { getUser } from '../features/user/userSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const BlogForm = ({ setMessage, setType }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  let user = useSelector(getUser)

  useEffect(() => {
    if (!user.username) {
      user = JSON.parse(localStorage.getItem('user'))
    }
    setAuthor(user?.username || '')
  }, [])

  const [url, setUrl] = useState('')

  const [createBlog, { isLoading }] = useCreateBlogMutation()

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url,
    }

    try {
      const token = user.token
      await createBlog(blog, token).unwrap()
      setTitle('')
      setUrl('')
      setMessage('New blog added!')
      setType('success')
    } catch (exception) {
      console.error('error: ', exception)
      setMessage('Error adding blog!')
      setType('error')
    }
  }
  return (
    <form onSubmit={handleBlogSubmit} data-testid='blog-form'>
      <div>
        <label htmlFor='Title'>Title:</label>
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
          data-testid='title-input'
        />
      </div>
      <div>
        <label htmlFor='Author'>Author:</label>
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
          data-testid='author-input'
        />
      </div>
      <div>
        <label htmlFor='Url'>URL:</label>
        <input
          type='text'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
          data-testid='url-input'
        />
      </div>

      <button type='submit'>SAVE</button>
    </form>
  )
}

export default BlogForm

// BlogForm.propTypes = {
//   setBlogs: PropTypes.func.isRequired,
//   blogs: PropTypes.array.isRequired,
//   setMessage: PropTypes.func.isRequired,
//   setType: PropTypes.func.isRequired,
//   blogService: PropTypes.object.isRequired,
// }
