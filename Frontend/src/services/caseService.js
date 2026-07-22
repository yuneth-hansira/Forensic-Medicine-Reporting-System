import api from './api';

export const caseService = {
  async getAllCases() {
    try {
      const response = await api.get('/cases');
      return response.data;
    } catch (error) {
      console.error('Error fetching cases:', error);
      // Fallback for UI if backend is down
      return [
        { Case_ID: 1, Case_Type: 'Assault', Case_Status: 'Open', Date_Registered: '2026-07-21' },
        { Case_ID: 2, Case_Type: 'RTA', Case_Status: 'Closed', Date_Registered: '2026-07-20' }
      ];
    }
  },
  
  async getCaseById(id) {
    try {
      const response = await api.get(`/cases/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching case details:', error);
      throw error;
    }
  },
  
  async createCase(caseData) {
    try {
      const response = await api.post('/cases', caseData);
      return response.data;
    } catch (error) {
      console.error('Error creating case:', error);
      throw error;
    }
  },

  async updateCase(id, caseData) {
    try {
      const response = await api.put(`/cases/${id}`, caseData);
      return response.data;
    } catch (error) {
      console.error('Error updating case:', error);
      throw error;
    }
  },

  async deleteCase(id) {
    try {
      const response = await api.delete(`/cases/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting case:', error);
      throw error;
    }
  }
};
