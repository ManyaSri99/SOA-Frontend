import Sidebar from '../components/Sidebar';
import DemandAlert from '../components/DemandAlert';

const managerItems = [
  { to: '/manager/dashboard', label: 'Overview' },
  { to: '/manager/rooms', label: 'Manage Rooms' },
  { to: '/manager/availability', label: 'Availability' },
  { to: '/manager/pricing', label: 'Pricing' },
  { to: '/manager/bookings', label: 'Bookings' },
  { to: '/manager/revenue', label: 'Revenue' },
  { to: '/manager/alerts', label: 'Alerts' },
];

const AlertsPage = () => (
  <div className="dashboard-shell">
    <Sidebar items={managerItems} />
    <div className="page-shell">
      <div className="card" style={{ padding: '22px' }}>
        <h2>Demand alerts</h2>
        <DemandAlert type="HIGH DEMAND" message="Luxury suites are selling at 92% demand pace." />
        <DemandAlert type="LOW INVENTORY" message="Inventory for Friday is below the recommended threshold." />
        <DemandAlert type="PAYMENT FAILED" message="Payment retries are required for 2 reservations." />
        <DemandAlert type="ROOM HOLD EXPIRING" message="One room hold expires in under 3 minutes." />
        <DemandAlert type="ROOM HOLD EXPIRED" message="2 temporary holds were released automatically." />
      </div>
    </div>
  </div>
);

export default AlertsPage;
