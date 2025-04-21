// src/pages/Booking.jsx

import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ParkingContext } from "../context/ParkingContext";
import { convertUSDtoINR } from "../utils/currency";
import Loader from "../components/common/Loader";
import "./Booking.css";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { parkingSpots, loading, error } = useContext(ParkingContext);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const spot = parkingSpots.find((s) => String(s.id) === id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      duration: "",
      date: new Date().toISOString().split('T')[0], // Set default date to today
    }
  });

  const selectedDuration = watch("duration");
  const totalCost = spot && selectedDuration ? (spot.price * parseInt(selectedDuration)).toFixed(2) : 0;

  const onSubmit = async (data) => {
    try {
      setBookingError(null);
      // Here you would send booking data to an API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setBookingSuccess(true);
      reset();
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setBookingError("Failed to complete booking. Please try again.");
    }
  };

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

  // Do not allow booking if spot is not available
  if (!spot.available) {
    return (
      <div className="container py-12">
        <div className="alert alert-warning">
          <h2 className="text-xl font-bold mb-2">Spot Unavailable</h2>
          <p className="mb-4">Sorry, this parking spot is currently unavailable for booking.</p>
          <button
            onClick={() => navigate("/search")}
            className="btn btn-primary"
          >
            Find Another Spot
          </button>
        </div>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="booking-success-page">
        <div className="container py-12">
          <div className="success-card">
            <div className="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="success-title">Booking Confirmed!</h2>
            <p className="success-message">Your booking has been successfully completed.</p>
            <p className="redirect-message">Redirecting to home page...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="container py-8">
        <div className="back-navigation">
          <button 
            onClick={() => navigate(-1)}
            className="back-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>
        
        <div className="booking-container">
          <div className="booking-summary">
            <h1 className="booking-title">Book Your Spot</h1>
            
            <div className="spot-preview">
              <div className="spot-image">
                <img 
                  src={`https://source.unsplash.com/random/800x600/?parking,${spot.id}`} 
                  alt={spot.name} 
                />
              </div>
              <div className="spot-info">
                <h2 className="spot-name">{spot.name}</h2>
                <p className="spot-address">{spot.address}</p>
                <div className="spot-meta">
                  <div className="spot-rate">{convertUSDtoINR(spot.price)}/hour</div>
                  <div className="spot-distance">{spot.distance} km away</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="booking-form-container">
            <h2 className="form-title">Booking Details</h2>
            
            {bookingError && (
              <div className="alert alert-danger mb-4">
                {bookingError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name is too short" },
                    pattern: { value: /^[A-Za-z\s]+$/, message: "Names should only contain letters" }
                  })}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="form-error">{errors.fullName.message}</p>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label">Vehicle Plate</label>
                <input
                  className={`form-control ${errors.vehiclePlate ? 'is-invalid' : ''}`}
                  {...register("vehiclePlate", {
                    required: "Vehicle plate is required",
                    pattern: {
                      value: /^[A-Z0-9-]{5,10}$/i,
                      message: "Invalid plate format (5-10 characters, letters, numbers and hyphens only)",
                    },
                  })}
                  placeholder="e.g. AB12CD3456"
                />
                {errors.vehiclePlate && (
                  <p className="form-error">{errors.vehiclePlate.message}</p>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                    {...register("date", { 
                      required: "Date is required",
                      validate: value => {
                        const selected = new Date(value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return selected >= today || "Date cannot be in the past";
                      }
                    })}
                  />
                  {errors.date && (
                    <p className="form-error">{errors.date.message}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <div className="select-wrapper">
                    <select
                      className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                      {...register("duration", { required: "Duration is required" })}
                    >
                      <option value="">Select duration</option>
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="8">8 hours</option>
                      <option value="24">24 hours</option>
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                  {errors.duration && (
                    <p className="form-error">{errors.duration.message}</p>
                  )}
                </div>
              </div>
              
              {selectedDuration && (
                <div className="cost-summary">
                  <div className="cost-row">
                    <span>Rate:</span>
                    <span>{convertUSDtoINR(spot.price)}/hour</span>
                  </div>
                  <div className="cost-row">
                    <span>Duration:</span>
                    <span>{selectedDuration} {parseInt(selectedDuration) === 1 ? 'hour' : 'hours'}</span>
                  </div>
                  <div className="cost-divider"></div>
                  <div className="cost-row total">
                    <span>Total Cost:</span>
                    <span>{convertUSDtoINR(totalCost)}</span>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? (
                  <span className="btn-loader">
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
