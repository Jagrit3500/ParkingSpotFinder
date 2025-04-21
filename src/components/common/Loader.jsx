// src/components/common/Loader.jsx
import React from 'react';
import './Loader.css';

/**
 * Loader component with multiple variants
 * @param {Object} props - Component props
 * @param {string} props.message - Optional message to display below loader
 * @param {string} props.variant - Loader variant: 'spinner', 'dots', 'line', or 'full-page'
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Loader component
 */
const Loader = ({ message = 'Loading...', variant = 'spinner', className = '' }) => {
  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="dots-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );
      case 'line':
        return <div className="line-loader"></div>;
      case 'full-page':
        return (
          <div className="full-page-loader">
            <div className="spinner"></div>
            {message && <div className="loader-message">{message}</div>}
          </div>
        );
      case 'classic':
        return <div className="loader"></div>;
      case 'spinner':
      default:
        return <div className="spinner"></div>;
    }
  };

  // For full-page variant, render directly without container
  if (variant === 'full-page') {
    return renderLoader();
  }

  return (
    <div className={`loader-container ${className}`}>
      {renderLoader()}
      {message && variant !== 'full-page' && <div className="loader-message">{message}</div>}
    </div>
  );
};

export default Loader;
  