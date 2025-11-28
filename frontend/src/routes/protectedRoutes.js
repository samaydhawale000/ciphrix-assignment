import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {

  const tokenName = process.env.REACT_APP_PUBLIC_TOKENNAME
  const token = sessionStorage.getItem(tokenName || "moilToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoutes;
