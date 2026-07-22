import api from './api';

export const auditLogService = {
    getAllLogs: async () => {
        const response = await api.get('/audit-logs');
        return response.data;
    },
    
    getLogById: async (id) => {
        const response = await api.get(`/audit-logs/${id}`);
        return response.data;
    },
    
    createLog: async (data) => {
        const response = await api.post('/audit-logs', data);
        return response.data;
    },
    
    updateLog: async (id, data) => {
        const response = await api.put(`/audit-logs/${id}`, data);
        return response.data;
    },
    
    deleteLog: async (id) => {
        const response = await api.delete(`/audit-logs/${id}`);
        return response.data;
    }
};
