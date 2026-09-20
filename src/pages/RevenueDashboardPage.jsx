import Sidebar from '../components/Sidebar';

const managerItems = [
  { to: '/manager/dashboard', label: 'Overview' },
  { to: '/manager/rooms', label: 'Manage Rooms' },
  { to: '/manager/availability', label: 'Availability' },
  { to: '/manager/pricing', label: 'Pricing' },
  { to: '/manager/bookings', label: 'Bookings' },
  { to: '/manager/revenue', label: 'Revenue' },
  { to: '/manager/alerts', label: 'Alerts' },
];

const RevenueDashboardPage = () => (
  <div className="dashboard-shell">
    <Sidebar items={managerItems} />
    <div className="page-shell">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-meta"><span>Gross Revenue</span></div><h3>₹14.2L</h3></div>
        <div className="stat-card"><div className="stat-meta"><span>ADR</span></div><h3>₹4.9K</h3></div>
        <div className="stat-card"><div className="stat-meta"><span>Refunds</span></div><h3>₹82K</h3></div>
      </div>
      <div className="card" style={{ padding: '18px' }}>
        <h3>Revenue trend</h3>
        <div className="chart-strip">
          <span style={{ height: '35%' }} />
          <span style={{ height: '48%' }} />
          <span style={{ height: '60%' }} />
          <span style={{ height: '72%' }} />
          <span style={{ height: '88%' }} />
          <span style={{ height: '96%' }} />
        </div>
      </div>
    </div>
  </div>
);

export default RevenueDashboardPage;
