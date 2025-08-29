import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const RedirectIfAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/builder" /> : children;
};


export default RedirectIfAuth;