import { Link, useParams } from "react-router-dom";
import { catalog } from "../Data/Catalog";
import { useAuth } from "../Context/AuthContext";
import { useEnrollment } from "../Context/EnrollmentContext";
import { useProgress } from "../Context/ProgressContext";

export default function Certificate() {
  const { id } = useParams();
  const { user } = useAuth();
  const { isEnrolled } = useEnrollment();
  const { percent } = useProgress();
  const course = catalog.find((c) => c.id === Number(id));

  const eligible = course && isEnrolled(course.id) && percent(course.id) === 100;

  if (!eligible) {
    return (
      <div className="card empty-state">
        <p>Read every note and take every test in this course to unlock your certificate.</p>
        <Link to={course ? `/courses/${course.id}` : "/courses"} className="btn-link">
          Back to course
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="no-print cert-actions">
        <Link to={`/courses/${course.id}`} className="back-link">← Back to course</Link>
        <button className="btn-primary fit" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>

      <div className="certificate">
        <p className="cert-brand">LearnHub</p>
        <h1>Certificate of Completion</h1>
        <p className="muted">This is to certify that</p>
        <p className="cert-name">{user.name}</p>
        <p className="muted">has successfully completed the course</p>
        <p className="cert-course">{course.title}</p>
        <p className="muted small">Issued on {new Date().toLocaleDateString()}</p>
      </div>
    </>
  );
}