import api from './api';

export const exhibitService = {
    getAllExhibits: async () => {
        const response = await api.get('/exhibits');
        return response.data;
    },
    
    getExhibitById: async (id) => {
        const response = await api.get(`/exhibits/${id}`);
        return response.data;
    },
    
    createExhibit: async (data) => {
        const response = await api.post('/exhibits', data);
        return response.data;
    },
    
    updateExhibit: async (id, data) => {
        const response = await api.put(`/exhibits/${id}`, data);
        return response.data;
    },
    
    deleteExhibit: async (id) => {
        const response = await api.delete(`/exhibits/${id}`);
        return response.data;
    }
};
