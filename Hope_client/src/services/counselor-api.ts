import { authService } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface CounselorStats {
  assignedStudents: number;
  pendingRequests: number;
  sessionsThisWeek: number;
  completedCases: number;
}

export interface CounselorStudent {
  id: number;
  name: string;
  initials: string;
  lastSession: string;
  progress: number;
  priority: string;
  status: string;
}

export interface CounselorSession {
  id: number;
  student: string;
  topic: string;
  time: string;
  icon: string;
  iconBg: string;
}

export interface SupportRequest {
  id: number;
  student: string;
  issue: string;
  time: string;
  priority: string;
  priorityColor: string;
}

const getAuthHeaders = () => {
  const token = authService.getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const counselorService = {
  async getStats(): Promise<CounselorStats> {
    const response = await fetch(`${API_URL}/dashboard/counselor/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch counselor stats');
    }

    return response.json();
  },

  async getStudents(): Promise<CounselorStudent[]> {
    const response = await fetch(`${API_URL}/dashboard/counselor/students`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch students');
    }

    const data = await response.json();
    return data.students;
  },

  async getSessions(): Promise<CounselorSession[]> {
    const response = await fetch(`${API_URL}/dashboard/counselor/sessions`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch sessions');
    }

    const data = await response.json();
    return data.sessions;
  },

  async getSupportRequests(): Promise<SupportRequest[]> {
    const response = await fetch(`${API_URL}/dashboard/counselor/support-requests`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch support requests');
    }

    const data = await response.json();
    return data.requests;
  },
};