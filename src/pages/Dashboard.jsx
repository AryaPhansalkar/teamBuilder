import Teamcard from '../components/Card.jsx'
import Defence from '../components/Defence.jsx'
import Coverage from '../components/Coverage.jsx'
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const userinfo = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  const logoutclick = () => {
    localStorage.setItem('isLoggedIn', 'false');
    alert("You have been logged out successfully");
    navigate('/');
  }

  return (
    <div className="px-4 py-6">

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:px-10">
        <div className="w-full sm:w-1/3 text-center sm:text-left"></div>

        <div className="w-full sm:w-1/3 flex justify-center">
          <h1 className="text-black text-3xl sm:text-5xl font-bold text-center">My Pokémon Team</h1>
        </div>

        <div className="w-full sm:w-1/3 flex justify-center sm:justify-end space-x-4">
          <div className="text-black text-md sm:text-lg">{userinfo?.username}</div>
          <button onClick={logoutclick} className="text-white border-red-600 bg-red-600 p-2 pl-4 pr-4 rounded-lg">Logout</button>
        </div>
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-8">
        {[...Array(6)].map((_, i) => (
          <Teamcard key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Defence title="Team Defence" />
        <Coverage title="Team Weakness" />
      </div>
    </div>
  );
};

export default Dashboard;

