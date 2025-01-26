import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome, FaHospital, FaClinicMedical, FaUserMd,
  FaInfoCircle, FaPhone, FaBars, FaTimes, FaBell,
  FaStethoscope, FaAmbulance, FaPills, FaHeartbeat,
  FaChevronDown, FaSearch, FaRegQuestionCircle
} from 'react-icons/fa';

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome className="text-blue-500" /> },
    { name: 'Hospitals', path: '/hospitals', icon: <FaHospital className="text-blue-500" /> },
    { name: 'Clinics', path: '/clinics', icon: <FaClinicMedical className="text-blue-500" /> },
    { name: 'Doctors', path: '/doctors', icon: <FaUserMd className="text-blue-500" /> },
    {
      name: 'Services',
      icon: <FaStethoscope className="text-blue-500" />,
      subItems: [
        { name: 'Emergency Care', path: '/emergency', icon: <FaAmbulance className="text-red-500" /> },
        { name: 'Pharmacy', path: '/pharmacy', icon: <FaPills className="text-green-500" /> },
        { name: 'Health Checkup', path: '/checkup', icon: <FaHeartbeat className="text-pink-500" /> },
      ]
    },
    { name: 'About Us', path: '/about', icon: <FaInfoCircle className="text-blue-500" /> },
    { name: 'Help', path: '/help', icon: <FaRegQuestionCircle className="text-blue-500" /> },
  ];

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="https://img.freepik.com/premium-vector/medical-health-logo-design-templates_161396-341.jpg" alt="Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium 
                         text-gray-600 hover:text-blue-600 hover:bg-blue-50 
                         transition duration-150 ease-in-out
                         flex items-center"
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md 
                       text-gray-400 hover:text-gray-500 hover:bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <motion.div 
                  key={item.name}
                  whileHover={{ x: 4 }}
                >
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="w-full px-3 py-2 rounded-md text-base font-medium 
                                 text-gray-600 hover:text-blue-600 hover:bg-blue-50 
                                 flex items-center justify-between"
                      >
                        <span className="flex items-center">
                          <span className="mr-2">{item.icon}</span>
                          {item.name}
                        </span>
                        <FaChevronDown className={`transform transition-transform duration-200
                          ${isServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="pl-4"
                          >
                            {item.subItems.map((subItem) => (
                              <motion.div
                                key={subItem.name}
                                whileHover={{ x: 4 }}
                              >
                                <Link
                                  to={subItem.path}
                                  onClick={() => setIsOpen(false)}
                                 // Replace conflicting classes with:
className="inline-flex items-center px-3 py-2 rounded-md text-base font-medium 
text-gray-600 hover:text-blue-600 hover:bg-blue-50 
transition-colors duration-200 w-full">
                                  <span className="mr-2">{subItem.icon}</span>
                                  {subItem.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex w-full items-center gap-2 px-3 py-2 
                              rounded-md text-base font-medium
                              text-gray-600 hover:text-blue-600 hover:bg-blue-50 
                              transition-all duration-200"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default UserNav;