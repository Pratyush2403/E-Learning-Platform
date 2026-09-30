import { useAuth } from "../Context/AuthContext";
import SearchBox from "./SearchBox";
import ThemeToggle from "./ThemeToggle";

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <button className="icon-btn menu-btn" onClick={onMenuClick} aria-label="Open menu">
        ☰
      </button>
      <SearchBox />
      <div className="user">
        <ThemeToggle />
        <span className="user-name">{user.name}</span>
        <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
        <button className="logout-btn" onClick={logout}>Log out</button>
      </div>
    </header>
  );
}