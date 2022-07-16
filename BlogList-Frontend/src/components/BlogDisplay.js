import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useUpdateBlogMutation } from '../features/api/apiSlice'
import CommentForm from './CommentForm'

const BlogDisplay = () => {
  const { id } = useParams()
  const [updateBlog] = useUpdateBlogMutation()

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    try {
      await updateBlog(updatedBlog)
    } catch (exception) {
      console.error('error: ', exception)
    }
  }

  let blog = useSelector((state) =>
    state.blogsApi.queries['getBlogs(undefined)'].data.find(
      (blog) => blog.id === id
    )
  )
  console.log('blog: ', blog)
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>URL: {blog.url}</p>
      <p>Added By:{blog.author}</p>
      <p>
        Likes: {blog.likes}
        <button onClick={handleLike}>Like</button>
      </p>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '75%',
        }}>
        <h3>Comments:</h3>
        <CommentForm blog={blog} />
      </div>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDisplay
