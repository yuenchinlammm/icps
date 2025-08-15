export function getToken() {
  return localStorage.getItem('token'); 
}

export function isAuthed() {
  return !!getToken();
}
