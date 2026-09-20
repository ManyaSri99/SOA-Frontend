import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const rolePages = {
  CUSTOMER: ['customer'],
  HOTEL_MANAGER: ['manager'],
  ADMIN: ['admin'],
};

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

export const routeForRole = (role) => {
  const prefix = rolePages[role]?.[0] ?? 'customer';
  return `/${prefix}`;
};
