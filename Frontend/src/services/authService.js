import api from './api';

export const authService = {
  /**
   * Login a user with username and password
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<any>}
   */
  async login(username, password) {
    try {
      const response = await api.post('/auth/login', { username, password });
      const data = response.data;

      // Store token on successful login
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Login with a Department ID (SSO / Special flow)
   * @param {string} departmentId 
   * @returns {Promise<any>}
   */
  async loginWithDepartment(departmentId) {
    try {
      const response = await api.post('/auth/department-login', { departmentId });
      const data = response.data;

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Department login error:', error);
      throw error.response?.data || error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token');
  },
  
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
