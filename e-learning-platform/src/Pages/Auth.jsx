import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Auth() {
  const { user, login, signup } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const isSignup = mode === "signup";

  // already logged in? go straight to the dashboard
  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const switchMode = (next) => {
    setMode(next);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup && form.name.trim().length < 2) return setError("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Enter a valid email address.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");

    const result = isSignup ? signup(form) : login(form);
    if (!result.ok) setError(result.error);
    // on success, `user` changes and the redirect above takes over
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">LearnHub</div>

        <div className={"auth-tabs " + mode}>
          <span className="tab-pill" />
          <button type="button" className={!isSignup ? "active" : ""} onClick={() => switchMode("login")}>
            Login
          </button>
          <button type="button" className={isSignup ? "active" : ""} onClick={() => switchMode("signup")}>
            Sign Up
          </button>
        </div>

        <div className="auth-heading" key={mode}>
          <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
          <p className="muted">
            {isSignup ? "Start learning in minutes." : "Log in to continue learning."}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* name field stays mounted; its height animates open/closed */}
          <div className={"collapse" + (isSignup ? " open" : "")}>
            <div className="collapse-inner">
              <label className="field">
                Full name
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  disabled={!isSignup}
                />
              </label>
            </div>
          </div>

          <label className="field">
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label className="field">
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              autoComplete={isSignup ? "new-password" : "current-password"}
            />
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button className="btn-primary" type="submit">
            {isSignup ? "Create account" : "Log in"}
          </button>
        </form>

        <p className="auth-switch muted">
          {isSignup ? "Already have an account? " : "New here? "}
          <button type="button" className="link-btn" onClick={() => switchMode(isSignup ? "login" : "signup")}>
            {isSignup ? "Log in" : "Create an account"}
          </button>
        </p>
      </div>
    </div>
  );
}