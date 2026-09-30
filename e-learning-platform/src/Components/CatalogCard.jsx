import { useEnrollment } from "../Context/EnrollmentContext";
import { Link } from "react-router-dom";

export default function CatalogCard({ course }) {
  const { isEnrolled, enroll, unenroll } = useEnrollment();
  const enrolled = isEnrolled(course.id);

  return (
    <div className="card catalog-card">
      <div className="course-thumb">{course.emoji}</div>

      <div className="badges">
        <span className="badge">{course.category}</span>
        <span className={`badge level-${course.level.toLowerCase()}`}>{course.level}</span>
      </div>

      <h3>{course.title}</h3>
      <p className="muted small">
        {course.instructor} · {course.hours} hrs
      </p>
      <p className="catalog-desc">{course.description}</p>

      <ul className="topic-list">
        {course.topics.slice(0, 3).map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>

      <Link to={`/courses/${course.id}`} className="btn-link details-link">
        View details →
      </Link>

      <button
        className={enrolled ? "btn-outline" : "btn-primary"}
        onClick={() => (enrolled ? unenroll(course.id) : enroll(course.id))}
      >
        {enrolled ? "✓ Enrolled (click to undo)" : "Enroll"}
      </button>
    </div>
  );
}