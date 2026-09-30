import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { catalog } from "../Data/Catalog";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return catalog
      .filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.topics.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [query]);

  // close the dropdown when clicking anywhere else
  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const goToCourse = (id) => {
    setOpen(false);
    setQuery("");
    navigate(`/courses/${id}`);
  };

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    navigate(`/courses?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="search-wrap" ref={wrapRef}>
      <form onSubmit={submit} role="search">
        <input
          className="search"
          type="search"
          placeholder="Search courses..."
          aria-label="Search courses"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        />
      </form>

      {open && query.trim() && (
        <ul className="search-results">
          {results.length === 0 ? (
            <li className="search-empty">No courses found</li>
          ) : (
            <>
              {results.map((c) => (
                <li key={c.id}>
                  <button type="button" onClick={() => goToCourse(c.id)}>
                    <span>{c.emoji}</span>
                    <span>
                      <strong>{c.title}</strong>
                      <br />
                      <span className="muted small">{c.category} · {c.level}</span>
                    </span>
                  </button>
                </li>
              ))}
              <li className="search-all">
                <button type="button" onClick={submit}>
                  See all results for {query.trim()}
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}