// src/context/ParkingContext.jsx
import { createContext, useState, useEffect } from "react";

export const ParkingContext = createContext({
  parkingSpots: [],
  loading: true,
  error: null,
  userLocation: null,
  selectedSpot: null,
  setSelectedSpot: () => {},
});

export const ParkingProvider = ({ children }) => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);

  // Mock API fetch
  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Generate mock data before the timeout to ensure we have it ready
        const mockData = Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `Parking Spot ${i + 1}`,
          address: `Street ${i + 1}, City`,
          price: Math.floor(Math.random() * 10) + 5,
          available: Math.random() > 0.3,
          distance: (Math.random() * 5).toFixed(1),
          features: ["24/7 Access", "Security Camera", "Covered Area"],
          description: "Secure parking spot located near popular destinations. Well-lit, 24/7 access, and easy entry/exit."
        }));
        
        // Set the data before simulating the delay
        setParkingSpots(mockData);
        
        // Simulate API delay separately
        await new Promise(resolve => setTimeout(resolve, 1500));
        
      } catch (error) {
        console.error("Error fetching parking spots:", error);
        setError("Failed to load parking spots. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchParkingSpots();
  }, []);

  // Get user location
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            // Don't set error state here as it's not critical
          }
        );
      }
    };
    
    getUserLocation();
  }, []);

  return (
    <ParkingContext.Provider
      value={{
        parkingSpots,
        loading,
        error,
        userLocation,
        selectedSpot,
        setSelectedSpot
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};