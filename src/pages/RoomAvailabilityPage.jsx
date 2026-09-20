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

const RoomAvailabilityPage = () => (
  <div className="dashboard-shell">
    <Sidebar items={managerItems} />
    <div className="page-shell">
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-meta"><span>Total rooms</span></div><h3>128</h3></div>
        <div className="stat-card"><div className="stat-meta"><span>Available</span></div><h3 className="tone-success">72</h3></div>
        <div className="stat-card"><div className="stat-meta"><span>Held</span></div><h3 className="tone-warning">14</h3></div>
        <div className="stat-card"><div className="stat-meta"><span>Booked</span></div><h3 className="tone-danger">42</h3></div>
      </div>
      <div className="card" style={{ padding: '18px' }}>
        <h3>Live inventory</h3>
        <div className="chart-strip">
          <span style={{ height: '72%' }} />
          <span style={{ height: '66%' }} />
          <span style={{ height: '44%' }} />
          <span style={{ height: '24%' }} />
          <span style={{ height: '58%' }} />
        </div>
      </div>
    </div>
  </div>
);

export default RoomAvailabilityPage;
