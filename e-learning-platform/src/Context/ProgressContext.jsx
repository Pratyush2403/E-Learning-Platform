import { createContext, useContext, useState, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { getContent } from "../Data/CourseContext";

const ProgressContext = createContext(null);
const EMPTY = { notes: {}, tests: {} };
const keyFor = (userId) => `lh_progress_${userId}`;

function load(userId) {
  try {
    const raw = localStorage.getItem(keyFor(userId));
    return raw ? JSON.parse(raw) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function ProgressStore({ userId, children }) {
  const [data, setData] = useState(() => (userId ? load(userId) : EMPTY));

  const value = useMemo(() => {
    const persist = (next) => {
      setData(next);
      if (userId) localStorage.setItem(keyFor(userId), JSON.stringify(next));
    };
    const doneNotes = (courseId) => data.notes[courseId] || [];
    const results = (courseId) => data.tests[courseId] || {};

    return {
      doneNotes,
      results,
      toggleNote: (courseId, noteId) => {
        const current = doneNotes(courseId);
        const updated = current.includes(noteId)
          ? current.filter((n) => n !== noteId)
          : [...current, noteId];
        persist({ ...data, notes: { ...data.notes, [courseId]: updated } });
      },
      saveTestResult: (courseId, testId, score, total) => {
        const previous = results(courseId)[testId];
        const entry = {
          last: score,
          best: previous ? Math.max(previous.best, score) : score,
          total,
          attempts: previous ? previous.attempts + 1 : 1,
        };
        persist({
          ...data,
          tests: { ...data.tests, [courseId]: { ...results(courseId), [testId]: entry } },
        });
      },
      // a course is 100% when every note is read and every test attempted
      percent: (courseId) => {
        const content = getContent(courseId);
        const totalItems = content.notes.length + content.tests.length;
        if (totalItems === 0) return 0;
        const done = doneNotes(courseId).length + Object.keys(results(courseId)).length;
        return Math.min(100, Math.round((done / totalItems) * 100));
      },
    };
  }, [data, userId]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  return (
    <ProgressStore key={user ? user.id : "guest"} userId={user ? user.id : null}>
      {children}
    </ProgressStore>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}