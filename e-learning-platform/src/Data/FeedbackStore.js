const KEY = "lh_feedback";

function readAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Returns a Promise so this can later be swapped for Firebase or Supabase
// without changing the Feedback page.
export function saveFeedback(entry) {
  return new Promise((resolve, reject) => {
    try {
      const record = { id: Date.now(), createdAt: new Date().toISOString(), ...entry };
      localStorage.setItem(KEY, JSON.stringify([record, ...readAll()]));
      resolve(record);
    } catch (err) {
      reject(err);
    }
  });
}

export function getFeedbackByEmail(email) {
  return readAll().filter((f) => f.email === email);
}