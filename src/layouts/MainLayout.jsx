import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => (
  <div className="app-shell">
    <Navbar />
    <main className="page-content">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
