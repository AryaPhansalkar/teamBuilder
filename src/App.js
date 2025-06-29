import './App.css';
import './index.css';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Protectedroute from './routes/Protectedroute';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Welcome/>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/builder",
        element: (
          <Protectedroute>
            <Dashboard />
          </Protectedroute>
        )
      },  
      
    ]
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

