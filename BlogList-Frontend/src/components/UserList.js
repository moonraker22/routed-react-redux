import { useGetUsersQuery } from '../features/api/apiSlice'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'

const UserList = () => {
  const { data, error, isLoading } = useGetUsersQuery()
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <>
      <span>
        <h3>Users</h3>
        <h5 style={{ marginLeft: '200px' }}>Blogs Created</h5>
      </span>
      <ul style={{ listStyle: 'none' }}>
        {data.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  display: 'flex',
                  width: '30%',
                  justifyContent: 'space-between',
                }}>
                <div>{user.name}</div>
                <div>{user.blogs.length}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserList
