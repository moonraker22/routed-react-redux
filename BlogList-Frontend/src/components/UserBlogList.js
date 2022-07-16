import { useParams, Link } from 'react-router-dom'
import { useGetUsersQuery } from '../features/api/apiSlice'
import Spinner from './Spinner'

const UserBlogList = () => {
  const { id } = useParams()
  const { data, error, isLoading } = useGetUsersQuery()

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  } else if (error) {
    return <div>Error: {error.message}</div>
  } else {
    for (let [, value] of Object.entries(data)) {
      if (value.id === id) {
        return (
          <div>
            <h2>{value.name}</h2>
            <ul>
              {value.blogs.map((blog) => (
                <li key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )
      }
    }
  }
}

export default UserBlogList
