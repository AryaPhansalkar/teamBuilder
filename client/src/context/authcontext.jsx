import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL + '/api/builder-data', {
        withCredentials: true
      });
      setIsAuth(res.status === 200);
    } catch {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
