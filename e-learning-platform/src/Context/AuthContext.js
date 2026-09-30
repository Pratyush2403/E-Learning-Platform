import { createContext, useContext, useState, useCallback, useMemo } from "react";

const AuthContext = createContext(null);
const USERS_KEY = "lh_users";
const SESSION_KEY = "lh_session";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  // lazy initial state: localStorage is read once, so refresh keeps you logged in
  const [user, setUser] = useState(() => readJSON(SESSION_KEY, null));

  const startSession = (account) => {
    const session = { id: account.id, name: account.name, email: account.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  };

  const signup = useCallback(({ name, email, password }) => {
    const users = readJSON(USERS_KEY, []);
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: "An account with this email already exists." };
    }

    const newUser = { id: Date.now(), name: name.trim(), email: normalizedEmail, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    startSession(newUser);
    return { ok: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = readJSON(USERS_KEY, []);
    const normalizedEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email === normalizedEmail && u.password === password);

    if (!found) {
      return { ok: false, error: "Incorrect email or password." };
    }
    startSession(found);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  // memoized so consumers only re-render when something actually changes
  const value = useMemo(() => ({ user, signup, login, logout }), [user, signup, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}