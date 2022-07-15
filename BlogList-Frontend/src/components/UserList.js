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
      <h4>UserList</h4>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserList
