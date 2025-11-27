const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// API headers with auth
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getAuthToken()}`,
});

// Students API
export const studentsApi = {
  getAll: async (search?: string) => {
    const url = search ? `${API_BASE_URL}/students?search=${search}` : `${API_BASE_URL}/students`;
    const response = await fetch(url, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch students');
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch student');
    return response.json();
  },

  create: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create student');
    return response.json();
  },

  update: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update student');
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete student');
    return response.json();
  },
};

// Programs API
export const programsApi = {
  getAll: async (search?: string) => {
    const url = search ? `${API_BASE_URL}/programs?search=${search}` : `${API_BASE_URL}/programs`;
    const response = await fetch(url, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch programs');
    return response.json();
  },

  getOverview: async () => {
    const response = await fetch(`${API_BASE_URL}/programs/overview`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch programs overview');
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/programs/${id}`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch program');
    return response.json();
  },

  create: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/programs`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create program');
    return response.json();
  },

  update: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/programs/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update program');
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/programs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete program');
    return response.json();
  },
};

// Dashboard API
export const dashboardApi = {
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
  },
};