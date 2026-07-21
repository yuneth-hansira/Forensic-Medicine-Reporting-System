import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const deceasedApi = axios.create({
  baseURL: `${API_URL}/deceased`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const deceasedService = {
  // Main CRUD
  getAllDeceased: async (filters = {}) => {
    const response = await deceasedApi.get('/', { params: filters });
    return response.data;
  },
  
  getDeceasedById: async (id) => {
    const response = await deceasedApi.get(`/${id}`);
    return response.data;
  },
  
  createDeceased: async (data) => {
    const response = await deceasedApi.post('/', data);
    return response.data;
  },
  
  updateDeceased: async (id, data) => {
    const response = await deceasedApi.put(`/${id}`, data);
    return response.data;
  },
  
  deleteDeceased: async (id) => {
    const response = await deceasedApi.delete(`/${id}`);
    return response.data;
  },

  // Identification
  getIdentification: async (id) => {
    const response = await deceasedApi.get(`/${id}/identification`);
    return response.data;
  },
  
  saveIdentification: async (id, data) => {
    const response = await deceasedApi.post(`/${id}/identification`, data);
    return response.data;
  },

  // Next of Kin
  getNextOfKin: async (id) => {
    const response = await deceasedApi.get(`/${id}/next-of-kin`);
    return response.data;
  },
  
  saveNextOfKin: async (id, data) => {
    const response = await deceasedApi.post(`/${id}/next-of-kin`, data);
    return response.data;
  },

  // Hospital Information
  getHospitalInformation: async (id) => {
    const response = await deceasedApi.get(`/${id}/hospital`);
    return response.data;
  },
  
  saveHospitalInformation: async (id, data) => {
    const response = await deceasedApi.post(`/${id}/hospital`, data);
    return response.data;
  },

  // Release
  releaseBody: async (id, data) => {
    const response = await deceasedApi.post(`/${id}/release`, data);
    return response.data;
  }
};
