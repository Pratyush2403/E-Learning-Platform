const developer = {
  name: "Pratyush Sharma",
  role: "Full-Stack Web Developer",
  college: "Maharaja Agrasen Institute of Technology, New Delhi",
  degree: "B.Tech (2022 – 2026)",
  about:
    "Web developer with hands-on internship experience across healthtech, MERN stack and WordPress projects. LearnHub is a frontend-only e-learning platform built to showcase React skills.",
  skills: [
    "HTML", "CSS", "JavaScript", "Python", "C++", "SQL", "PHP",
    "React.js", "Node.js", "Express.js", "Bootstrap", "MongoDB", "MySQL",
  ],
  experience: [
    { company: "POCT Services", detail: "Web developer intern · Healthtech (LIMS/HIMS), Azure" },
    { company: "NTPC EOC", detail: "Web developer intern · MERN stack" },
    { company: "GAOTek Inc.", detail: "Web developer intern · WordPress & WooCommerce" },
    { company: "SkillForge", detail: "Web developer intern" },
    { company: "Codewecure", detail: "Frontend intern" },
  ],
  projectStack: ["React.js", "React Router v6", "Context API", "localStorage", "Plain CSS"],
  links: [
    { label: "GitHub", url: "https://github.com/your-username" },
    { label: "LinkedIn", url: "https://linkedin.com/in/your-username" },
    { label: "Email", url: "mailto:you@example.com" },
  ],
};

export default function Developer() {
  const initials = developer.name.split(" ").map((w) => w[0]).join("");

  return (
    <>
      <h1>About the Developer</h1>
      <p className="muted">The person behind LearnHub.</p>

      <div className="card dev-card">
        <div className="dev-top">
          <div className="avatar">{initials}</div>
          <div>
            <h2>{developer.name}</h2>
            <p className="muted">{developer.role}</p>
            <p className="muted small">{developer.degree} · {developer.college}</p>
          </div>
        </div>

        <p>{developer.about}</p>

        <div className="dev-section">
          <h3>Skills</h3>
          <div className="chip-list">
            {developer.skills.map((s) => <span key={s} className="skill-chip">{s}</span>)}
          </div>
        </div>

        <div className="dev-section">
          <h3>Experience</h3>
          <ul className="exp-list">
            {developer.experience.map((e) => (
              <li key={e.company}>
                <strong>{e.company}</strong>
                <span className="muted small">{e.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dev-section">
          <h3>This project is built with</h3>
          <div className="chip-list">
            {developer.projectStack.map((s) => <span key={s} className="skill-chip">{s}</span>)}
          </div>
        </div>

        <div className="dev-section">
          <h3>Connect</h3>
          <div className="dev-links">
            {developer.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target={l.url.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}