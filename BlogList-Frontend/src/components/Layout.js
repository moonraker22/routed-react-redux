import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'transparent',
    borderBottom: '1px solid #ccc',
  }
  return (
    <div>
      <header>
        <nav style={navStyle}>
          <div>
            <NavLink to='/'>Home</NavLink>
          </div>
          <div>
            <NavLink to='/users'>Users</NavLink>
          </div>
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
