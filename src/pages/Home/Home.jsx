import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaMapMarkerAlt, FaCar, FaParking, FaClock, FaUserAlt, FaStar, FaArrowRight, FaSearch, FaCheck } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1>Find the Perfect Parking Spot in Seconds</h1>
                <p>
                  No more circling around. Easily search, book, and pay for parking spots in advance with our secure platform.
                </p>
                <div className="hero-buttons">
                  <Link to="/search" className="btn btn-accent">Find Parking Now <FaArrowRight /></Link>
                  <Link to="/about" className="btn btn-outline-light">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img 
                src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt="Parking spot preview" 
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Us</h2>
            <p>Our parking platform provides a seamless experience from search to parking</p>
          </div>
          <div className="features-container">
            <div className="feature-card">
              <div className="feature-icon">
                <FaSearch />
              </div>
              <h3 className="feature-title">Easy Search</h3>
              <p className="feature-description">
                Find parking spots quickly with our intuitive search filters and real-time availability updates.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaClock />
              </div>
              <h3 className="feature-title">Advance Booking</h3>
              <p className="feature-description">
                Reserve your parking spot in advance to guarantee availability when you arrive.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaParking />
              </div>
              <h3 className="feature-title">Secure Payments</h3>
              <p className="feature-description">
                Pay securely online with multiple payment options and get instant confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Spots Section */}
      <section className="popular-spots-section">
        <div className="container">
          <div className="section-title">
            <h2>Popular Parking Spots</h2>
            <p>Discover the most popular parking locations rated by our users</p>
          </div>
          <div className="spots-container">
            {[1, 2, 3, 4].map((spot) => (
              <div className="spot-card" key={spot}>
                <div className="spot-badge">Popular</div>
                <img 
                  src={`https://source.unsplash.com/random/300x200?parking,garage,${spot}`} 
                  alt={`Parking spot ${spot}`} 
                  className="spot-image" 
                />
                <div className="spot-content">
                  <h3 className="spot-title">Downtown Parking {spot}</h3>
                  <div className="spot-location">
                    <FaMapMarkerAlt /> 123 Main Street, City Center
                  </div>
                  <div className="spot-info">
                    <div className="spot-data">
                      <span className="spot-label">Security</span>
                      <span className="spot-value">24/7</span>
                    </div>
                    <div className="spot-data">
                      <span className="spot-label">Type</span>
                      <span className="spot-value">Covered</span>
                    </div>
                    <div className="spot-data">
                      <span className="spot-label">Capacity</span>
                      <span className="spot-value">120 cars</span>
                    </div>
                  </div>
                  <div className="spot-price">
                    $5.99 <span className="spot-per-hour">/ hour</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
            <p>Follow these simple steps to find and book your parking spot</p>
          </div>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Search</h3>
              <p className="step-description">
                Enter your destination, date, and time to find available parking spots.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Book</h3>
              <p className="step-description">
                Select your preferred spot and complete the booking with secure payment.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Park</h3>
              <p className="step-description">
                Use your booking confirmation to access the parking spot on arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to find your parking spot?</h2>
            <p>Start your search now and book the perfect parking spot in seconds.</p>
            <div className="cta-buttons">
              <Link to="/search" className="btn btn-accent">Find Parking Now <FaArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 