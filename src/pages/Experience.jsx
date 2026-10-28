import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../api/profileApi';
import './Experience.css';

export default function Experience() {
  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/middleware/experiences'); // ← Changed to plural
      return res.data.data;
    }
  });

  if (isLoading) return <div className="experience"><p>Loading experience...</p></div>;

  return (
    <section className="experience">
      <div className="experience-container">
        <h2>Professional Experience</h2>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} isLast={index === experiences.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ experience, isLast }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getDuration = () => {
    const start = formatDate(experience.startDate);
    const end = experience.current ? 'Present' : formatDate(experience.endDate);
    return `${start} - ${end}`;
  };

  return (
    <div className={`experience-card ${isLast ? 'last' : ''}`}>
      <div className="experience-header">
        <div className="experience-role">
          <h3>{experience.role}</h3>
          <p className="company">{experience.company}</p>
          <p className="location">{experience.location}</p>
        </div>
        <div className="experience-duration">
          <span className={`duration ${experience.current ? 'current' : ''}`}>
            {getDuration()}
          </span>
        </div>
      </div>

      <div className="experience-content">
        <p className="description">{experience.description}</p>
        
          {experience.techUsed && (
          <div className="tech-used">
            <h4>Technologies Used:</h4>
            <div className="tech-badges">
              {(Array.isArray(experience.techUsed) ? experience.techUsed : experience.techUsed.split(','))
                .map((tech, i) => (
                  <span key={i} className="tech-badge">{tech.trim()}</span>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}