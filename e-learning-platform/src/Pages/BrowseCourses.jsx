import { useMemo, useState } from "react";
import CatalogCard from "../Components/CatalogCard";
import { catalog, categories } from "../Data/Catalog";
import { useSearchParams } from "react-router-dom";

export default function BrowseCourses() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const setQuery = (value) => setParams(value ? { q: value } : {}, { replace: true });
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.filter((course) => {
      const matchesCategory = category === "All" || course.category === category;
      const matchesQuery =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.topics.some((topic) => topic.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <div className="page-header">
        <h1>Browse Courses</h1>
        <p className="muted">Pick the courses you want to learn.</p>
      </div>

      <div className="filters">
        <input
          className="search-input"
          type="text"
          placeholder="Search by course or topic..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="chips">
          {categories.map((c) => (
            <button
              key={c}
              className={"chip" + (category === c ? " active" : "")}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="muted small result-count">
        Showing {filtered.length} of {catalog.length} courses
      </p>

      {filtered.length === 0 ? (
        <div className="card empty-state">
          <p>No courses match your search.</p>
        </div>
      ) : (
        <section className="course-grid">
          {filtered.map((course) => (
            <CatalogCard key={course.id} course={course} />
          ))}
        </section>
      )}
    </>
  );
}