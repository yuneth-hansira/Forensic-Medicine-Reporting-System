import api from './api';

export const injuryService = {
    getAllInjuries: async () => {
        const response = await api.get('/injuries');
        return response.data;
    },
    
    getInjuryById: async (id) => {
        const response = await api.get(`/injuries/${id}`);
        return response.data;
    },
    
    getInjuriesByCase: async (caseId) => {
        const response = await api.get(`/injuries/case/${caseId}`);
        return response.data;
    },
    
    createInjury: async (data) => {
        const response = await api.post('/injuries', data);
        return response.data;
    },
    
    updateInjury: async (id, data) => {
        const response = await api.put(`/injuries/${id}`, data);
        return response.data;
    },
    
    deleteInjury: async (id) => {
        const response = await api.delete(`/injuries/${id}`);
        return response.data;
    }
};
