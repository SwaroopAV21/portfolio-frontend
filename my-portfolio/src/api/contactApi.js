import api from './axiosConfig';
export const sendContact = (data) => api.post('/contact', data);