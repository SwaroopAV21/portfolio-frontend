export default function Experience() {
  const experiences = [
    {
      id: 1,
      company: "Company Name 1",
      position: "Job Title",
      duration: "Jan 2023 - Present",
      description: "Brief description of your role and responsibilities"
    },
    {
      id: 2,
      company: "Company Name 2",
      position: "Previous Job Title",
      duration: "Jun 2021 - Dec 2022",
      description: "Brief description of your role and responsibilities"
    }
  ];

  return (
    <section>
      <h2>Experience</h2>
      <div>
        {experiences.map((exp) => (
          <div key={exp.id}>
            <h3>{exp.position}</h3>
            <p>{exp.company}</p>
            <p>{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}