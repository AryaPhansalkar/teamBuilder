import React from 'react'
import { Navigate } from 'react-router-dom';
const Protectedroute = ({children}) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn")
  if (isLoggedIn!=="true") {
    return <Navigate to="/signup" replace />;
  }

  return children;
}

export default Protectedroute
