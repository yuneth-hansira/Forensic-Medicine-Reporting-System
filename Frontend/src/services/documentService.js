import api from './api';

export const documentService = {
    getAllDocuments: async () => {
        const response = await api.get('/documents');
        return response.data;
    },
    
    getDocumentById: async (id) => {
        const response = await api.get(`/documents/${id}`);
        return response.data;
    },
    
    getDocumentsByCase: async (caseId) => {
        const response = await api.get(`/documents/case/${caseId}`);
        return response.data;
    },
    
    createDocument: async (data) => {
        const response = await api.post('/documents', data);
        return response.data;
    },
    
    updateDocument: async (id, data) => {
        const response = await api.put(`/documents/${id}`, data);
        return response.data;
    },
    
    deleteDocument: async (id) => {
        const response = await api.delete(`/documents/${id}`);
        return response.data;
    }
};
