import api from './api';

export const userService = {
    getProfile: async () => {
        const response = await api.get('/users/profile');
        return response.data;
    },
    
    updateProfile: async (data) => {
        const response = await api.put('/users/profile', data);
        return response.data;
    },

    getAllUsers: async () => {
        const response = await api.get('/users');
        return response.data;
    },
    
    getUserById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },
    
    createUser: async (data) => {
        const response = await api.post('/users', data);
        return response.data;
    },
    
    updateUser: async (id, data) => {
        const response = await api.put(`/users/${id}`, data);
        return response.data;
    },
    
    deleteUser: async (id) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    }
};

export default userService;
