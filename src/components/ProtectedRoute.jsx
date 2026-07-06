import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({
  loginPath = '/login',
  requiredKey = 'cns_web_login',
  roleKey = 'cns_web_role',
  requiredRoles = [],
}) => {
  const location = useLocation();

  const isLoggedIn = localStorage.getItem(requiredKey) === 'true';
  const role = localStorage.getItem(roleKey);

  if (!isLoggedIn) {
    return (
      <Navigate
        to={loginPath}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
    return (
      <Navigate
        to={loginPath}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;