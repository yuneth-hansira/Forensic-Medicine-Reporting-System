import api from './api';

export const investigationService = {
    getAllInvestigations: async () => {
        const response = await api.get('/investigations');
        return response.data;
    },
    
    getInvestigationById: async (id) => {
        const response = await api.get(`/investigations/${id}`);
        return response.data;
    },
    
    createInvestigation: async (data) => {
        const response = await api.post('/investigations', data);
        return response.data;
    },
    
    updateInvestigation: async (id, data) => {
        const response = await api.put(`/investigations/${id}`, data);
        return response.data;
    },
    
    deleteInvestigation: async (id) => {
        const response = await api.delete(`/investigations/${id}`);
        return response.data;
    }
};
