import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { saveFeedback, getFeedbackByEmail } from "../Data/FeedbackStore";

const CATEGORIES = ["Course content", "Design & usability", "Bug report", "Feature request", "Other"];

export default function Feedback() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    category: CATEGORIES[0],
    rating: 0,
    message: "",
    recommend: true,
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState(() => getFeedbackByEmail(user.email));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.rating === 0) return setError("Please choose a rating.");
    if (form.message.trim().length < 10) return setError("Please write at least 10 characters.");

    try {
      await saveFeedback({ ...form, message: form.message.trim() });
      setHistory(getFeedbackByEmail(user.email));
      setError("");
      setSubmitted(true);
    } catch {
      setError("Could not save your feedback. Please try again.");
    }
  };

  const sendAnother = () => {
    setForm({ ...form, rating: 0, message: "", category: CATEGORIES[0] });
    setSubmitted(false);
  };

  return (
    <>
      <h1>Feedback</h1>
      <p className="muted">Tell us what is working and what we should improve.</p>

      <div className="feedback-layout">
        {submitted ? (
          <div className="card empty-state">
            <h2 style={{ marginTop: 0 }}>Thank you! 🎉</h2>
            <p className="muted">Your feedback has been saved.</p>
            <button className="btn-primary fit" style={{ marginTop: 16 }} onClick={sendAnother}>
              Send more feedback
            </button>
          </div>
        ) : (
          <form className="card" onSubmit={handleSubmit} noValidate>
            <label className="field">
              Name
              <input name="name" value={form.name} readOnly />
            </label>
            <label className="field">
              Email
              <input name="email" value={form.email} readOnly />
            </label>

            <label className="field">
              Category
              <select name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>

            <div className="field">
              Rating
              <div className="stars" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    className={"star" + (n <= form.rating ? " on" : "")}
                    onClick={() => setForm({ ...form, rating: n })}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <label className="field">
              Your feedback
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What did you like? What could be better?"
              />
            </label>

            <label className="check-row">
              <input type="checkbox" name="recommend" checked={form.recommend} onChange={handleChange} />
              I would recommend LearnHub to a friend
            </label>

            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="btn-primary fit" type="submit">Submit feedback</button>
          </form>
        )}

        {history.length > 0 && (
          <div className="card" style={{ marginTop: 20 }}>
            <h3>Your previous feedback</h3>
            {history.slice(0, 5).map((f) => (
              <div key={f.id} className="history-item">
                <div className="history-meta">
                  <span>{f.category} · {"★".repeat(f.rating)}</span>
                  <span>{new Date(f.createdAt).toLocaleDateString()}</span>
                </div>
                <p>{f.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}