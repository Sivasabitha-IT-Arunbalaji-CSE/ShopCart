import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
// Ensure you import your logo image correctly
import logo from '../assets/frontend_assets/logo.png'; // Or use an icon if preferred

// Ensure you import your image correctly for login image
import loginImage from '../assets/frontend_assets/login_img.jpg';

// Import FontAwesome icons
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
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect to login page
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match for registration
    if (password !== confirmPassword && currentState === 'Register') {
      toast.error('Passwords do not match!');
      return; // Prevent submission if passwords do not match
    }

    try {
      if (currentState === 'Register') {
        // Send registration request (password stored as plain text)
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          toast.success('Registration successful! You can now log in.');
          setCurrentState('Login');
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Send login request
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
          localStorage.removeItem('token'); // Ensure token is removed if login fails
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

