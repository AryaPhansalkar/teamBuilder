import './App.css';
import './index.css';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Protectedroute from './routes/Protectedroute';
import { useAuth } from './context/authcontext';
import RedirectIfAuth from './routes/RedirectIfAuth';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

function App() {
const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />
      // <RedirectIfAuth>
      // </RedirectIfAuth>
    
  },
  {
    path: '/login',
    element: <Login />
    // element: (
    //   <RedirectIfAuth>
    //     <Login />
    //   </RedirectIfAuth>
    // )
  },
  {
    path: '/signup',
    element: <Signup />
    // element: (
    //   <RedirectIfAuth>
    //     <Signup />
    //   </RedirectIfAuth>
    // )
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

