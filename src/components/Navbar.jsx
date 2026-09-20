import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <header className="topbar">
      <div className="brand-wrap">
        <Link to="/" className="brand-logo">GrandVista</Link>
      </div>

      <nav className="main-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/search">Search Rooms</NavLink>
        {user?.role === 'CUSTOMER' ? <NavLink to="/my-bookings">My Bookings</NavLink> : null}
        {user?.role === 'CUSTOMER' ? <NavLink to="/feedback">Feedback</NavLink> : null}
        {user?.role === 'HOTEL_MANAGER' ? <NavLink to="/manager/dashboard">Dashboard</NavLink> : null}
        {user?.role === 'ADMIN' ? <NavLink to="/admin/dashboard">Admin</NavLink> : null}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="user-pill">{user.name || user.email}</span>
            <button type="button" className="btn btn-light" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-light">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
