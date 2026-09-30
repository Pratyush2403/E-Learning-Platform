import { createContext, useContext, useState, useMemo } from "react";
import { useAuth } from "./AuthContext";

const EnrollmentContext = createContext(null);

const keyFor = (userId) => `lh_enrollments_${userId}`;

function load(userId) {
  try {
    const raw = localStorage.getItem(keyFor(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function EnrollmentStore({ userId, children }) {
  // lazy initial state: read localStorage once, no flicker on first render
  const [enrolledIds, setEnrolledIds] = useState(() => (userId ? load(userId) : []));

  const value = useMemo(() => {
    const persist = (ids) => {
      setEnrolledIds(ids);
      if (userId) localStorage.setItem(keyFor(userId), JSON.stringify(ids));
    };
    return {
      enrolledIds,
      isEnrolled: (id) => enrolledIds.includes(id),
      enroll: (id) => {
        if (!enrolledIds.includes(id)) persist([...enrolledIds, id]);
      },
      unenroll: (id) => persist(enrolledIds.filter((x) => x !== id)),
    };
  }, [enrolledIds, userId]);

  return <EnrollmentContext.Provider value={value}>{children}</EnrollmentContext.Provider>;
}

export function EnrollmentProvider({ children }) {
  const { user } = useAuth();
  // the key resets the store when a different user logs in
  return (
    <EnrollmentStore key={user ? user.id : "guest"} userId={user ? user.id : null}>
      {children}
    </EnrollmentStore>
  );
}

export function useEnrollment() {
  return useContext(EnrollmentContext);
}