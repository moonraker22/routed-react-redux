import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogDisplay = () => {
  const { id } = useParams()
  let blog = useSelector((state) =>
    state.blogsApi.queries['getBlogs(undefined)'].data.find(
      (blog) => blog.id === id
    )
  )
  console.log('blog: ', blog)
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>{blog.author}</p>
    </div>
  )
}

export default BlogDisplay
