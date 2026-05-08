import api from './axiosConfig';
export const getProfile = () => api.get('/profile');