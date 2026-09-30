import { Link } from "react-router-dom";
import StatCard from "../Components/StatCard";
import { catalog } from "../Data/Catalog";
import { getContent } from "../Data/CourseContext";
import { useEnrollment } from "../Context/EnrollmentContext";
import { useProgress } from "../Context/ProgressContext";

export default function Progress() {
  const { enrolledIds } = useEnrollment();
  const { percent, doneNotes, results } = useProgress();
  const enrolled = catalog.filter((c) => enrolledIds.includes(c.id));

  const rows = enrolled.map((course) => {
    const content = getContent(course.id);
    const attempted = Object.values(results(course.id));
    return {
      course,
      progress: percent(course.id),
      notesDone: doneNotes(course.id).length,
      notesTotal: content.notes.length,
      testsDone: attempted.length,
      testsTotal: content.tests.length,
      bestScore: attempted.reduce((s, t) => s + t.best, 0),
      maxScore: attempted.reduce((s, t) => s + t.total, 0),
    };
  });

  const avgProgress = rows.length
    ? Math.round(rows.reduce((s, r) => s + r.progress, 0) / rows.length)
    : 0;
  const completed = rows.filter((r) => r.progress === 100).length;
  const testsTaken = rows.reduce((s, r) => s + r.testsDone, 0);
  const totalBest = rows.reduce((s, r) => s + r.bestScore, 0);
  const totalMax = rows.reduce((s, r) => s + r.maxScore, 0);
  const avgScore = totalMax ? Math.round((totalBest / totalMax) * 100) : 0;

  return (
    <>
      <h1>Your Progress</h1>
      <p className="muted">Track how you are doing across all your courses.</p>

      <section className="stats">
        <StatCard icon="📈" label="Average Progress" value={`${avgProgress}%`} />
        <StatCard icon="🏆" label="Courses Completed" value={completed} />
        <StatCard icon="📝" label="Tests Taken" value={testsTaken} />
        <StatCard icon="🎯" label="Average Test Score" value={`${avgScore}%`} />
      </section>

      <h2>Course breakdown</h2>
      {rows.length === 0 ? (
        <div className="card empty-state">
          <p>Enroll in a course to start tracking progress.</p>
          <Link to="/courses" className="btn-link">Browse courses →</Link>
        </div>
      ) : (
        <div className="card table-card">
          <table className="progress-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Notes read</th>
                <th>Tests taken</th>
                <th>Best score</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.course.id}>
                  <td><Link to={`/courses/${r.course.id}`}>{r.course.emoji} {r.course.title}</Link></td>
                  <td>{r.notesDone}/{r.notesTotal}</td>
                  <td>{r.testsDone}/{r.testsTotal}</td>
                  <td>{r.maxScore ? `${r.bestScore}/${r.maxScore}` : "—"}</td>
                  <td>
                    <span className="mini-bar">
                      <span className="progress-fill" style={{ width: `${r.progress}%`, display: "block" }} />
                    </span>
                    {r.progress}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}