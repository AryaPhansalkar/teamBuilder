import { useEffect, useState } from 'react';
import Select from 'react-select';

const Card = () => {
  const [pokeopt, setpokeopt] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [moves, setMoves] = useState([]);
  useEffect(() => {
    const fetchPokemon = async () => {
      let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
      let data = await response.json();
      const formattedOptions = data.results.map((pokemon,index) => ({
        value: index+1,
        label: pokemon.name
      }))
      setpokeopt(formattedOptions);
      console.log("Fetched Pokémon:", data.results);
      
    };
    
    fetchPokemon();
  }, []);
  useEffect(()=>{
    const fetchMoves = async () =>{
      if(selectedPokemon){
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.value}`);
      let data = await response.json();
      const formattedOptions = data.moves.map(m => ({
        value: m.move.name,
        label: m.move.name
      }))
      setMoves(formattedOptions);
      }
      
    }
    fetchMoves();
  },[selectedPokemon])
  return (
    <div>
      <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-sm">
        <div className="space-y-2">
          <Select
            options={pokeopt}
            value={selectedPokemon}
            onChange={setSelectedPokemon}
            placeholder="Select Pokémon"
            isSearchable
            className="text-black"

          />
          {[...Array(4)].map((_, i) => (
            <Select key={i} className="w-full border rounded px-2 py-1"
              placeholder={`Select Move ${i+1}`}
              options={moves}
              isSearchable
              isDisabled={!selectedPokemon || moves.length === 0}>
            </Select>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card
