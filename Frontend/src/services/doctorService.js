import api from './api';

export const doctorService = {
    getAllDoctors: async () => {
        const response = await api.get('/doctors');
        return response.data;
    },
    
    getDoctorById: async (id) => {
        const response = await api.get(`/doctors/${id}`);
        return response.data;
    },
    
    createDoctor: async (data) => {
        const response = await api.post('/doctors', data);
        return response.data;
    },
    
    updateDoctor: async (id, data) => {
        const response = await api.put(`/doctors/${id}`, data);
        return response.data;
    },
    
    deleteDoctor: async (id) => {
        const response = await api.delete(`/doctors/${id}`);
        return response.data;
    }
};
