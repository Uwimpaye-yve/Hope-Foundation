const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "student" | "admin" | "counselor";
  phoneNumber?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

const handleResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(
      "Server is not responding. Please make sure the backend is running on http://localhost:3000"
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const authService = {
  // ---------------- AUTH ----------------
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  },

  saveToken(token: string) {
    if (typeof window !== "undefined") localStorage.setItem("token", token);
  },

  getToken() {
    if (typeof window !== "undefined") return localStorage.getItem("token");
    return null;
  },

  removeToken() {
    if (typeof window !== "undefined") localStorage.removeItem("token");
  },

  saveUser(user: any) {
    if (typeof window !== "undefined")
      localStorage.setItem("user", JSON.stringify(user));
  },

  getUser() {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  removeUser() {
    if (typeof window !== "undefined") localStorage.removeItem("user");
  },

  logout() {
    this.removeToken();
    this.removeUser();
  },

  // ---------------- DASHBOARD ----------------
  async getAdminStats() {
    const token = this.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/students/stats`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    return await handleResponse(response);
  },

  async getAllStudents() {
    const token = this.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/students`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    return await handleResponse(response);
  },

  async getRecentActivities(limit = 5) {
    const token = this.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/dashboard/activities?limit=${limit}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    return await handleResponse(response);
  },

  async getProgramOverview() {
    const token = this.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/dashboard/programs/overview`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    return await handleResponse(response);
  },
};

// ---------------- SESSIONS ----------------
export const sessionService = {
  async getCounselorSessions() {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/sessions/counselor`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    return await handleResponse(response);
  },

  async createSession(data: any) {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  },

  async updateSession(id: string, data: any) {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/sessions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  },

  async addNote(id: string, notes: string) {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/sessions/${id}/notes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ notes }),
    });
    return await handleResponse(response);
  },

  async rescheduleSession(id: string, scheduledTime: Date) {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/sessions/${id}/reschedule`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ scheduledTime }),
    });
    return await handleResponse(response);
  },

  async updateStatus(id: string, status: string) {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/sessions/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    return await handleResponse(response);
  },

  async getSession(id: string) {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/sessions/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    return await handleResponse(response);
  },
};

// ---------------- STUDENTS ----------------
export const studentService = {
  async getStudentProfile(id: string) {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/students/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    return await handleResponse(response);
  },
};

// ---------------- MESSAGES ----------------
export const messageService = {
  async sendMessage(data: { receiverId: string; message: string }) {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const user = authService.getUser();
    const response = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...data, senderId: user.id }),
    });
    return await handleResponse(response);
  },

  async getConversation(userId: string, otherUserId: string) {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/messages/conversation/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId, otherUserId }),
    });
    return await handleResponse(response);
  },
};

// ---------------- SUPPORT REQUESTS ----------------
export const supportRequestService = {
  async getCounselorRequests(counselorId: string) {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/support-requests/counselor/${counselorId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    return await handleResponse(response);
  },

  async getAllRequests() {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/support-requests`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    return await handleResponse(response);
  },

  async respond(id: string, responseText: string) {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/support-requests/${id}/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ response: responseText }),
    });
    return await handleResponse(response);
  },

  async sendEmail(id: string, subject: string, message: string) {
    const token = authService.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/support-requests/${id}/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ subject, message }),
    });
    return await handleResponse(response);
  },
};
