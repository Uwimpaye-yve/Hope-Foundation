const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const api = {
  async get(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  programs: {
    async getAll() {
      const response = await fetch(`${API_URL}/programs`);
      return response.json();
    },
    async getOne(id: string) {
      const response = await fetch(`${API_URL}/programs/${id}`);
      return response.json();
    },
    async create(data: any) {
      const response = await fetch(`${API_URL}/programs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    async delete(id: string) {
      const response = await fetch(`${API_URL}/programs/${id}`, {
        method: 'DELETE',
      });
      return response.json();
    },
    async getStudents(id: string) {
      return [];
    },
  },

  students: {
    async getAll() {
      const response = await fetch(`${API_URL}/students`);
      return response.json();
    },
  },

  supportRequests: {
    async getAll() {
      const response = await fetch(`${API_URL}/support-requests`);
      return response.json();
    },
    async updateStatus(id: string, status: string) {
      const response = await fetch(`${API_URL}/support-requests/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return response.json();
    },
  },
};
