import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaHospital } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios'; // Import Axios for API requests
// import { set } from 'mongoose';

function HospitalLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State to handle loading
  const navigate = useNavigate();

  // useEffect(() => {
  //   const validateExistingToken = async () => {
  //     const token = localStorage.getItem('hospitalToken');
  //     console.log(token)
  //     if (token) {
  //       try {
  //         const response = await axios.get('https://medico-jet.vercel.app/api/hospitals/validate', {
  //           headers: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         });
          
  //         if (response.data.success) {
  //           navigate('/hospital/dashboard');
  //         }
  //       } catch (error) {
  //         // // Token invalid/expired - clear localStorage
  //         // localStorage.removeItem('hospitalToken');
  //         // localStorage.removeItem('hospitalData');
  //       }
  //     }
  //   };

  //   validateExistingToken();
  // }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      // Dismiss any existing toasts
      toast.dismiss();
      
      try {
        const response = await axios.post('https://medico-jet.vercel.app/api/hospitals/login', formData);
        const { message, token, hospital } = response.data;

        if (token) {
          // Store data in localStorage
          localStorage.setItem('hospitalToken', token);
          localStorage.setItem('hospitalData', JSON.stringify(hospital));

          // Show success message
          toast.success('Login successful!', {
            duration: 2000,
            position: 'top-right',
          });
          setTimeout(() => {  // Redirect after showing the toast message   
            // Navigate to hospital dashboard
            navigate('/hospital/dashboard');
            // toast.dismiss();
          }, 1000);
          // navigate('/hospital/dashboard');
        } else {
          toast.error(message || 'Login failed!');
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error(error.response?.data?.message || 'Invalid credentials');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20"
      >
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center"
          >
            <FaHospital className="h-12 w-12 text-blue-600" />
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hospital Login
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="flex items-center text-gray-600 mb-1">
                <FaEnvelope className="mr-2 text-blue-500" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`appearance-none rounded-lg relative block w-full px-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter hospital email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="flex items-center text-gray-600 mb-1">
                <FaLock className="mr-2 text-blue-500" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`appearance-none rounded-lg relative block w-full px-4 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 rounded-lg text-white ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-150`}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </motion.button>

          <div className="text-center">
            <Link
              to="/hospitalregistration"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Not registered? Register your hospital
            </Link>
          </div>
        </form>
      </motion.div>
      <Toaster position="top-right" />
    </div>
  );
}

export default HospitalLogin;
