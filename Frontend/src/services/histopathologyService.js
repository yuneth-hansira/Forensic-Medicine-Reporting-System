import api from './api';

export const histopathologyService = {
    getAllReports: async () => {
        const response = await api.get('/histopathology');
        return response.data;
    },
    
    getReportById: async (id) => {
        const response = await api.get(`/histopathology/${id}`);
        return response.data;
    },
    
    createReport: async (data) => {
        const response = await api.post('/histopathology', data);
        return response.data;
    },
    
    updateReport: async (id, data) => {
        const response = await api.put(`/histopathology/${id}`, data);
        return response.data;
    },
    
    deleteReport: async (id) => {
        const response = await api.delete(`/histopathology/${id}`);
        return response.data;
    }
};
