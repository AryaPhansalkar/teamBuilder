import React from 'react';
import '../App.css';
import '../index.css';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="bg-cover bg-center min-h-screen bg-[url('./assets/homepage.jpg')]">
      <div className="bg-black bg-opacity-70 min-h-screen flex flex-col justify-center items-center px-4 py-10 animate-fade-in">
        
        <div className="text-white text-3xl sm:text-5xl lg:text-7xl text-center pb-5 font-bold">
          Welcome
        </div>

        <div className="text-white text-sm sm:text-lg text-center mb-2">
          This page is for building your Pokémon team
        </div>
        <div className="text-white text-sm sm:text-lg text-center mb-2">
          If you do not have an account, please sign up
        </div>
        <div className="text-white text-sm sm:text-lg text-center pb-10">
          If you already have an account, please log in
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/login">
            <div className="text-white text-base sm:text-lg border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition duration-300">
              Login
            </div>
          </Link>

          <Link to="/signup">
            <div className="text-white text-base sm:text-lg border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition duration-300">
              Sign Up
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

