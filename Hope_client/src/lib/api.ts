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
};
