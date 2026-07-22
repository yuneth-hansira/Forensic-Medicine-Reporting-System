import api from './api';

export const policeInfoService = {
    getAllPoliceInfo: async () => {
        const response = await api.get('/police-info');
        return response.data;
    },
    
    getPoliceInfoByCase: async (caseId) => {
        const response = await api.get(`/police-info/case/${caseId}`);
        return response.data;
    },
    
    createPoliceInfo: async (data) => {
        const response = await api.post('/police-info', data);
        return response.data;
    },
    
    updatePoliceInfo: async (id, data) => {
        const response = await api.put(`/police-info/${id}`, data);
        return response.data;
    },
    
    deletePoliceInfo: async (id) => {
        const response = await api.delete(`/police-info/${id}`);
        return response.data;
    }
};
