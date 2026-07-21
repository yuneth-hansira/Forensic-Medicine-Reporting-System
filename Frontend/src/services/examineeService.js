import api from './api';

export const examineeService = {
  async getAllExaminees() {
    try {
      const response = await api.get('/examinees');
      return response.data;
    } catch (error) {
      console.error('Error fetching examinees:', error);
      // Fallback for UI if backend is down
      return [];
    }
  },
  
  async getExamineeById(id) {
    try {
      const response = await api.get(`/examinees/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching examinee details:', error);
      throw error;
    }
  },
  
  async createExaminee(data) {
    try {
      const response = await api.post('/examinees', data);
      return response.data;
    } catch (error) {
      console.error('Error creating examinee:', error);
      throw error;
    }
  }
};
