// components/features/booking/BookingForm.jsx
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { ParkingContext } from "../../../context/ParkingContext";
import { convertUSDtoINR } from "../../../utils/currency";

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { parkingSpots } = useContext(ParkingContext);
  const parkingSpot = parkingSpots.find(spot => spot.id === parseInt(id));
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log("Booking data:", { ...data, parkingId: id });
    // Here you would typically make an API call to submit the booking
    alert("Booking successful!");
    navigate("/");
  };
  
  if (!parkingSpot) return <div>Loading...</div>;
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Book Parking Spot</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            {...register("fullName", { 
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters"
              }
            })}
          />
          {errors.fullName && (
            <p className="text-red-500 mt-1">{errors.fullName.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Vehicle Plate</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            {...register("vehiclePlate", { 
              required: "Vehicle plate is required",
              pattern: {
                value: /^[A-Z0-9]{5,8}$/,
                message: "Enter a valid vehicle plate"
              }
            })}
          />
          {errors.vehiclePlate && (
            <p className="text-red-500 mt-1">{errors.vehiclePlate.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && (
            <p className="text-red-500 mt-1">{errors.date.message}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Duration (hours)</label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            {...register("duration", { required: "Duration is required" })}
          >
            <option value="">Select duration</option>
            <option value="1">1 hour</option>
            <option value="2">2 hours</option>
            <option value="3">3 hours</option>
            <option value="4">4 hours</option>
          </select>
          {errors.duration && (
            <p className="text-red-500 mt-1">{errors.duration.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Confirm Booking ({convertUSDtoINR(parkingSpot.price)}/hr)
        </button>
      </form>
    </div>
  );
};
