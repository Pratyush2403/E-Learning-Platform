import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.id}`} className="card course-card course-link">
      <div className="course-thumb">{course.emoji}</div>
      <h3>{course.title}</h3>
      <p className="muted">{course.instructor}</p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${course.progress}%` }} />
      </div>
      <p className="muted small">{course.progress}% complete</p>
    </Link>
  );
}