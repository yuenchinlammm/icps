import api from './client';

export const uploadDocument = (claimId, file, onUploadProgress) => {
  const form = new FormData();
  form.append('file', file);
  return api.post(`/api/claims/${claimId}/documents`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress
  }).then(r => r.data);
};

export const listDocuments = (claimId) =>
  api.get(`/api/claims/${claimId}/documents`).then(r => r.data);

export const replaceDocument = (docId, file, onUploadProgress) => {
  const form = new FormData();
  form.append('file', file);
  return api.put(`/api/documents/${docId}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress
  }).then(r => r.data);
};

export const deleteDocument = (docId) =>
  api.delete(`/api/documents/${docId}`).then(r => r.status);

// For preview we fetch a blob and open it
export const previewDocument = async (docId) => {
  const res = await api.get(`/api/documents/${docId}/preview`, { responseType: 'blob' });
  const blobUrl = URL.createObjectURL(res.data);
  window.open(blobUrl, '_blank', 'noopener,noreferrer');
};
