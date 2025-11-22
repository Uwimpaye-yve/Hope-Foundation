"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
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

  return (
    <main className="flex min-h-screen items-center justify-center oklch(75% 0.183 55.934) ">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <div className="text-center">
            <a href="" className="text-orange-500 hover:text-orange-600 font-medium">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-600 py-2 font-semibold text-white bg-orange-500"
          >
            {" "}
            <a href="">Sign in</a>
          </button>
          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="/Signup" className="text-orange-500 hover:text-orange-600 font-semibold">Signup</a>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-orange-600 hover:text-orange-700 hover:underline"
          ></a>
        </div>
      </div>
    </main>
  );
}
