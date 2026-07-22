import api from './api';

export const reportService = {
    getAllReports: async () => {
        const response = await api.get('/reports');
        return response.data;
    },
    
    getReportById: async (id) => {
        const response = await api.get(`/reports/${id}`);
        return response.data;
    },
    
    getReportsByCase: async (caseId) => {
        const response = await api.get(`/reports/case/${caseId}`);
        return response.data;
    },
    
    createReport: async (data) => {
        const response = await api.post('/reports', data);
        return response.data;
    },
    
    updateReport: async (id, data) => {
        const response = await api.put(`/reports/${id}`, data);
        return response.data;
    },
    
    deleteReport: async (id) => {
        const response = await api.delete(`/reports/${id}`);
        return response.data;
    }
};
