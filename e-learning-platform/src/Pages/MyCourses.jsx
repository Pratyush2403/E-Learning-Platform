import { Link } from "react-router-dom";
import { catalog } from "../Data/Catalog";
import { getContent } from "../Data/CourseContext";
import { useEnrollment } from "../Context/EnrollmentContext";
import { useProgress } from "../Context/ProgressContext";

export default function MyCourses() {
  const { enrolledIds, unenroll } = useEnrollment();
  const { percent } = useProgress();
  const enrolled = catalog.filter((c) => enrolledIds.includes(c.id));

  return (
    <>
      <h1>My Courses</h1>
      <p className="muted">Courses you have enrolled in.</p>

      {enrolled.length === 0 ? (
        <div className="card empty-state stack">
          <p>You have not enrolled in any courses yet.</p>
          <Link to="/courses" className="btn-link">Browse courses →</Link>
        </div>
      ) : (
        <section className="stack">
          {enrolled.map((course) => {
            const content = getContent(course.id);
            const progress = percent(course.id);
            return (
              <div key={course.id} className="card my-course">
                <div className="course-thumb small-thumb">{course.emoji}</div>

                <div className="my-course-info">
                  <h3>{course.title}</h3>
                  <p className="muted small">
                    {course.instructor} · {course.hours} hrs · {course.level}
                  </p>
                  <p className="muted small">
                    {content.notes.length} notes · {content.videos.length} videos ·{" "}
                    {content.questions.length} questions · {content.tests.length} tests
                  </p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="muted small">{progress}% complete</p>
                </div>

                <div className="my-course-actions">
                  <Link to={`/courses/${course.id}`} className="btn-primary fit link-as-btn">
                    {progress > 0 ? "Continue" : "Start"}
                  </Link>
                  <button className="btn-outline fit" onClick={() => unenroll(course.id)}>
                    Unenroll
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}