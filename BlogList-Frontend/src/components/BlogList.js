import Togglable from './ToggleComponent'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = ({
  blogs,
  setBlogs,
  setMessage,
  setType,
  data,
  blogFormRef,
}) => {
  return (
    <div className='blogs'>
      <Togglable buttonLabel='Add New Blog' ref={blogFormRef}>
        <BlogForm
          setBlogs={setBlogs}
          blogs={blogs}
          setMessage={setMessage}
          setType={setType}
        />
      </Togglable>
      <br />
      {data.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={data} setBlogs={setBlogs} />
      ))}
    </div>
  )
}

export default BlogList
