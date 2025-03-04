import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Loginbody() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      toast.error('Both fields are required.');
      return;
    }
  
    try {
      const userInfo = { email: formData.email, password: formData.password };
      const response = await axios.post('http://localhost:4001/user/login', userInfo);
  
      console.log('Full backend response:', response.data);
  
      // Verify the presence of token and user
      if (response.data && response.data.token && response.data.user) {
        const { token, user } = response.data;
  
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
  
        toast.success('Login Successfully!');
        navigate(`/aidcard/${user._id}`, { state: { user } });
      } else {
        console.error('Unexpected response structure:', response.data);
        throw new Error('User data or token is missing in the response.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during login.';
      toast.error(`Error: ${errorMessage}`);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-[90%] max-w-md lg:max-w-lg xl:max-w-xl h-auto bg-gradient-to-br from-[#f7f7f7] to-[#f77076] bg-opacity-[0.43] rounded-[39px] flex flex-col p-8 md:p-10">
        <div className="text-3xl md:text-4xl text-black font-semibold flex justify-center">LogIn</div>
        <form onSubmit={onSubmit}>
          <div className="pl-12">
            <label htmlFor="email" className="block text-lg md:text-xl font-semibold leading-6 text-black pt-8 md:pt-10">Email</label>
            <div className="mt-2 md:mt-2.5">
              <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                className="block w-11/12 rounded-md border-0 px-3.5 py-2 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="pl-12">
            <label htmlFor="password" className="block text-lg md:text-xl font-semibold leading-6 text-black pt-6 md:pt-4">Password</label>
            <div className="mt-2 md:mt-2.5 relative">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className="block w-11/12 rounded-md border-0 px-3.5 py-2 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {isPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="pt-6 md:pt-8 pl-12">
            <button
              type="submit"
              className="block w-11/12 rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Loginbody;
