import { NavLink, Outlet } from 'react-router-dom'
import Notification from './Notification'

const Layout = ({ message, setMessage, type, setType }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/users'>Users</NavLink>
            </li>
            <li>
              <NavLink to='/contact'>Contact</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className='container'>
        <h1>Blogs</h1>
        <Notification
          message={message}
          setMessage={setMessage}
          type={type}
          setType={setType}
        />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
