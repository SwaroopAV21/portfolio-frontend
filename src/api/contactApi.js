import api from './api';
export const sendContact = (data) => api.post('/contact', data);