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

const PricingDashboardPage = () => (
  <div className="dashboard-shell">
    <Sidebar items={managerItems} />
    <div className="page-shell">
      <div className="card" style={{ padding: '22px' }}>
        <h2>Dynamic pricing</h2>
        <div className="line-item"><span>Base Price</span><strong>₹3000</strong></div>
        <div className="line-item"><span>Occupancy Adjustment</span><strong>87%</strong></div>
        <div className="line-item"><span>Demand Adjustment</span><strong>HIGH</strong></div>
        <div className="line-item"><span>Weekend Adjustment</span><strong>+18%</strong></div>
        <div className="line-item total-line"><span>Final Price</span><strong>₹4200/night</strong></div>
      </div>
    </div>
  </div>
);

export default PricingDashboardPage;
