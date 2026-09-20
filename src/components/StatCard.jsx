const StatCard = ({ title, value, tone = 'primary', action }) => (
  <div className="stat-card">
    <div className="stat-meta">
      <span className={`tone-${tone}`}>{title}</span>
      {action ? <button type="button">{action}</button> : null}
    </div>
    <h3>{value}</h3>
  </div>
);

export default StatCard;
