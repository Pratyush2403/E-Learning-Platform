export default function StatCard({ label, value, icon }) {
  return (
    <div className="card stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}