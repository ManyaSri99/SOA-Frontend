import Sidebar from '../components/Sidebar';

const adminItems = [
  { to: '/admin/dashboard', label: 'Admin Dashboard' },
  { to: '/admin/users', label: 'User Management' },
  { to: '/admin/monitoring', label: 'System Monitoring' },
];

const SystemMonitoringPage = () => (
  <div className="dashboard-shell">
    <Sidebar items={adminItems} />
    <div className="page-shell">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-meta"><span>API Gateway</span></div><h3 className="tone-success">Healthy</h3></div>
        <div className="stat-card"><div className="stat-meta"><span>Auth Service</span></div><h3 className="tone-success">99.9%</h3></div>
        <div className="stat-card"><div className="stat-meta"><span>Booking Service</span></div><h3 className="tone-warning">Latency 650ms</h3></div>
      </div>
      <div className="card" style={{ padding: '22px' }}>
        <h2>System monitoring</h2>
        <div className="chart-strip">
          <span style={{ height: '40%' }} />
          <span style={{ height: '58%' }} />
          <span style={{ height: '72%' }} />
          <span style={{ height: '64%' }} />
          <span style={{ height: '92%' }} />
        </div>
      </div>
    </div>
  </div>
);

export default SystemMonitoringPage;
