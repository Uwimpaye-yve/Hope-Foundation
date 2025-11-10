"use client";

import { useState } from "react";

export default function CreatePage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"student" | "admin">("student");
  const [error, setError] = useState<string>("");

  // Function that runs when form is submitted
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
  };
  setTimeout(() => {
    if (
      role === "student" &&
      email === "student@gmail.com" &&
      password === "123"
    ) {
      alert("welcome student");
    } else if (
      role === "admin" &&
      email === "admin@gmail.com" &&
      password === "123"
    ) {
      alert("welcome Admin");
    }
  });

  return (
    <main className="flex min-h-screen items-center justify-center oklch(75% 0.183 55.934) ">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Sign up form
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
        </div>
        <div className="mb-6 flex gap-2 rounded-lg bg-gray-100 p-1">
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
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-600"
            >
              Full NAMES
            </label>
            <input
              id="name"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outlone-none"
              
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-600 "
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
              placeholder={
                role === "student" ? "stude@gmail.com" : "admi@gmail.com"
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
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-md bg-600 py-2 font-semibold text-white bg-orange-500"
          >
            {" "}
            Create account
          </button>
          <button className="w-full rounded-md py-2 font-semibold text-white bg-orange-500">
            <a href="/Login">Back to Login</a>
          </button>
        </form>
      </div>
    </main>
  );
}
