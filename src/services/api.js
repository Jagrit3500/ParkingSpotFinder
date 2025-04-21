// services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';

export const fetchParkingSpots = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching parking spots:', error);
    throw error;
  }
};

export const fetchParkingSpotById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching parking spot ${id}:`, error);
    throw error;
  }
};

export const bookParkingSpot = async (bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error booking parking spot:', error);
    throw error;
  }
};
