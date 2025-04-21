// src/pages/NotFound.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiHome, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Loader from '../components/common/Loader';
import './NotFound.css';

const NotFound = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <motion.div 
      className="not-found-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="error-container">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <FiAlertTriangle className="error-icon" />
        </motion.div>
        
        <motion.h1 
          className="error-code"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="error-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Page Not Found
        </motion.h2>
        
        <motion.p 
          className="error-message"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          The page you are looking for doesn't exist or has been moved.
          <br />
          Please check the URL or navigate back to the homepage.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="buttons-wrapper"
        >
          <Link to="/" className="btn btn-primary">
            <FiHome /> Return to Home
          </Link>
          
          <motion.button 
            className="btn btn-outline"
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft /> Go Back
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
