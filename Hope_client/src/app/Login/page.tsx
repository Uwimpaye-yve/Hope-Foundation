"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login({
        email,
        password,
      });

      authService.saveToken(response.access_token);
      authService.saveUser(response.user);

      const userRole = response.user.role;
      if (userRole === "student") {
        router.push("/dashboard/student");
      } else if (userRole === "admin") {
        router.push("/dashboard/admin");
      } else if (userRole === "counselor") {
        router.push("/dashboard/counselor");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <div className="text-center">
            <a
              href="/forgot-password"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-orange-500 py-2 font-semibold text-white hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <div className="text-center">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <a
              href="/Signup"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Sign up
            </a>
          </div>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-orange-600 hover:text-orange-700 hover:underline"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
