// import React from 'react'
// import Teamcard from '../assets/Card.jsx'
// import Defence from '../assets/Defence.jsx'
// import Coverage from '../assets/Coverage.jsx'
// const Dashboard = () => {
//    const userinfo = JSON.parse(localStorage.getItem('user'))
//   const typeColors = {
//   Bug: 'bg-lime-400',
//   Dark: 'bg-gray-800 text-white',
//   Dragon: 'bg-indigo-600 text-white',
//   Electric: 'bg-yellow-300',
//   Fairy: 'bg-pink-300',
//   Fighting: 'bg-red-400 text-black',
//   Fire: 'bg-orange-500 text-white',
//   Flying: 'bg-purple-300',
//   Ghost: 'bg-purple-800 text-white',
//   Grass: 'bg-green-400',
//   Ground: 'bg-amber-300 text-black',
//   Ice: 'bg-cyan-100',
//   Normal: 'bg-gray-300',
//   Poison: 'bg-purple-500 text-white',
//   Psychic: 'bg-pink-500',
//   Rock: 'bg-yellow-600 text-white',
//   Steel: 'bg-slate-300 text-black',
//   Water: 'bg-blue-400',
// };
//     const types = [
//     "Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting",
//     "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice",
//     "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"
//   ];



// const TypeGrid = ({ title }) => (
//   <div className="bg-white p-4 rounded-2xl shadow-md w-full">
//     <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
//     <div className="grid grid-cols-6 gap-2 text-sm">
//       {types.map((type) => (
//         <div
//           key={type}
//           className={`flex justify-between items-center px-2 py-1 rounded ${typeColors[type] || 'bg-gray-100'}`}
//         >
//           <span>{type}</span>
//           <span className="font-semibold">0</span>
//         </div>
//       ))}
//     </div>
//   </div>
//   );
//   return (
//     <div>
//       <div className="flex items-center justify-between px-10 pt-4">
      
//       <div className="w-1/3"></div>

     
//       <div className="w-1/3 flex justify-center">
//         <h1 className="text-black text-5xl">My Pokemon Team</h1>
//       </div>

//       <div className="w-1/3 flex justify-end space-x-8">
//         <div className="text-black text-lg">{userinfo.username}</div>
//       </div>
//      </div>
//       <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-5">
//         {[...Array(6)].map((_, i) => (
//           <Teamcard key={i} />
//         ))}
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <Defence title="Team Defence" />
//         <Coverage title="Team Type Coverage" />
//       </div>
//     </div>
//   )
// }

// export default Dashboard

import React from 'react'
import Teamcard from '../assets/Card.jsx'
import Defence from '../assets/Defence.jsx'
import Coverage from '../assets/Coverage.jsx'

const Dashboard = () => {
  const userinfo = JSON.parse(localStorage.getItem('user'))

  return (
    <div className="px-4 py-6">

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:px-10">
        <div className="w-full sm:w-1/3 text-center sm:text-left"></div>

        <div className="w-full sm:w-1/3 flex justify-center">
          <h1 className="text-black text-3xl sm:text-5xl font-bold text-center">My Pokémon Team</h1>
        </div>

        <div className="w-full sm:w-1/3 flex justify-center sm:justify-end space-x-4">
          <div className="text-black text-md sm:text-lg">{userinfo?.username}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-8">
        {[...Array(6)].map((_, i) => (
          <Teamcard key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Defence title="Team Defence" />
        <Coverage title="Team Type Coverage" />
      </div>
    </div>
  );
};

export default Dashboard;

