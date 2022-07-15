import Togglable from './ToggleComponent'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = ({ setMessage, setType, data, blogFormRef }) => {
  return (
    <div className='blogs'>
      <Togglable buttonLabel='Add New Blog' ref={blogFormRef}>
        <BlogForm setMessage={setMessage} setType={setType} />
      </Togglable>
      <br />
      {data.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={data} />
      ))}
    </div>
  )
}

export default BlogList
