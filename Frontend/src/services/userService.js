import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`, getAuthHeaders());
  return response.data;
};

const updateProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/profile`, profileData, getAuthHeaders());
  return response.data;
};

export default {
  getProfile,
  updateProfile
};
