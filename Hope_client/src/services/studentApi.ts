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

// Student Dashboard API
export const studentApi = {
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/student/stats`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch student stats');
    return response.json();
  },

  getPrograms: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/student/programs`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch student programs');
    return response.json();
  },

  getSessions: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/student/sessions`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch student sessions');
    return response.json();
  },

  getAchievements: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/student/achievements`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch student achievements');
    return response.json();
  },

  requestSupport: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/support-requests`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit support request');
    return response.json();
  },
};