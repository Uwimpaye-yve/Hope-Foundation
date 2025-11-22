// File: app/donate/page.tsx
"use client";

import { useState } from "react";
import { Heart, BookOpen, Users, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const amounts = [25, 50, 100, 250, 500, 1000];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-200 text-yellow-800 w-20 h-20 rounded-2xl flex items-center justify-center">
              <Heart className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
            Support Our Mission
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Your generosity helps us provide education, healthcare, and hope to
            children in need. Every contribution makes a lasting impact.
          </p>
        </div>
      </section>

      {/* Impact Cards */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* $25 */}
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8" />
                </div>
              </div>
              <div className="text-4xl font-bold text-orange-500 mb-3">$25</div>
              <p className="text-gray-600">
                Provides educational materials for one child for a month
              </p>
            </div>

            {/* $100 */}
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-pink-200 text-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Heart className="w-8 h-8" />
                </div>
              </div>
              <div className="text-4xl font-bold text-orange-500 mb-3">
                $100
              </div>
              <p className="text-gray-600">
                Funds counseling sessions for a child in need
              </p>
            </div>

            {/* $500 */}
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 text-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8" />
                </div>
              </div>
              <div className="text-4xl font-bold text-orange-500 mb-3">
                $500
              </div>
              <p className="text-gray-600">
                Supports a complete program for multiple children
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Make Your Donation
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {/* Select Amount */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Select Amount
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`px-6 py-4 rounded-xl border-2 font-bold text-lg transition ${
                      selectedAmount === amount
                        ? "border-orange-500 bg-orange-50 text-orange-500"
                        : "border-gray-300 text-gray-700 hover:border-orange-300"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Or Enter Custom Amount
              </h3>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                  $
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Your donation includes:
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700">Tax-deductible receipt</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Quarterly impact updates
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Recognition in our donor community
                  </span>
                </div>
              </div>
            </div>

            {/* Donate Button */}
            <button className="w-full bg-orange-400 text-white py-4 rounded-full font-semibold hover:bg-orange-500 transition text-lg mb-4">
              Donate Now
            </button>

            <p className="text-sm text-gray-500 text-center">
              Secure payment processing. Your information is protected.
            </p>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-orange-400 via-orange-300 to-purple-300 rounded-3xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-8">Other Ways to Give</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Monthly Giving */}
              <div>
                <h3 className="text-2xl font-bold mb-3">Monthly Giving</h3>
                <p className="text-white/90 mb-4">
                  Become a sustaining donor with recurring monthly
                  contributions.
                </p>
                <button className="bg-pink-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-pink-300 transition">
                  Set Up Monthly Gift
                </button>
              </div>

              {/* Corporate Sponsorship */}
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  Corporate Sponsorship
                </h3>
                <p className="text-white/90 mb-4">
                  Partner with us through corporate matching or sponsorship
                  programs.
                </p>
                <button className="bg-pink-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-pink-300 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
