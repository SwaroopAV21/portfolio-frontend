import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../api/api';
import './Profile.css';

export default function Profile() {
  // Fetch featured projects
  const { data: featuredProjects = [], isLoading: featuredLoading } = useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/middleware/projects/featured');
      return res.data.data;
    }
  });

  // Fetch all projects
  const { data: allProjects = [], isLoading: allLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/middleware/projects');
      return res.data.data;
    }
  });

  if (featuredLoading || allLoading) return <div className="profile"><p>Loading projects...</p></div>;

  return (
    <section className="profile">
      <div className="profile-container">
        <h2>Featured Projects</h2>
        <div className="projects-grid featured">
          {featuredProjects.map(project => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>

        <h2>All Projects</h2>
        <div className="projects-grid">
          {allProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured }) {
  return (
    <div className={`project-card ${featured ? 'featured' : ''}`}>
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} className="project-image" />
      )}
      <div className="project-content">
        <h3>{project.title}</h3>
        <p className="short-desc">{project.shortDesc}</p>
        <p className="description">{project.description}</p>
        
        <div className="tech-stack">
          {project.techStack.map((tech, i) => (
            <span key={i} className="tech-badge">{tech}</span>
          ))}
        </div>

        <div className="project-links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link-btn">
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-btn primary">
              View Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}