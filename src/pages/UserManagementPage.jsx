import Sidebar from '../components/Sidebar';

const adminItems = [
  { to: '/admin/dashboard', label: 'Admin Dashboard' },
  { to: '/admin/users', label: 'User Management' },
  { to: '/admin/monitoring', label: 'System Monitoring' },
];

const UserManagementPage = () => (
  <div className="dashboard-shell">
    <Sidebar items={adminItems} />
    <div className="page-shell">
      <div className="card" style={{ padding: '22px' }}>
        <h2>User management</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Guest User</td><td>guest@grandvista.com</td><td>Customer</td><td>Active</td></tr>
            <tr><td>Manager One</td><td>manager@grandvista.com</td><td>HOTEL_MANAGER</td><td>Active</td></tr>
            <tr><td>Admin User</td><td>admin@grandvista.com</td><td>ADMIN</td><td>Active</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default UserManagementPage;
