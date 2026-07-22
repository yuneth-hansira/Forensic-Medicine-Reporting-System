import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const clinicalApi = axios.create({
  baseURL: `${API_URL}/clinical`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for Auth token if needed later
clinicalApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const clinicalService = {
  // Dashboard
  getDashboard: async () => {
    const response = await clinicalApi.get('/dashboard');
    return response.data;
  },

  // Clinical Examination
  getClinicalExamination: async (caseId) => {
    const response = await clinicalApi.get(`/${caseId}`);
    return response.data;
  },
  createClinicalExamination: async (data) => {
    const response = await clinicalApi.post('/', data);
    return response.data;
  },
  updateClinicalExamination: async (caseId, data) => {
    const response = await clinicalApi.put(`/${caseId}`, data);
    return response.data;
  },

  // Clinical Findings
  getClinicalFindings: async (caseId) => {
    const response = await clinicalApi.get(`/${caseId}/findings`);
    return response.data;
  },
  saveClinicalFindings: async (caseId, data) => {
    const response = await clinicalApi.put(`/${caseId}/findings`, data);
    return response.data;
  },

  // Injuries
  getInjuries: async (caseId) => {
    const response = await clinicalApi.get(`/${caseId}/injuries`);
    return response.data;
  },
  createInjury: async (caseId, data) => {
    const response = await clinicalApi.post(`/${caseId}/injuries`, data);
    return response.data;
  },
  updateInjury: async (caseId, injuryId, data) => {
    const response = await clinicalApi.put(`/${caseId}/injuries/${injuryId}`, data);
    return response.data;
  },
  deleteInjury: async (caseId, injuryId) => {
    const response = await clinicalApi.delete(`/${caseId}/injuries/${injuryId}`);
    return response.data;
  },

  // Body Map
  getBodyMap: async (caseId) => {
    const response = await clinicalApi.get(`/${caseId}/body-map`);
    return response.data;
  },
  saveBodyMap: async (caseId, data) => {
    const response = await clinicalApi.put(`/${caseId}/body-map`, data);
    return response.data;
  },

  // Measurements
  getMeasurements: async (caseId) => {
    const response = await clinicalApi.get(`/${caseId}/measurements`);
    return response.data;
  },
  saveMeasurements: async (caseId, data) => {
    const response = await clinicalApi.put(`/${caseId}/measurements`, data);
    return response.data;
  },

  // Notes
  getNotes: async (caseId) => {
    const response = await clinicalApi.get(`/${caseId}/notes`);
    return response.data;
  },
  saveNotes: async (caseId, data) => {
    const response = await clinicalApi.put(`/${caseId}/notes`, data);
    return response.data;
  },

  // Upload
  uploadClinicalImage: async (caseId, file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await clinicalApi.post(`/${caseId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Report
  generateClinicalReport: async (caseId) => {
    const response = await clinicalApi.post(`/${caseId}/report-generate`);
    return response.data;
  },
};

export default clinicalService;
