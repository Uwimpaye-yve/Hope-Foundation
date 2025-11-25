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
  async getAdminDashboard() {
    const token = this.getToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_URL}/dashboard/stats`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    return await handleResponse(response);
  },

  async getStudentsList(search?: string, limit = 10, offset = 0) {
    const token = this.getToken();
    if (!token) throw new Error("Not authenticated");

    const query = new URLSearchParams();
    if (search) query.append("search", search);
    query.append("limit", limit.toString());
    query.append("offset", offset.toString());

    const response = await fetch(`${API_URL}/dashboard/students?${query.toString()}`, {
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
