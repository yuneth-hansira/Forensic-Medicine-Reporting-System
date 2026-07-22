import api from './api';

export const wardService = {
    getAllWards: async () => {
        const response = await api.get('/wards');
        return response.data;
    },
    
    getWardById: async (id) => {
        const response = await api.get(`/wards/${id}`);
        return response.data;
    },
    
    createWard: async (data) => {
        const response = await api.post('/wards', data);
        return response.data;
    },
    
    updateWard: async (id, data) => {
        const response = await api.put(`/wards/${id}`, data);
        return response.data;
    },
    
    deleteWard: async (id) => {
        const response = await api.delete(`/wards/${id}`);
        return response.data;
    }
};
