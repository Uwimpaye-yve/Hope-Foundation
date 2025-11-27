import { authService } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface DashboardStats {
  programsActive: number;
  sessionsDone: number;
  hoursThisWeek: number;
  achievementsCount: number;
  student: {
    id: string;
    name: string;
    progress: number;
    status: string;
  };
}

export interface Program {
  id: string;
  name: string;
  description: string;
  schedule: string;
  progress: number;
  nextSession: string;
}

export interface Session {
  id: string;
  topic: string;
  scheduledTime: string;
  duration: string;
  status: string;
  counselor: {
    firstName: string;
    lastName: string;
  };
}

const getAuthHeaders = () => {
  const token = authService.getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const studentService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_URL}/dashboard/student/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch dashboard stats');
    }

    return response.json();
  },

  async getPrograms(): Promise<Program[]> {
    const response = await fetch(`${API_URL}/dashboard/student/programs`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch programs');
    }

    const data = await response.json();
    return data.programs; // Extract the programs array
  },

  async getUpcomingSessions(): Promise<Session[]> {
    const response = await fetch(`${API_URL}/dashboard/student/sessions`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch sessions');
    }

    const data = await response.json();
    return data.sessions; // Extract the sessions array
  },
};