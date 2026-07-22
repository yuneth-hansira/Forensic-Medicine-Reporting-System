import api from './api';

export const bodyIdService = {
    getAllBodyIdentifications: async () => {
        const response = await api.get('/body-id');
        return response.data;
    },
    
    getBodyIdentificationById: async (id) => {
        const response = await api.get(`/body-id/${id}`);
        return response.data;
    },
    
    createBodyIdentification: async (data) => {
        const response = await api.post('/body-id', data);
        return response.data;
    },
    
    updateBodyIdentification: async (id, data) => {
        const response = await api.put(`/body-id/${id}`, data);
        return response.data;
    },
    
    deleteBodyIdentification: async (id) => {
        const response = await api.delete(`/body-id/${id}`);
        return response.data;
    }
};
