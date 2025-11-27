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

// Counselor Dashboard API
export const counselorApi = {
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/counselor/stats`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch counselor stats');
    return response.json();
  },

  getStudents: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/counselor/students`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch assigned students');
    return response.json();
  },

  getSessions: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/counselor/sessions`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch counselor sessions');
    return response.json();
  },

  getSupportRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/counselor/support-requests`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch support requests');
    return response.json();
  },

  updateSessionNote: async (sessionId: string, note: string) => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/notes`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ notes: note }),
    });
    if (!response.ok) throw new Error('Failed to update session note');
    return response.json();
  },

  scheduleSession: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to schedule session');
    return response.json();
  },

  respondToSupport: async (requestId: string, response: string) => {
    const res = await fetch(`${API_BASE_URL}/support-requests/${requestId}/respond`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ response }),
    });
    if (!res.ok) throw new Error('Failed to respond to support request');
    return res.json();
  },
};