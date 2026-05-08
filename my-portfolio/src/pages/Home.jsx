import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Swaroop's Profile here</h1>
          <p className="subtitle">Full Stack Developer | Problem Solver | Tech Enthusiast</p>
          <p className="description">
            Welcome to my portfolio. I'm passionate about building beautiful and functional web applications.
          </p>
          <div className="cta-buttons">
            <Link to="/profile" className="btn btn-primary">
              View My Profile
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="highlight-card">
          <h3>💻 Skills</h3>
          <p>React, Node.js, JavaScript, and more</p>
          <Link to="/skills">Learn more →</Link>
        </div>
        <div className="highlight-card">
          <h3>🎯 Experience</h3>
          <p>Years of experience in web development</p>
          <Link to="/experience">Learn more →</Link>
        </div>
        <div className="highlight-card">
          <h3>📧 Contact</h3>
          <p>Let's collaborate and create something great</p>
          <Link to="/contact">Get in touch →</Link>
        </div>
      </section>
    </div>
  );
}