import React from 'react'
import { useState } from 'react';
 const typeColors = {
  Bug: 'bg-lime-400',
  Dark: 'bg-gray-800 text-white',
  Dragon: 'bg-indigo-600 text-white',
  Electric: 'bg-yellow-300',
  Fairy: 'bg-pink-300',
  Fighting: 'bg-red-400 text-black',
  Fire: 'bg-orange-500 text-white',
  Flying: 'bg-purple-300',
  Ghost: 'bg-purple-800 text-white',
  Grass: 'bg-green-400',
  Ground: 'bg-amber-300 text-black',
  Ice: 'bg-cyan-100',
  Normal: 'bg-gray-300',
  Poison: 'bg-purple-500 text-white',
  Psychic: 'bg-pink-500',
  Rock: 'bg-yellow-600 text-white',
  Steel: 'bg-slate-300 text-black',
  Water: 'bg-blue-400',
};
    const types = [
    "Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting",
    "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice",
    "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"
  ];
const Coverage = ({title}) => {
  const [weakness,setWeakness] = useState(0);
  return (
    <div>
      <div>
      <div className="bg-white p-4 rounded-2xl shadow-md w-full">
    <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
    <div className="grid grid-cols-6 gap-2 text-sm">
      {types.map((type) => (
        <div
          key={type}
          className={`flex justify-between items-center px-2 py-1 rounded ${typeColors[type] || 'bg-gray-100'}`}
        >
          <span>{type}</span>
          <span className="font-semibold">{weakness}</span>
        </div>
      ))}
    </div>
  </div>
    </div>
    </div>
  )
}

export default Coverage
