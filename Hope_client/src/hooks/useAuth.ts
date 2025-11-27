"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/api";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "student" | "admin" | "counselor";
}

export function useAuth(requiredRole?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = authService.getToken();
    const userData = authService.getUser();

    if (!token || !userData) {
      router.push("/Signin");
      return;
    }

    // Check if user role matches required role
    if (requiredRole && userData.role !== requiredRole) {
      setUnauthorized(true);
      setLoading(false);
      
      // Redirect after a short delay to show the unauthorized message
      setTimeout(() => {
        switch (userData.role) {
          case "student":
            router.push("/dashboard/student");
            break;
          case "admin":
            router.push("/dashboard/admin");
            break;
          case "counselor":
            router.push("/dashboard/counselor");
            break;
          default:
            router.push("/Signin");
        }
      }, 3000);
      return;
    }

    setUser(userData);
    setLoading(false);
  }, [requiredRole, router]);

  return { user, loading, unauthorized };
}