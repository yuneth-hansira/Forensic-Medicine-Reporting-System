import api from './api';

export const specimenService = {
    getAllSpecimens: async () => {
        const response = await api.get('/specimens');
        return response.data;
    },
    
    getSpecimenById: async (id) => {
        const response = await api.get(`/specimens/${id}`);
        return response.data;
    },
    
    createSpecimen: async (data) => {
        const response = await api.post('/specimens', data);
        return response.data;
    },
    
    updateSpecimen: async (id, data) => {
        const response = await api.put(`/specimens/${id}`, data);
        return response.data;
    },
    
    deleteSpecimen: async (id) => {
        const response = await api.delete(`/specimens/${id}`);
        return response.data;
    }
};
