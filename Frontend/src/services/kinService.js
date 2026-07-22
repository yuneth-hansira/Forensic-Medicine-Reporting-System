import api from './api';

export const kinService = {
    getAllNextOfKin: async () => {
        const response = await api.get('/next-of-kin');
        return response.data;
    },
    
    getNextOfKinById: async (id) => {
        const response = await api.get(`/next-of-kin/${id}`);
        return response.data;
    },
    
    createNextOfKin: async (data) => {
        const response = await api.post('/next-of-kin', data);
        return response.data;
    },
    
    updateNextOfKin: async (id, data) => {
        const response = await api.put(`/next-of-kin/${id}`, data);
        return response.data;
    },
    
    deleteNextOfKin: async (id) => {
        const response = await api.delete(`/next-of-kin/${id}`);
        return response.data;
    }
};
