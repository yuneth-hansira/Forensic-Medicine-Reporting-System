import api from './api';

export const clinicalFindingsService = {
    getAllClinicalFindings: async () => {
        const response = await api.get('/clinical-findings');
        return response.data;
    },
    
    getClinicalFindingById: async (id) => {
        const response = await api.get(`/clinical-findings/${id}`);
        return response.data;
    },
    
    getClinicalFindingsByCase: async (caseId) => {
        const response = await api.get(`/clinical-findings/case/${caseId}`);
        return response.data;
    },
    
    createClinicalFinding: async (data) => {
        const response = await api.post('/clinical-findings', data);
        return response.data;
    },
    
    updateClinicalFinding: async (id, data) => {
        const response = await api.put(`/clinical-findings/${id}`, data);
        return response.data;
    },
    
    deleteClinicalFinding: async (id) => {
        const response = await api.delete(`/clinical-findings/${id}`);
        return response.data;
    }
};
