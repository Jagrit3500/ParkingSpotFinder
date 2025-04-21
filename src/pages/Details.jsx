// src/pages/Details.jsx

import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ParkingContext } from "../context/ParkingContext";
import Loader from "../components/common/Loader";
import { FaMapMarkerAlt, FaClock, FaCar, FaParking, FaMoneyBillWave, FaCheck, FaStar, FaArrowLeft } from "react-icons/fa";
import "./Details/Details.css";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { parkingSpots, loading, error } = useContext(ParkingContext);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substr(0, 10));
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [duration, setDuration] = useState(2);

  const spot = parkingSpots.find((s) => String(s.id) === id);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="container py-12">
        <div className="alert alert-danger">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!spot) {
    return (
      <div className="container py-12">
        <div className="alert alert-danger">
          <h2 className="text-xl font-bold mb-2">Parking Spot Not Found</h2>
          <p className="mb-4">Sorry, we couldn't find the parking spot you're looking for.</p>
          <button
            onClick={() => navigate("/search")}
            className="btn btn-primary"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  // Calculate total price
  const totalPrice = (spot.price * duration).toFixed(2);

  return (
    <div className="details-page">
      <div className="container py-8">
        {/* Navigation */}
        <div className="back-navigation">
          <button 
            onClick={() => navigate(-1)}
            className="back-btn"
          >
            <FaArrowLeft />
            Back to Search
          </button>
        </div>
        
        <div className="details-grid">
          {/* Left side - Image and Map */}
          <div className="details-image-container">
            <div className="spot-image-wrapper">
              <img 
                src={`https://source.unsplash.com/random/800x600/?parking,${spot.id}`} 
                alt={spot.name} 
                className="spot-image"
              />
              <div className="image-badge">
                <span className={spot.available ? "badge-available" : "badge-full"}>
                  {spot.available ? "Available" : "Full"}
                </span>
              </div>
            </div>
            
            <div className="spot-map">
              <h3 className="section-subtitle">Location</h3>
              <div className="map-placeholder">
                <div className="map-content">
                  <FaMapMarkerAlt className="map-icon" />
                  <p>{spot.address}</p>
                </div>
              </div>
            </div>

            <div className="spot-reviews">
              <div className="reviews-header">
                <h3 className="section-subtitle">Reviews</h3>
                <span className="reviews-count">42 Reviews</span>
              </div>
              
              <div className="reviews-summary">
                <div className="rating-average">
                  <div className="average-value">4.8</div>
                  <div className="average-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className={star <= 4.8 ? 'filled' : ''} />
                    ))}
                  </div>
                </div>
                
                <div className="rating-stats">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div className="rating-bar" key={rating}>
                      <div className="rating-label">{rating}</div>
                      <div className="rating-progress">
                        <div 
                          className="rating-progress-fill"
                          style={{ 
                            width: `${rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 5 : 0}%` 
                          }}
                        ></div>
                      </div>
                      <div className="rating-percent">
                        {rating === 5 ? '75%' : rating === 4 ? '20%' : rating === 3 ? '5%' : '0%'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="reviews-list">
                {[1, 2, 3].map((review) => (
                  <div className="review-item" key={review}>
                    <div className="review-header">
                      <div className="reviewer">
                        <div className="reviewer-avatar">
                          <img src={`https://randomuser.me/api/portraits/${review % 2 === 0 ? 'men' : 'women'}/${review * 10 + 5}.jpg`} alt="Reviewer" />
                        </div>
                        <div className="reviewer-info">
                          <div className="reviewer-name">
                            {review === 1 ? 'Sarah Johnson' : review === 2 ? 'Michael Brown' : 'Emma Wilson'}
                          </div>
                          <div className="review-date">
                            {review === 1 ? 'June 12, 2023' : review === 2 ? 'May 29, 2023' : 'April 15, 2023'}
                          </div>
                        </div>
                      </div>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < (review === 3 ? 4 : 5) ? 'filled' : ''} />
                        ))}
                      </div>
                    </div>
                    <div className="review-content">
                      {review === 1 
                        ? 'Great parking spot! Easy to find and very convenient location. I felt my car was safe here.' 
                        : review === 2 
                        ? 'Used this spot multiple times. Always clean and secure. Highly recommend.' 
                        : 'Good spot with easy access. Slightly tight spaces but overall good experience.'}
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="reviews-more">
                View All 42 Reviews
              </button>
            </div>
          </div>
          
          {/* Right side - Details */}
          <div className="details-content">
            <div className="spot-header">
              <h1 className="spot-name">{spot.name}</h1>
              <div className="spot-meta-info">
                <div className="spot-address-wrapper">
                  <FaMapMarkerAlt className="meta-icon" />
                  <span>{spot.address}</span>
                </div>
                <div className="spot-distance-wrapper">
                  <FaClock className="meta-icon" />
                  <span>{spot.distance} km away</span>
                </div>
                <div className="spot-rating-wrapper">
                  <FaStar className="meta-icon" />
                  <span>4.8 (42 reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="price-info">
              <span className="price-value">${spot.price}</span>
              <span className="price-unit">/hour</span>
            </div>
            
            <div className="details-section">
              <h3 className="section-subtitle">About This Parking Spot</h3>
              <p className="spot-description">
                {spot.description || `Located in the heart of the city, this ${spot.available ? 'available' : 'currently full'} parking spot offers convenient access to nearby attractions. It's situated in a secure area with regular monitoring and easy entry/exit.`}
              </p>
            </div>
            
            <div className="details-section">
              <h3 className="section-subtitle">Features</h3>
              <ul className="features-list">
                {spot.features && spot.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <FaCheck className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
                {(!spot.features || spot.features.length === 0) && (
                  <>
                    <li className="feature-item">
                      <FaCheck className="feature-icon" />
                      <span>24/7 Access</span>
                    </li>
                    <li className="feature-item">
                      <FaCheck className="feature-icon" />
                      <span>Security Cameras</span>
                    </li>
                    <li className="feature-item">
                      <FaCheck className="feature-icon" />
                      <span>Well Lit</span>
                    </li>
                    <li className="feature-item">
                      <FaCheck className="feature-icon" />
                      <span>Covered Parking</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="booking-section">
              <h3 className="section-subtitle">Book This Spot</h3>
              <div className="booking-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().substr(0, 10)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time</label>
                    <input 
                      type="time" 
                      className="form-control"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Duration (Hours)</label>
                  <div className="duration-selector">
                    {[1, 2, 3, 4, 8].map(hours => (
                      <button 
                        key={hours} 
                        className={`duration-option ${duration === hours ? 'active' : ''}`}
                        onClick={() => setDuration(hours)}
                      >
                        {hours}h
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="price-calculation">
                  <div className="price-row">
                    <span className="price-label">${spot.price} x {duration} hours</span>
                    <span className="price-amount">${totalPrice}</span>
                  </div>
                  <div className="price-row">
                    <span className="price-label">Service fee</span>
                    <span className="price-amount">$1.99</span>
                  </div>
                  <div className="price-divider"></div>
                  <div className="price-row total">
                    <span className="price-label">Total</span>
                    <span className="price-amount">${(parseFloat(totalPrice) + 1.99).toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate(`/booking/${spot.id}?date=${selectedDate}&time=${selectedTime}&duration=${duration}`)}
                  className={`booking-btn ${!spot.available ? 'booking-btn-disabled' : ''}`}
                  disabled={!spot.available}
                >
                  {spot.available ? "Book This Spot" : "Currently Unavailable"}
                </button>
                
                {!spot.available && (
                  <p className="unavailable-message">
                    This spot is currently unavailable. Please check back later or explore other options.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
