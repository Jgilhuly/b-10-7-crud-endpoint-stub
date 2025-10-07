import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-logo">CRUD API Manager</h1>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">Users</Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
