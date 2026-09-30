import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const keyFor = (id) => `lh_profile_${id}`;
const EMPTY = {
  college: "", degree: "", branch: "", year: "", city: "",
  goal: "", interests: "", bio: "", github: "", linkedin: "",
};
const FIELDS = Object.keys(EMPTY);

const DEGREES = ["B.Tech", "B.E.", "B.Sc", "BCA", "M.Tech", "MCA", "Other"];
const YEARS = ["1st year", "2nd year", "3rd year", "4th year", "Graduated"];
const GOALS = ["Get a job", "Crack interviews", "Build projects", "Academic studies", "Learn for fun"];

function load(userId) {
  try {
    const raw = localStorage.getItem(keyFor(userId));
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState(() => load(user.id));
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const filled = FIELDS.filter((f) => form[f].trim() !== "").length;
  const completeness = Math.round((filled / FIELDS.length) * 100);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const linkOk = (v) => !v.trim() || /^https?:\/\/\S+\.\S+/.test(v.trim());
    if (!linkOk(form.github) || !linkOk(form.linkedin)) {
      return setError("Links must start with http:// or https://");
    }
    setError("");
    localStorage.setItem(keyFor(user.id), JSON.stringify(form));
    setSaved(true);
  };

  return (
    <>
      <h1>Your Profile</h1>
      <p className="muted">Tell us a little about yourself. Everything here is optional.</p>

      <div className="profile-layout">
        <aside className="card profile-summary">
          <div className="avatar large">{user.name.charAt(0).toUpperCase()}</div>
          <h2>{user.name}</h2>
          <p className="muted small">{user.email}</p>
          {form.college && <p className="small">{form.college}</p>}
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completeness}%` }} />
          </div>
          <p className="muted small">Profile {completeness}% complete</p>
        </aside>

        <form className="card" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label className="field full">
              College / University
              <input name="college" value={form.college} onChange={handleChange} placeholder="Your college" />
            </label>

            <label className="field">
              Degree
              <select name="degree" value={form.degree} onChange={handleChange}>
                <option value="">Select</option>
                {DEGREES.map((d) => <option key={d}>{d}</option>)}
              </select>
            </label>

            <label className="field">
              Branch / Major
              <input name="branch" value={form.branch} onChange={handleChange} placeholder="e.g. Computer Science" />
            </label>

            <label className="field">
              Year of study
              <select name="year" value={form.year} onChange={handleChange}>
                <option value="">Select</option>
                {YEARS.map((y) => <option key={y}>{y}</option>)}
              </select>
            </label>

            <label className="field">
              City
              <input name="city" value={form.city} onChange={handleChange} placeholder="Your city" />
            </label>

            <label className="field">
              Learning goal
              <select name="goal" value={form.goal} onChange={handleChange}>
                <option value="">Select</option>
                {GOALS.map((g) => <option key={g}>{g}</option>)}
              </select>
            </label>

            <label className="field">
              Interests
              <input name="interests" value={form.interests} onChange={handleChange} placeholder="Web dev, DSA, AI..." />
            </label>

            <label className="field full">
              Short bio
              <textarea name="bio" value={form.bio} onChange={handleChange} maxLength={200} placeholder="A line or two about you (max 200 characters)" />
            </label>

            <label className="field">
              GitHub link
              <input name="github" value={form.github} onChange={handleChange} placeholder="https://github.com/username" />
            </label>

            <label className="field">
              LinkedIn link
              <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
            </label>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}
          {saved && <p className="form-success">Profile saved ✓</p>}

          <button className="btn-primary fit" type="submit">Save profile</button>
          <p className="muted small" style={{ marginTop: 12 }}>
            Your details are stored only in this browser.
          </p>
        </form>
      </div>
    </>
  );
}