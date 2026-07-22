import api from './api';

export const courtInfoService = {
    getAllCourtInfo: async () => {
        const response = await api.get('/court-info');
        return response.data;
    },
    
    getCourtInfoById: async (id) => {
        const response = await api.get(`/court-info/${id}`);
        return response.data;
    },
    
    getCourtInfoByCase: async (caseId) => {
        const response = await api.get(`/court-info/case/${caseId}`);
        return response.data;
    },
    
    createCourtInfo: async (data) => {
        const response = await api.post('/court-info', data);
        return response.data;
    },
    
    updateCourtInfo: async (id, data) => {
        const response = await api.put(`/court-info/${id}`, data);
        return response.data;
    },
    
    deleteCourtInfo: async (id) => {
        const response = await api.delete(`/court-info/${id}`);
        return response.data;
    }
};
