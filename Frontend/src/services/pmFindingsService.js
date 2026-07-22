import api from './api';

export const pmFindingsService = {
    getAllFindings: async () => {
        const response = await api.get('/pm-findings');
        return response.data;
    },
    
    getFindingById: async (id) => {
        const response = await api.get(`/pm-findings/${id}`);
        return response.data;
    },
    
    createFinding: async (data) => {
        const response = await api.post('/pm-findings', data);
        return response.data;
    },
    
    updateFinding: async (id, data) => {
        const response = await api.put(`/pm-findings/${id}`, data);
        return response.data;
    },
    
    deleteFinding: async (id) => {
        const response = await api.delete(`/pm-findings/${id}`);
        return response.data;
    }
};
