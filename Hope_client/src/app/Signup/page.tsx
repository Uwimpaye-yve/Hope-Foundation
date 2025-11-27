"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/api";

export default function CreatePage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"student" | "admin" | "counselor">("student");
  const [error, setError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || nameParts[0];

      const response = await authService.signup({
        firstName,
        lastName,
        email,
        password,
        role,
      });

      authService.saveToken(response.access_token);
      authService.saveUser(response.user);

      if (role === "student") {
        router.push("/dashboard/student");
      } else if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "counselor") {
        router.push("/dashboard/counselor");
      }
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Sign up
        </h1>
        <div className="mb-6 flex gap-2 rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => {
              setRole("student");
              setError("");
            }}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
              role === "student"
                ? "bg-orange-500 text-white shadow-md"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => {
              setRole("admin");
              setError("");
            }}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
              role === "admin"
                ? "bg-orange-500 text-white shadow-md"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => {
              setRole("counselor");
              setError("");
            }}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
              role === "counselor"
                ? "bg-orange-500 text-white shadow-md"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Counselor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-600"
            >
              Full names
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="John Doe"
            />
          </div>
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
              placeholder={
                role === "student"
                  ? "student@gmail.com"
                  : role === "admin"
                  ? "admin@gmail.com"
                  : "counselor@gmail.com"
              }
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
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Re-enter your password"
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm mt-1">Passwords don&apos;t match!</p>
            )}
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-orange-500 py-2 font-semibold text-white hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <a
              href="/Login"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Sign in
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
