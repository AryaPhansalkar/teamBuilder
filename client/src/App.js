import './App.css';
import './index.css';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Protectedroute from './routes/Protectedroute';
import AuthCallback from "./pages/AuthCallback";
import { useAuth } from './context/authcontext';
import RedirectIfAuth from './routes/RedirectIfAuth';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

function App() {
const router = createBrowserRouter([
  {
    path: '/',
    element:<Welcome /> 
  },
  {
    path: '/login',
    element: <Login />
    // (
    //   <RedirectIfAuth>
    //     <Login />
    //   </RedirectIfAuth>
    // )
  },
  {
    path: '/signup',
    element: <Signup />
    // (
    //   <RedirectIfAuth>
    //     <Signup />
    //   </RedirectIfAuth>
    // )
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />
  },
  {
    path: '/builder',
    element: (
      <Protectedroute>
        <Dashboard />
      </Protectedroute>
    )
  }
]);


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

