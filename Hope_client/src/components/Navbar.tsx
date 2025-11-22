"use client";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-300 to-orange-400">
              <span className="text-2xl">❤️</span>
            </div>
            <span className="text-2xl font-bold text-orange-400">
              Hope Foundation
            </span>
          </div>

          {/* Desktop Menu - RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-10">
            <a href="/" className="text-orange-500 font-semibold transition">
              Home
            </a>
            <a
              href="/programs"
              className="text-gray-600 hover:text-orange-500 font-medium transition"
            >
              Programs
            </a>
            <a
              href="/get-help"
              className="text-gray-600 hover:text-orange-500 font-medium transition"
            >
              Get Help
            </a>
            <a
              href="/stories"
              className="text-gray-600 hover:text-orange-500 font-medium transition"
            >
              Stories
            </a>
            <a
              href="/donate"
              className="text-gray-600 hover:text-orange-500 font-medium transition"
            >
              Donate
            </a>
            <a
              href="/Login"
              className="bg-orange-500 text-white px-8 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition-all"
            >
              Sign in
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-3 border-t pt-4">
            <a href="/" className="block text-orange-500 font-semibold py-2">
              Home
            </a>
            <a
              href="/programs"
              className="block text-gray-700 hover:text-orange-500 py-2"
            >
              Programs
            </a>
            <a
              href="/get-help"
              className="block text-gray-700 hover:text-orange-500 py-2"
            >
              Get Help
            </a>
            <a
              href="/stories"
              className="block text-gray-700 hover:text-orange-500 py-2"
            >
              Stories
            </a>
            <a
              href="/donate"
              className="block text-gray-700 hover:text-orange-500 py-2"
            >
              Donate
            </a>
            <a
              href="/Login"
              className="block bg-orange-500 text-white px-6 py-2 rounded-full text-center"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
