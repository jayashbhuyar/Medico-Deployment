import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserMd, FaClock, FaEnvelope, FaPhone, FaMoneyBill, FaCalendarAlt, FaEye } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const DoctorCard = ({ doctor, onViewDetails }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-lg shadow-md p-6 m-4 border border-gray-200 transition-all"
  >
    <div className="flex justify-between mb-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {doctor.specialties.map((specialty, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {specialty}
            </span>
          ))}
        </div>
      </div>
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <FaUserMd className="text-blue-600" />
      </div>
    </div>

    <div className="space-y-3 text-sm text-gray-600">
      <div className="flex items-center">
        <FaEnvelope className="mr-2 text-blue-500" />
        <span>{doctor.email}</span>
      </div>
      <div className="flex items-center">
        <FaPhone className="mr-2 text-green-500" />
        <span>{doctor.phone}</span>
      </div>
      <div className="flex items-center font-semibold text-purple-600">
        <FaMoneyBill className="mr-2" />
        <span>₹{doctor.consultationFees}</span>
      </div>
    </div>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onViewDetails(doctor)}
      className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      View Details
    </motion.button>
  </motion.div>
);

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <div className="mt-2">{children}</div>
  </div>
);

const InfoRow = ({ icon, text, label }) => (
  <div className="flex items-center text-gray-600">
    {icon}
    <span className="ml-2 text-sm">{label && <strong>{label}: </strong>}{text}</span>
  </div>
);

const DoctorDetailModal = ({ doctor, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9 }}
      className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
      </div>
      
      <div className="space-y-4 text-sm text-gray-600">
        <Section title="Contact Information">
          <InfoRow icon={<FaEnvelope />} text={doctor.email} />
          <InfoRow icon={<FaPhone />} text={doctor.phone} />
          {doctor.alternatePhone && (
            <InfoRow icon={<FaPhone />} text={doctor.alternatePhone} label="Alternate" />
          )}
        </Section>

        <Section title="Professional Details">
          <div className="flex flex-wrap gap-2">
            {doctor.degrees.map((degree, i) => (
              <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {degree}
              </span>
            ))}
          </div>
          <InfoRow icon={<FaUserMd />} text={`${doctor.experience} years experience`} />
        </Section>

        <Section title="Availability">
          <InfoRow 
            icon={<FaClock />} 
            text={`${doctor.timeSlots.start} - ${doctor.timeSlots.end}`} 
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {doctor.availableDays.map((day, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {day}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Consultation">
          <InfoRow 
            icon={<FaMoneyBill />} 
            text={`₹${doctor.consultationFees}`} 
            label="Consultation Fee" 
          />
        </Section>
      </div>
    </motion.div>
  </motion.div>
);

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const hospitalData = JSON.parse(localStorage.getItem('hospitalData'));
        const response = await fetch(`https://medico-jet.vercel.app/api/doctors/organization/${hospitalData.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('hospitalToken')}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch doctors');
        
        const data = await response.json();
        setDoctors(data.doctors);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Medical Professionals
        </h2>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {['Doctor', 'Contact', 'Specialties', 'Timings', 'Fees', 'Actions'].map((header) => (
                    <th 
                      key={header} 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctors.map((doctor) => (
                  <motion.tr 
                    key={doctor._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaUserMd className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                          <div className="text-sm text-gray-500">{doctor.degrees.join(', ')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{doctor.email}</div>
                      <div className="text-sm text-gray-500">{doctor.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {doctor.specialties.map((specialty, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {doctor.timeSlots.start} - {doctor.timeSlots.end}
                      </div>
                      <div className="text-xs text-gray-500">
                        {doctor.availableDays.join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{doctor.consultationFees}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-2"
                      >
                        <FaEye /> View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && selectedDoctor && (
          <DoctorDetailModal 
            doctor={selectedDoctor} 
            onClose={() => {
              setShowModal(false);
              setSelectedDoctor(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllDoctors;