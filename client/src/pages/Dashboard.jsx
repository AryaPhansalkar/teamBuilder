import { useEffect, useState } from 'react';
import Select from 'react-select';
import Defence from '../components/Defence.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import axios from 'axios';

const Dashboard = () => {
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();
  const [userinfo, setUserinfo] = useState("");

  const [pokeopt, setPokeopt] = useState([]);
  const [team, setTeam] = useState(Array(6).fill(null));
  const [movesList, setMovesList] = useState(Array(6).fill([]));
  const [selectedMoves, setSelectedMoves] = useState(Array(6).fill([]));

  const handleLogout = async () => {
    await saveTeam();
    await axios.post(import.meta.env.API_BASE_URL + '/api/auth/logout', {}, { withCredentials: true });
    setIsAuth(false);
    navigate('/');
  };
  
  useEffect(() => {
    axios.get(import.meta.env.API_BASE_URL + '/api/builder-data', { withCredentials: true })
       .then((res) => {
        setUserinfo(res.data.username);
        console.log("User name", res.data.username);
      })
      .catch(() => {
        navigate('/');
      });
  }, []);
  
  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
      const data = await res.json();
      const options = data.results.map((p, index) => ({
        value: index + 1,
        label: p.name
      }));
      setPokeopt(options);
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const res = await axios.get(import.meta.env.API_BASE_URL + '/api/load-team', { withCredentials: true });
        const saved = res.data.team || [];

        const newTeam = Array(6).fill(null);
        const newSelectedMoves = Array(6).fill([]);
        const newMovesList = Array(6).fill([]);

        for (let i = 0; i < 6; i++) {
          const entry = saved[i];
          if (entry && entry.pokemon) {
            newTeam[i] = entry.pokemon;

            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${entry.pokemon.value}`);
            const data = await res.json();
            const allMoves = data.moves.map(m => ({ label: m.move.name, value: m.move.name }));

            newMovesList[i] = allMoves;
            newSelectedMoves[i] = (entry.moves || []).map(m => ({ label: m, value: m }));
          }
        }

        setTeam(newTeam);
        setMovesList(newMovesList);
        setSelectedMoves(newSelectedMoves);
      } catch (err) {
        console.error("Failed to load saved team:", err);
      }
    };

    loadTeam();
  }, []);

  const saveTeam = async () => {
    const formatted = team.map((pokemon, i) => ({
      pokemon,
      moves: (selectedMoves[i] || []).map(m => m.value)
    }));

    try {
      await axios.post(import.meta.env.API_BASE_URL + '/api/save-team', { team: formatted }, { withCredentials: true });
    } catch (err) {
      console.error("Failed to save team:", err);
    }
  };

  const handlePokemonChange = async (index, selected) => {
    const updatedTeam = [...team];
    updatedTeam[index] = selected;
    setTeam(updatedTeam);

    if (selected) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${selected.value}`);
      const data = await res.json();
      const formattedMoves = data.moves.map(m => ({ label: m.move.name, value: m.move.name }));

      const updatedMovesList = [...movesList];
      const updatedSelectedMoves = [...selectedMoves];

      updatedMovesList[index] = formattedMoves;
      updatedSelectedMoves[index] = [];

      setMovesList(updatedMovesList);
      setSelectedMoves(updatedSelectedMoves);
    } else {
      const updatedMovesList = [...movesList];
      const updatedSelectedMoves = [...selectedMoves];
      updatedMovesList[index] = [];
      updatedSelectedMoves[index] = [];
      setMovesList(updatedMovesList);
      setSelectedMoves(updatedSelectedMoves);
    }

    await saveTeam();
  };

  const handleMoveChange = async (i, j, move) => {
    const updated = [...selectedMoves];
    const moves = [...(updated[i] || [])];
    moves[j] = move;
    updated[i] = moves;
    setSelectedMoves(updated);
    await saveTeam();
  };

  return (
    <div className="px-4 py-6">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:px-10">
        <div className="w-full sm:w-1/3 text-center sm:text-left"></div>
        <div className="w-full sm:w-1/3 flex justify-center">
          <h1 className="text-black text-3xl sm:text-5xl font-bold text-center">My Pokémon Team</h1>
        </div>
        <div className="w-full sm:w-1/3 flex justify-center sm:justify-end space-x-4">
          <div className="text-black text-md sm:text-lg">{userinfo}</div>
          <button
            onClick={handleLogout}
            className="text-white border-red-600 bg-red-600 p-2 pl-4 pr-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-8">
        {team.map((selected, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-md w-full max-w-sm">
            <div className="space-y-2">
              <Select
                options={pokeopt}
                value={selected}
                onChange={(sel) => handlePokemonChange(i, sel)}
                placeholder="Select Pokémon"
                isSearchable
                className="text-black"
              />
              {[...Array(4)].map((_, j) => (
                <Select
                  key={j}
                  className="w-full border rounded px-2 py-1"
                  placeholder={`Select Move ${j + 1}`}
                  options={movesList[i]}
                  value={selectedMoves[i]?.[j] || null}
                  onChange={(move) => handleMoveChange(i, j, move)}
                  isSearchable
                  isDisabled={!selected || movesList[i].length === 0}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
