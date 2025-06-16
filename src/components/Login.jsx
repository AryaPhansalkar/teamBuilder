import React from 'react'
import '../App.css';
import '../index.css';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { compare } from '../Auth/compare';
const Login = () => {
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm()
      useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/builder'); 
    }
  }, []);
    const navigate = useNavigate();
    const [authError, setAuthError] = useState('');
    const onSubmit=async (data)=>{
        const userinfo = JSON.parse(localStorage.getItem('user'))

        if(!userinfo){
          setAuthError("User does not exist please sign up first")
        }
        else{
          if(data.email===userinfo.email && await compare(data.password,userinfo.password)){
            setAuthError('')
            sessionStorage.setItem('isLoggedIn', 'true');
            navigate('/builder');
          }
          else{
            setAuthError('Incorrect email or password')
          }
        }
    }
  return (
    <div className="bg-cover bg-center min-h-screen bg-[url('./assets/loginbg.jpg')] ">
        
      <div className="bg-black bg-opacity-70 min-h-screen">
    
    <div className="flex items-center justify-between px-10 pt-4">
      
      <div className="w-1/3"></div>

     
      <div className="w-1/3 flex justify-center">
        <h1 className="text-white text-7xl">Login Page</h1>
      </div>

      <div className="w-1/3 flex justify-end space-x-8">
        <Link to="/random"><div className="text-white text-lg cursor-pointer hover:underline">Home</div></Link>
        <Link to="/signup"><div className="text-white text-lg cursor-pointer hover:underline">Sign-Up</div></Link>
      </div>
    </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center bg-black bg-opacity-50 text-white w-1/4 mx-auto mt-20 p-10 rounded-xl">
          <div className="flex flex-col space-y-4 w-full">
            <div>Email:</div>
            <input
              type="email"
               {...register("email",{required : {value:true , message:"Field required"}})}
              placeholder="Enter Email"
              className="border border-gray-300 rounded px-4 py-2 text-black w-full"
            />
            {errors.email && (
    <div className="text-red-600 text-sm mt-3">{errors.email.message}</div>
  )}
            <div>Password:</div>
            <input
              type="password"
               {...register("password",{required:{value:true , message : "Field required"}, minLength:{value: 8 , message:"password must be 8 characters long"}})}
              placeholder="Enter password"
              className="border border-gray-300 rounded px-4 py-2 text-black w-full"
            />
          </div>
           {errors.password && (
    <div className="text-red-600 text-sm mt-3">{errors.password.message}</div>
  )}
    {authError && <div className="text-red-500 mb-4">{authError}</div>}
        </div>

        <div className="flex justify-center mt-5">
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
  )
}

export default Login
