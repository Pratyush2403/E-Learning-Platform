import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: "🏠" },
  { to: "/courses", label: "Browse Courses", icon: "📚" },
  { to: "/my-courses", label: "My Courses", icon: "🎓" },
  { to: "/progress", label: "Progress", icon: "📈" },
  { to: "/profile", label: "Profile", icon: "👤" },
  { to: "/feedback", label: "Feedback", icon: "💬" },
  { to: "/developer", label: "About Developer", icon: "🧑‍💻" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={"sidebar" + (open ? " open" : "")}>
      <div className="sidebar-head">
        <div className="logo">LearnHub</div>
        <button className="icon-btn sidebar-close" onClick={onClose} aria-label="Close menu">
          ✕
        </button>
      </div>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            onClick={onClose}
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
            <span>{link.icon}</span> {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}