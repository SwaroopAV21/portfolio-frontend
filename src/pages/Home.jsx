import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Swaroop's Profile here</h1>
          <p className="subtitle">Software Engineer | Full Stack Developer | Cloud & DevOps  </p>
          <p className="description">
              Building scalable software systems for the next generation of products.
          </p>
          <div className="cta-buttons">
            <Link to="/profile" className="btn btn-primary">
              Scan My Profile
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
          <p>C++ • Java • Python • Go • React.js and more</p>
          <Link to="/skills">Learn more →</Link>
        </div>
        <div className="highlight-card">
          <h3>Professional Journey</h3>
          <p>3+ years in software engineering and development</p>
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