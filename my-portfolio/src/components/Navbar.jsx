import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
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
        </ul>
      </div>
    </nav>
  );
}