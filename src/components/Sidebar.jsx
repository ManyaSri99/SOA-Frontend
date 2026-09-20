import { NavLink } from 'react-router-dom';

const Sidebar = ({ items = [] }) => (
  <aside className="sidebar">
    {items.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <span>{item.label}</span>
      </NavLink>
    ))}
  </aside>
);

export default Sidebar;
