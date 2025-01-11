import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../assets/frontend_assets/logo.png';
import loginImage from '../assets/frontend_assets/login_img.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword && currentState === 'Register') {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      if (currentState === 'Register') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          toast.success('Registration successful! You can now log in.');
          setCurrentState('Login');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful! Redirecting to the homepage...');
          navigate('/');
        } else {
          toast.error(response.data.message);
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex max-w-6xl w-full bg-white shadow-lg rounded-lg">
        {/* Swap layout based on currentState */}
        {currentState === 'Login' ? (
          <>
            {/* Left Side: Image */}
            <div className="w-1/2 p-4">
              <img
                src={loginImage} // Correct image import
                alt="Login illustration"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Right Side: Form */}
            <div className="w-1/2 p-8 flex flex-col justify-center items-center">
              <form onSubmit={onSubmitHandler} className="w-full max-w-md text-gray-800">
                {/* Logo above the title */}
                <div className="mb-6 text-center">
                  <img src={logo} alt="Logo" className="h-20 mx-auto" /> {/* Increased logo size */}
                </div>

                {/* Centered Title for Login with attractive font */}
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4 font-serif">{currentState}</h2> {/* Changed font */}
                
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full px-3 py-2 border border-gray-800 mb-4 rounded"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <div className="relative mb-4">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full px-3 py-2 border border-gray-800 rounded pr-10"
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-800" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-800" />
                    )}
                  </span>
                </div>

                <div className="w-full flex justify-between text-sm">
                  <p className="cursor-pointer">Don't have an account? Click Register here</p>
                  {currentState === 'Login' ? (
                    <p onClick={() => setCurrentState('Register')} className="cursor-pointer text-blue-500">
                      Register
                    </p>
                  ) : (
                    <p onClick={() => setCurrentState('Login')} className="cursor-pointer text-blue-500">
                      Login 
                    </p>
                  )}
                </div>
                <button className="bg-black text-white font-light px-8 py-2 mt-6 w-full rounded">
                  {currentState === 'Login' ? 'Shop Now' : 'Sign Up'} {/* Updated button text */}
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            {/* Left Side: Form */}
            <div className="w-1/2 p-8 flex flex-col justify-center items-center">
              <form onSubmit={onSubmitHandler} className="w-full max-w-md text-gray-800">
                {/* Logo above the title */}
                <div className="mb-6 text-center">
                  <img src={logo} alt="Logo" className="h-20 mx-auto" /> {/* Increased logo size */}
                </div>

                {/* Centered Title for Sign Up (Register) with attractive font */}
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4 font-serif">Create an Account</h2> {/* Changed font */}
                
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full px-3 py-2 border border-gray-800 mb-4 rounded"
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full px-3 py-2 border border-gray-800 mb-4 rounded"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <div className="relative mb-4">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full px-3 py-2 border border-gray-800 rounded pr-10"
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-800" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-800" />
                    )}
                  </span>
                </div>

                <div className="relative mb-4">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    className="w-full px-3 py-2 border border-gray-800 rounded pr-10"
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  >
                    {confirmPasswordVisible ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-800" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-800" />
                    )}
                  </span>
                </div>

                <div className="w-full flex justify-between text-sm">
                  <p className="cursor-pointer">Already have an account? Click login here</p>
                  {currentState === 'Login' ? (
                    <p onClick={() => setCurrentState('Register')} className="cursor-pointer text-blue-500">
                      Register
                    </p>
                  ) : (
                    <p onClick={() => setCurrentState('Login')} className="cursor-pointer text-blue-500">
                      Login Here
                    </p>
                  )}
                </div>
                <button className="bg-black text-white font-light px-8 py-2 mt-6 w-full rounded">
                  {currentState === 'Login' ? 'Shop Now' : 'Sign Up'} {/* Updated button text */}
                </button>
              </form>
            </div>

            {/* Right Side: Image */}
            <div className="w-1/2 p-4">
              <img
                src={loginImage} // Correct image import
                alt="Login illustration"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

