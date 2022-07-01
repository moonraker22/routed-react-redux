import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ setBlogs, blogs, setMessage, setType, blogService }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.username || ''
  })
  const [url, setUrl] = useState('')

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url,
    }

    try {
      const returnedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(returnedBlog))
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
  // console.log('blogs: ', blogs)
  return (
    <form onSubmit={handleBlogSubmit} data-testid="blog-form">
      <div>
        <label htmlFor="Title">Title:</label>
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          data-testid="title-input"
        />
      </div>
      <div>
        <label htmlFor="Author">Author:</label>
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          data-testid="author-input"
        />
      </div>
      <div>
        <label htmlFor="Url">URL:</label>
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          data-testid="url-input"
        />
      </div>

      <button type="submit">SAVE</button>
    </form>
  )
}

export default BlogForm

BlogForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setMessage: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  blogService: PropTypes.object.isRequired,
}
