const normalizedEnvBase = (process.env.REACT_APP_API_BASE_URL || '')
  .trim()
  .replace(/\/+$/, '');

const defaultProdBase = 'https://pragyann-1.onrender.com';
const runtimeBase =
  normalizedEnvBase ||
  (process.env.NODE_ENV === 'production' ? defaultProdBase : '');

const API_BASE = runtimeBase ? `${runtimeBase}/api` : '/api';

const getHeaders = (includeAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = sessionStorage.getItem('adminToken');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
};

export const getWorkshops = () =>
  fetch(`${API_BASE}/workshops`).then(handleResponse);

export const getPersonalClasses = () =>
  fetch(`${API_BASE}/personal/classes`).then(handleResponse);

export const submitInquiry = (data) =>
  fetch(`${API_BASE}/personal/inquiries`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }).then(handleResponse);

export const adminLogin = (password) =>
  fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ password })
  }).then(handleResponse);

export const adminLogout = () =>
  fetch(`${API_BASE}/admin/logout`, {
    method: 'POST',
    headers: getHeaders(true)
  }).then(handleResponse);

export const addWorkshop = (data) =>
  fetch(`${API_BASE}/workshops`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(data)
  }).then(handleResponse);

export const deleteWorkshop = (id) =>
  fetch(`${API_BASE}/workshops/${id}`, {
    method: 'DELETE',
    headers: getHeaders(true)
  }).then(handleResponse);

export const getInquiries = () =>
  fetch(`${API_BASE}/admin/personal/inquiries`, {
    headers: getHeaders(true)
  }).then(handleResponse);
