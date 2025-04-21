import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

export const getParkingSpots = async () => {
  try {
    const response = await API.get('/parking');
    return response.data;
  } catch (error) {
    console.error('Error fetching parking spots:', error);
    throw error;
  }
};
