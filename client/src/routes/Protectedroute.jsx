import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosAPI from "../utils/axios.js";
import { useAuth } from "../context/authcontext"; // assuming you have this

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // get login state from context
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      // don’t check if still loading context
      if (loading) return;

      // if no user in context, skip API check
      if (!user) {
        setIsAuth(false);
        return;
      }

      try {
        const res = await axiosAPI.get("/api/builder-data", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // not logged in, but no crash
          setIsAuth(false);
        } else {
          console.error("Unexpected auth check error:", err);
          setIsAuth(false);
        }
      }
    };

    checkAuth();
  }, [user, loading]);

  if (loading || isAuth === null) return <p>Checking authentication...</p>;
  return isAuth ? <>{children}</> : <Navigate to="/signup" replace />;
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

