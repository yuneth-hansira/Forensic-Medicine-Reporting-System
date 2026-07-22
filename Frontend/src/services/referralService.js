import api from './api';

export const referralService = {
    getAllReferrals: async () => {
        const response = await api.get('/referrals');
        return response.data;
    },
    
    getReferralById: async (id) => {
        const response = await api.get(`/referrals/${id}`);
        return response.data;
    },
    
    createReferral: async (data) => {
        const response = await api.post('/referrals', data);
        return response.data;
    },
    
    updateReferral: async (id, data) => {
        const response = await api.put(`/referrals/${id}`, data);
        return response.data;
    },
    
    deleteReferral: async (id) => {
        const response = await api.delete(`/referrals/${id}`);
        return response.data;
    }
};
