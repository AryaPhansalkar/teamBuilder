import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosAPI from "../utils/axios.js";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosAPI.get("/api/builder-data", { withCredentials: true });
        setIsAuth(res.status === 200);
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  // While checking, render nothing or a loader — no redirect yet
  if (isAuth === null) {
    return <p>Checking authentication...</p>;
  }

  // If not authenticated, redirect once (replace prevents loop)
  if (!isAuth) {
    return <Navigate to="/signup" replace />;
  }

  // Authenticated — render children
  return <>{children}</>;
};

export default ProtectedRoute;





// import { Navigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axiosAPI from '../utils/axios.js';

// const ProtectedRoute = ({ children }) => {
//   const [isAuth, setIsAuth] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axiosAPI.get('/api/builder-data');
//         if (res.status === 200) {
//           setIsAuth(true);
//         } else {
//           setIsAuth(false);
//         }
//       } catch (err) {
//         console.log("protected routes error");
//         console.error('Auth check failed:', err);
//         setIsAuth(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   if (isAuth === null) return <p>Checking authentication...</p>;
//   return isAuth ? <>{children}</> : <Navigate to="/signup" />;
// };

// export default ProtectedRoute;

