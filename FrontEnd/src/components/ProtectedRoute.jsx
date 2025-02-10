import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ signer, children }) => {
  const location = useLocation(); // Get the current path

  if (!signer) {
    return <Navigate to={`/connect-wallet?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
