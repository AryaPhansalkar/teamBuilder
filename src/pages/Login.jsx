import React from 'react'
import '../App.css';
import '../index.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { compare } from '../authentication/compare';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/builder');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const userinfo = JSON.parse(localStorage.getItem('user'));

    if (!userinfo) {
      setAuthError("User does not exist. Please sign up first.");
    } else {
      if (
        data.email === userinfo.email &&
        (await compare(data.password, userinfo.password))
      ) {
        setAuthError('');
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/builder');
      } else {
        setAuthError('Incorrect email or password');
      }
    }
  };

  return (
    <div className="bg-cover bg-center min-h-screen bg-[url('../public/loginbg.jpg')]">
      <div className="bg-black bg-opacity-70 min-h-screen px-4 sm:px-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 gap-y-4">
          <div className="sm:w-1/3"></div>

          <div className="sm:w-1/3 flex justify-center">
            <h1 className="text-white text-4xl sm:text-6xl text-center">Login Page</h1>
          </div>

          <div className="sm:w-1/3 flex justify-center sm:justify-end space-x-4 sm:space-x-8">
            <Link to="/">
              <div className="text-white text-base sm:text-lg cursor-pointer hover:underline">Home</div>
            </Link>
            <Link to="/signup">
              <div className="text-white text-base sm:text-lg cursor-pointer hover:underline">Sign-Up</div>
            </Link>
          </div>
        </div>


        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center bg-black bg-opacity-50 text-white w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto mt-12 p-6 sm:p-10 rounded-xl">
            <div className="flex flex-col space-y-4 w-full">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: { value: true, message: "Field required" },
                })}
                placeholder="Enter Email"
                className="border border-gray-300 rounded px-4 py-2 text-black w-full"
              />
              {errors.email && (
                <div className="text-red-600 text-sm">{errors.email.message}</div>
              )}

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: { value: true, message: "Field required" },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                placeholder="Enter Password"
                className="border border-gray-300 rounded px-4 py-2 text-black w-full"
              />
              {errors.password && (
                <div className="text-red-600 text-sm">{errors.password.message}</div>
              )}
              {authError && <div className="text-red-500 mt-2 text-sm">{authError}</div>}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="border border-b-2 border-black rounded px-6 py-2 text-white bg-green-500 hover:bg-green-600 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
