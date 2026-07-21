import api from './api';

export const deceasedService = {
  // Get all deceased records
  getAllDeceased: async () => {
    const response = await api.get('/deceased');
    return response.data;
  },

  // Get deceased by ID
  getDeceasedById: async (id) => {
    const response = await api.get(`/deceased/${id}`);
    return response.data;
  },

  // Create new deceased record
  createDeceased: async (deceasedData) => {
    const response = await api.post('/deceased', deceasedData);
    return response.data;
  },

  // Update deceased record
  updateDeceased: async (id, deceasedData) => {
    const response = await api.put(`/deceased/${id}`, deceasedData);
    return response.data;
  },

  // Delete deceased record
  deleteDeceased: async (id) => {
    const response = await api.delete(`/deceased/${id}`);
    return response.data;
  }
};
