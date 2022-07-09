/* eslint-disable no-unused-vars */
import { useState } from 'react'
// import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import {
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from '../features/api/apiSlice'
import Spinner from './Spinner'

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [showDetails, setShowDetails] = useState(false)
  const [updateBlog, { isLoading }] = useUpdateBlogMutation()
  const [deleteBlog, { isLoading: isLoadingDelete }] = useDeleteBlogMutation()

  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
    }
    try {
      await updateBlog(updatedBlog)
      setLikes((likes) => likes + 1)
    } catch (exception) {
      console.error('error: ', exception)
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await deleteBlog(blog.id)
      } catch (exception) {
        console.error('error: ', exception)
      }
    }
  }

  if (isLoading) {
    return <Spinner loading={isLoading} />
  }

  if (isLoadingDelete) {
    return <Spinner loading={isLoadingDelete} />
  }

  return (
    <article className='blog-list'>
      <div onClick={() => setShowDetails(!showDetails)}>
        {blog.title} <span className='author_list'>By: {blog.author}</span>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>
      <div className='hidden' style={showWhenVisible}>
        <div>URL: {blog.url}</div>
        <div>Author: {blog.author}</div>

        <div>
          {likes} likes{' '}
          <button onClick={handleLike} data-testid='like-button'>
            Like
          </button>
        </div>
        <div>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </article>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
}
