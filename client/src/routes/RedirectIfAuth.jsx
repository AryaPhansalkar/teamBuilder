import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const RedirectIfAuth = ({ children }) => {
  const { isAuth } = useAuth();
  if (isAuth === null) return <p>Loading...</p>;
  return isAuth ? <Navigate to="/builder" /> : <>{children}</> ;
};

export default RedirectIfAuth;