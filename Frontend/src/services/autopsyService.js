import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const autopsyApi = axios.create({
  baseURL: `${API_URL}/autopsy`,
  headers: {
    'Content-Type': 'application/json',
  },
});

autopsyApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const autopsyService = {
  // Autopsies
  getAutopsies: async (filters = {}) => {
    const response = await autopsyApi.get('/', { params: filters });
    return response.data;
  },
  
  getAutopsyById: async (id) => {
    const response = await autopsyApi.get(`/${id}`);
    return response.data;
  },
  
  createAutopsy: async (data) => {
    const response = await autopsyApi.post('/', data);
    return response.data;
  },
  
  updateAutopsy: async (id, data) => {
    const response = await autopsyApi.put(`/${id}`, data);
    return response.data;
  },

  // Postmortem Findings
  getPostmortemFindings: async (id) => {
    const response = await autopsyApi.get(`/${id}/postmortem`);
    return response.data;
  },
  
  savePostmortemFindings: async (id, data) => {
    const response = await autopsyApi.put(`/${id}/postmortem`, data);
    return response.data;
  },

  // Cause of Death
  getCauseOfDeath: async (id) => {
    const response = await autopsyApi.get(`/${id}/cause-of-death`);
    return response.data;
  },
  
  saveCauseOfDeath: async (id, data) => {
    const response = await autopsyApi.put(`/${id}/cause-of-death`, data);
    return response.data;
  },

  // Opinion
  getOpinion: async (id) => {
    const response = await autopsyApi.get(`/${id}/opinion`);
    return response.data;
  },
  
  saveOpinion: async (id, data) => {
    const response = await autopsyApi.put(`/${id}/opinion`, data);
    return response.data;
  },

  // Specimens
  getSpecimens: async (id) => {
    const response = await autopsyApi.get(`/${id}/specimens`);
    return response.data;
  },
  
  createSpecimen: async (id, data) => {
    const response = await autopsyApi.post(`/${id}/specimens`, data);
    return response.data;
  },
  
  updateSpecimen: async (id, specimenId, data) => {
    const response = await autopsyApi.put(`/${id}/specimens/${specimenId}`, data);
    return response.data;
  },
  
  deleteSpecimen: async (id, specimenId) => {
    const response = await autopsyApi.delete(`/${id}/specimens/${specimenId}`);
    return response.data;
  },

  // Reports
  generateAutopsyReport: async (id) => {
    const response = await autopsyApi.post(`/${id}/generate-report`);
    return response.data;
  },
  
  generateDeathCertificate: async (id) => {
    const response = await autopsyApi.post(`/${id}/generate-death-certificate`);
    return response.data;
  },

  // Media
  uploadAutopsyImages: async (id, file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await autopsyApi.post(`/${id}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export default autopsyService;
