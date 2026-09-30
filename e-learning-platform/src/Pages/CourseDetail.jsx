import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Quiz from "../Components/Quiz";
import { catalog } from "../Data/Catalog";
import { getContent } from "../Data/CourseContext";
import { useEnrollment } from "../Context/EnrollmentContext";
import { useProgress } from "../Context/ProgressContext";

const TABS = ["Notes", "Videos", "Questions", "Tests"];

export default function CourseDetail() {
  const { id } = useParams();
  const course = catalog.find((c) => c.id === Number(id));
  const [tab, setTab] = useState("Notes");
  const [activeTest, setActiveTest] = useState(null);
  const { isEnrolled, enroll, unenroll } = useEnrollment();
  const { doneNotes, toggleNote, results, saveTestResult, percent } = useProgress();

  if (!course) {
    return (
      <div className="card empty-state">
        <p>Course not found.</p>
        <Link to="/courses" className="btn-link">Back to courses</Link>
      </div>
    );
  }

  const content = getContent(course.id);
  const enrolled = isEnrolled(course.id);
  const hasContent = content.notes.length > 0;
  const done = doneNotes(course.id);
  const testResults = results(course.id);
  const progress = percent(course.id);

  return (
    <>
      <Link to="/courses" className="back-link">← All courses</Link>

      <div className="card course-header">
        <div className="course-thumb big">{course.emoji}</div>
        <div className="course-header-info">
          <h1>{course.title}</h1>
          <p className="muted">{course.instructor} · {course.hours} hrs · {course.level}</p>
          <p>{course.description}</p>
          {enrolled && (
            <>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p className="muted small">{progress}% complete</p>
            </>
          )}
                    {enrolled && progress === 100 && (
            <Link to={`/certificate/${course.id}`} className="btn-primary fit link-as-btn">
              🎓 View certificate
            </Link>
          )}
        </div>
        <button
          className={enrolled ? "btn-outline fit" : "btn-primary fit"}
          onClick={() => (enrolled ? unenroll(course.id) : enroll(course.id))}
        >
          {enrolled ? "Unenroll" : "Enroll now"}
        </button>
      </div>

      {!enrolled ? (
        <div className="card locked stack">
          <h2>What you will learn</h2>
          <ul className="topic-list">
            {course.topics.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <p className="muted">Enroll to unlock notes, videos, practice questions and tests.</p>
        </div>
      ) : !hasContent ? (
        <div className="card empty-state stack">
          <p>Content for this course is coming soon.</p>
        </div>
      ) : (
        <>
          <div className="tabs">
            {TABS.map((t) => (
              <button
                key={t}
                className={"tab" + (tab === t ? " active" : "")}
                onClick={() => { setTab(t); setActiveTest(null); }}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "Notes" && (
            <section className="stack">
              {content.notes.map((note) => {
                const isDone = done.includes(note.id);
                return (
                  <article key={note.id} className="card note-card">
                    <h3>{note.title}</h3>
                    <ul>
                      {note.points.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                    <button
                      className={isDone ? "btn-outline fit" : "btn-primary fit"}
                      onClick={() => toggleNote(course.id, note.id)}
                    >
                      {isDone ? "✓ Marked as read" : "Mark as read"}
                    </button>
                  </article>
                );
              })}
            </section>
          )}

          {tab === "Videos" && (
            <section className="stack">
              {content.videos.map((v) => (
                <a
                  key={v.id}
                  className="card video-card"
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(v.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="play">▶</span>
                  <span>
                    <strong>{v.title}</strong>
                    <br />
                    <span className="muted small">Opens a YouTube search in a new tab</span>
                  </span>
                </a>
              ))}
            </section>
          )}

          {tab === "Questions" && (
            <section className="stack">
              {content.questions.map((item, i) => (
                <details key={item.id} className="card qa">
                  <summary>{i + 1}. {item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </section>
          )}

          {tab === "Tests" && (
            activeTest ? (
              <div className="stack">
                <Quiz
                  key={activeTest.id}
                  test={activeTest}
                  onFinish={(score, total) => saveTestResult(course.id, activeTest.id, score, total)}
                  onExit={() => setActiveTest(null)}
                />
              </div>
            ) : (
              <section className="stack">
                {content.tests.map((test) => {
                  const r = testResults[test.id];
                  return (
                    <div key={test.id} className="card test-row">
                      <div>
                        <h3>{test.title}</h3>
                        <p className="muted small">
                          {test.questions.length} questions · about {test.minutes} min
                        </p>
                        {r && (
                          <p className="small">
                            Best score: <strong>{r.best}/{r.total}</strong> · Attempts: {r.attempts}
                          </p>
                        )}
                      </div>
                      <button className="btn-primary fit" onClick={() => setActiveTest(test)}>
                        {r ? "Retake" : "Start test"}
                      </button>
                    </div>
                  );
                })}
              </section>
            )
          )}
        </>
      )}
    </>
  );
}