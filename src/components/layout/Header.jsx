// src/components/layout/Header.jsx
// Enhanced Header.jsx with Mobile Menu
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import './Layout.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  // Show back button only if not on homepage
  const showBackButton = location.pathname !== "/";

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          {showBackButton && (
            <button 
              className="back-button" 
              onClick={handleBackClick}
              aria-label="Go back"
            >
              <IoMdArrowBack />
            </button>
          )}
          
          <Link to="/" className="logo">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <span>Parking Spot Finder</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="main-nav desktop-nav">
            <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
            <Link to="/search" className={`nav-link ${isActive('/search')}`}>Find Parking</Link>
            <Link to="/bookings" className={`nav-link ${isActive('/bookings')}`}>My Bookings</Link>
          </nav>
          
          <div className="auth-buttons desktop-auth">
            <Link to="/login" className="btn-link">Sign In</Link>
            <Link to="/signup" className="btn-primary">Sign Up</Link>
          </div>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-menu-toggle"
            onClick={handleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <Link
            to="/"
            className={`mobile-nav-link ${isActive('/')}`}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`mobile-nav-link ${isActive('/search')}`}
          >
            Find Parking
          </Link>
          <Link
            to="/bookings"
            className={`mobile-nav-link ${isActive('/bookings')}`}
          >
            Bookings
          </Link>
          
          <div className="mobile-auth">
            <Link to="/login" className="btn-link">Sign In</Link>
            <Link to="/signup" className="btn-primary">Sign Up</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

