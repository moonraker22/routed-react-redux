import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
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
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
