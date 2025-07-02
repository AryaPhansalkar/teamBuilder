import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EncryptPassword } from '../authentication/encrypt';
import { useEffect, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const SignupScheme = z.object({
  username: z.string().min(3, { message: "username must be 3 characters long" }).max(25, { message: "username cannot exceed 25 characters" }),
  email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
  password: z.string()
    .min(8, { message: "password must be 8 characters long" })
    .trim()
    .nonempty({ message: "Password is required" })
    .regex(/[a-z]/, { message: "Password must contain atleast one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain atleast one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain atleast one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain atleast one special character" })
})
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
    resolver: zodResolver(SignupScheme),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/builder');
    }
  }, []);
  const onSubmit = async (data) => {
    const userdata = {
      username: data.username,
      password: await EncryptPassword(data.password),
      email: data.email
    };
    localStorage.setItem('user', JSON.stringify(userdata));
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/builder');
  };

  return (
    <div className="bg-cover bg-center min-h-screen bg-[url('../public/pokemonbg.jpg')]">
      <div className="bg-black bg-opacity-70 min-h-screen">


        <div className="flex flex-col sm:flex-row items-center justify-between px-10 pt-4 space-y-4 sm:space-y-0">
          <div className="sm:w-1/3" />
          <div className="sm:w-1/3 flex justify-center">
            <h1 className="text-white text-5xl sm:text-7xl text-center">Sign-Up Page</h1>
          </div>
          <div className="sm:w-1/3 flex justify-center sm:justify-end space-x-8">
            <Link to="/"><div className="text-white text-lg cursor-pointer hover:underline">Home</div></Link>
            <Link to="/login"><div className="text-white text-lg cursor-pointer hover:underline">Login</div></Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center bg-black bg-opacity-50 text-white w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4 mx-auto mt-24 p-10 rounded-xl">

            <div className="flex flex-col space-y-4 w-full">
              <label>
                Trainer Name:
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  placeholder="Enter name"
                  className="border border-gray-300 rounded px-4 py-2 text-black w-full mt-1"
                />
                {errors.username && (
                  <div className="text-red-600 text-sm mt-3">{errors.username.message}</div>
                )}
              </label>

              <label>
                Email:
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter Email"
                  className="border border-gray-300 rounded px-4 py-2 text-black w-full mt-1"
                />
                {errors.email && (
                  <div className="text-red-600 text-sm mt-3">{errors.email.message}</div>
                )}
              </label>

              <label className="relative w-full">
                Password:
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter password"
                  className="border border-gray-300 rounded px-4 py-2 text-black w-full mt-1" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute top-[38px] right-3 text-black focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
                {errors.password && (
                  <div className="text-red-600 text-sm mt-3">{errors.password.message}</div>
                )}
              </label>

            </div>
          </div>

          <div className="flex justify-center space-x-2 mt-2 px-4">
            <input type="checkbox" required />
            <div className="text-white text-sm sm:text-base">I agree with privacy and policy</div>
          </div>

          <div className="flex justify-center mt-5 px-4">
            <button
              type="submit"
              className="border border-b-2 border-black rounded px-6 py-2 text-white bg-green-500 hover:bg-green-600 transition"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

