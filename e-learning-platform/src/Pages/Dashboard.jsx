import { Link } from "react-router-dom";
import StatCard from "../Components/StatCard";
import CourseCard from "../Components/CourseCard";
import { useAuth } from "../Context/AuthContext";
import { useEnrollment } from "../Context/EnrollmentContext";
import { useProgress } from "../Context/ProgressContext";
import { catalog } from "../Data/Catalog";

export default function Dashboard() {
  const { user } = useAuth();
  const { enrolledIds } = useEnrollment();
  const { percent } = useProgress();
  const firstName = user.name.split(" ")[0];

  const enrolled = catalog
    .filter((course) => enrolledIds.includes(course.id))
    .map((course) => ({ ...course, progress: percent(course.id) }));

  const completed = enrolled.filter((c) => c.progress === 100).length;
  const totalHours = enrolled.reduce((sum, c) => sum + c.hours, 0);

  return (
    <>
      <h1>Welcome back, {firstName} 👋</h1>
      <p className="muted">Pick up where you left off.</p>

      <section className="stats">
        <StatCard icon="📚" label="Enrolled Courses" value={enrolled.length} />
        <StatCard icon="✅" label="Completed" value={completed} />
        <StatCard icon="⏱️" label="Course Hours" value={totalHours} />
      </section>

      <h2>Continue Learning</h2>
      {enrolled.length === 0 ? (
        <div className="card empty-state">
          <p>You have not enrolled in any courses yet.</p>
          <Link to="/courses" className="btn-link">Browse courses →</Link>
        </div>
      ) : (
        <section className="course-grid">
          {enrolled.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </section>
      )}
    </>
  );
}