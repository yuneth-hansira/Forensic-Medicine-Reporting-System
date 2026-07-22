import api from './api';

export const toxicologyService = {
    getAllReports: async () => {
        const response = await api.get('/toxicology');
        return response.data;
    },
    
    getReportById: async (id) => {
        const response = await api.get(`/toxicology/${id}`);
        return response.data;
    },
    
    createReport: async (data) => {
        const response = await api.post('/toxicology', data);
        return response.data;
    },
    
    updateReport: async (id, data) => {
        const response = await api.put(`/toxicology/${id}`, data);
        return response.data;
    },
    
    deleteReport: async (id) => {
        const response = await api.delete(`/toxicology/${id}`);
        return response.data;
    }
};
