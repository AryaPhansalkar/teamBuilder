import React from 'react'
import { useEffect, useState } from 'react';
const Card = () => {
  const[pokeopt,setpokeopt] = useState([])
  
  
     useEffect(() => {
    const fetchPokemon = async () => {
      let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
      let data = await response.json();
      setpokeopt(data.results);
      console.log("Fetched Pokémon:", data.results);
    };

    fetchPokemon();
  }, []);
  return (
    <div>
      <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-sm">
      <div className="space-y-2">
        <select className="w-full border rounded px-2 py-1">
          <option disabled selected>Select Pokemon</option>{
            pokeopt.map((poke,index)=>{
                return(<option key={index} value={poke.name}>{poke.name}</option>)
            })}
          
        </select>
        {[...Array(4)].map((_, i) => (
          <select key={i} className="w-full border rounded px-2 py-1">
            <option>Move</option>
          </select>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Card
