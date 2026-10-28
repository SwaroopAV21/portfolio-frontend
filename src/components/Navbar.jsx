import { Link } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import './Navbar.css';

export default function Navbar() {
  const { isAdmin, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Code & Craft</Link>
        <ul className="nav-menu">
          <li><Link to="/"></Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/experience">Professional Journey</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {isAdmin ? (
            <>
              <li>
                <Link to="/metrics" className="nav-metrics-link">
                  Metrics <span className="nav-new-badge">NEW</span>
                </Link>
              </li>
              <li>
                <button type="button" className="nav-logout" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}