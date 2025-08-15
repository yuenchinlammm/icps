import api from './client';

export const createClaim = (data) => api.post('/api/claims', data).then(r => r.data);
export const listClaims  = () => api.get('/api/claims').then(r => r.data);
export const getClaim    = (id) => api.get(`/api/claims/${id}`).then(r => r.data);
export const updateClaim = (id, data) => api.put(`/api/claims/${id}`, data).then(r => r.data);
export const deleteClaim = (id) => api.delete(`/api/claims/${id}`).then(r => r.status);
