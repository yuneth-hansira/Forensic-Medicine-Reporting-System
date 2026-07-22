import api from './api';

export const hospitalService = {
    getAllHospitals: async () => {
        const response = await api.get('/hospitals');
        return response.data;
    },
    
    getHospitalById: async (id) => {
        const response = await api.get(`/hospitals/${id}`);
        return response.data;
    },
    
    createHospital: async (data) => {
        const response = await api.post('/hospitals', data);
        return response.data;
    },
    
    updateHospital: async (id, data) => {
        const response = await api.put(`/hospitals/${id}`, data);
        return response.data;
    },
    
    deleteHospital: async (id) => {
        const response = await api.delete(`/hospitals/${id}`);
        return response.data;
    },

    getWardsByHospital: async (id) => {
        const response = await api.get(`/hospitals/${id}/wards`);
        return response.data;
    }
};
