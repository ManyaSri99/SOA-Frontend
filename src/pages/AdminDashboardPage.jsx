import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const adminItems = [
  { to: '/admin/dashboard', label: 'Admin Dashboard' },
  { to: '/admin/users', label: 'User Management' },
  { to: '/admin/monitoring', label: 'System Monitoring' },
];

const AdminDashboardPage = () => (
  <div className="dashboard-shell">
    <Sidebar items={adminItems} />
    <div className="page-shell">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-meta"><span>Active Users</span></div><h3>1634</h3></div>
        <div className="stat-card"><div className="stat-meta"><span>Rooms online</span></div><h3>128</h3></div>
        <div className="stat-card"><div className="stat-meta"><span>System health</span></div><h3 className="tone-success">99.9%</h3></div>
      </div>
      <div className="card" style={{ padding: '22px' }}>
        <div className="section-header">
          <h3>Operations overview</h3>
          <Link to="/admin/monitoring">Open monitoring</Link>
        </div>
        <div className="chart-strip">
          <span style={{ height: '60%' }} />
          <span style={{ height: '70%' }} />
          <span style={{ height: '75%' }} />
          <span style={{ height: '84%' }} />
          <span style={{ height: '88%' }} />
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboardPage;
