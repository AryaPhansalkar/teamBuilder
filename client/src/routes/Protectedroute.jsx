import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_API_BASE_URL + '/api/builder-data', {
          credentials: 'include',
        });

        if (res.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return <p>Checking authentication...</p>;
  return isAuth ? <>{children}</> : <Navigate to="/signup"/>;
};

export default ProtectedRoute;

