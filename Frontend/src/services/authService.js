const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authService = {
  /**
   * Login a user with username and password
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<any>}
   */
  async login(username, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token on successful login
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Login with a Department ID (SSO / Special flow)
   * @param {string} departmentId 
   * @returns {Promise<any>}
   */
  async loginWithDepartment(departmentId) {
    try {
      const response = await fetch(`${API_URL}/auth/department-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ departmentId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Department login failed');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      console.error('Department login error:', error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  }
};
