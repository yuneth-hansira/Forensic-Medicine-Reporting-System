import api from './api';

export const consentService = {
    getAllConsents: async () => {
        const response = await api.get('/consents');
        return response.data;
    },
    
    getConsentById: async (id) => {
        const response = await api.get(`/consents/${id}`);
        return response.data;
    },
    
    getConsentsByExaminee: async (examineeId) => {
        const response = await api.get(`/consents/examinee/${examineeId}`);
        return response.data;
    },
    
    createConsent: async (data) => {
        const response = await api.post('/consents', data);
        return response.data;
    },
    
    updateConsent: async (id, data) => {
        const response = await api.put(`/consents/${id}`, data);
        return response.data;
    },
    
    deleteConsent: async (id) => {
        const response = await api.delete(`/consents/${id}`);
        return response.data;
    }
};
