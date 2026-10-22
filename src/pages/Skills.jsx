import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../api/profileApi';
import './Skills.css';

export default function Skills() {
  // Fetch grouped skills
  const { data: groupedSkills = {}, isLoading } = useQuery({
    queryKey: ['skills', 'grouped'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/skills/grouped');
      return res.data.data; // Assuming same response structure
    }
  });

  if (isLoading) return <div className="skills"><p>Loading skills...</p></div>;

  return (
    <section className="skills">
      <div className="skills-container">
        <h2>Technical Skills</h2>
        
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category} className="skill-category">
            <h3>{category}</h3>
            <div className="skills-grid">
              {skills.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillCard({ skill }) {
  const getProficiencyLabel = (proficiency) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 75) return 'Advanced';
    if (proficiency >= 60) return 'Intermediate';
    if (proficiency >= 40) return 'Beginner';
    return 'Learning';
  };

  const getProficiencyColor = (proficiency) => {
    if (proficiency >= 90) return '#4CAF50'; // Green
    if (proficiency >= 75) return '#2196F3'; // Blue
    if (proficiency >= 60) return '#FF9800'; // Orange
    if (proficiency >= 40) return '#FF5722'; // Red
    return '#9E9E9E'; // Gray
  };

  return (
    <div className="skill-card">
      <div className="skill-header">
        <h4>{skill.name}</h4>
        <span className="proficiency-label" style={{ color: getProficiencyColor(skill.proficiency) }}>
          {getProficiencyLabel(skill.proficiency)}
        </span>
      </div>
      
      <div className="proficiency-bar">
        <div 
          className="proficiency-fill" 
          style={{ 
            width: `${skill.proficiency}%`,
            backgroundColor: getProficiencyColor(skill.proficiency)
          }}
        ></div>
      </div>
      
      <div className="proficiency-text">
        {skill.proficiency}% Proficiency
      </div>
    </div>
  );
}