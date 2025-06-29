import { Navigate } from 'react-router-dom';
const Protectedroute = ({children}) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  if (isLoggedIn!=="true") {
    return <Navigate to="/signup" replace />;
  }

  return children;
}

export default Protectedroute
