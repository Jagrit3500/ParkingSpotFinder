import React from "react";
import { Link } from "react-router-dom";
import "./Bookings.css";

const Bookings = () => {
  // Mock data for bookings
  const bookings = [
    {
      id: 1,
      spotName: "Downtown Parking Garage",
      address: "123 Main St, Downtown",
      date: "2023-08-15",
      startTime: "10:00 AM",
      endTime: "2:00 PM",
      price: "$12.50",
      status: "Confirmed"
    },
    {
      id: 2,
      spotName: "City Center Parking",
      address: "456 Center Ave, Midtown",
      date: "2023-08-20",
      startTime: "9:00 AM",
      endTime: "5:00 PM",
      price: "$24.00",
      status: "Confirmed"
    },
  ];

  return (
    <div className="bookings-page">
      <section className="bookings-header">
        <div className="container">
          <h1>My Bookings</h1>
          <p>View and manage your parking reservations</p>
        </div>
      </section>

      <section className="bookings-content">
        <div className="container">
          {bookings.length > 0 ? (
            <div className="bookings-list">
              {bookings.map(booking => (
                <div className="booking-card" key={booking.id}>
                  <div className="booking-info">
                    <h2>{booking.spotName}</h2>
                    <p className="booking-address">
                      <i className="fas fa-map-marker-alt"></i> {booking.address}
                    </p>
                    <div className="booking-details">
                      <div className="booking-detail">
                        <span className="label">Date:</span>
                        <span className="value">{booking.date}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="label">Time:</span>
                        <span className="value">{booking.startTime} - {booking.endTime}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="label">Price:</span>
                        <span className="value">{booking.price}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="label">Status:</span>
                        <span className="value status-confirmed">{booking.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="booking-actions">
                    <Link to={`/booking/${booking.id}`} className="btn-view">View Details</Link>
                    <button className="btn-cancel">Cancel Booking</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-bookings">
              <h2>No Bookings Found</h2>
              <p>You haven't made any parking reservations yet.</p>
              <Link to="/search" className="btn-primary">Find Parking Now</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Bookings; 