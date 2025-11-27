// File: app/donate/page.tsx
"use client";

import { useState } from "react";
import { Heart, BookOpen, Users, Check, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const amounts = [25, 50, 100, 250, 500, 1000];

  const handleDonate = async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    
    if (!amount || amount < 1) {
      setError("Please select or enter a valid amount");
      return;
    }
    
    if (!donorName || !email) {
      setError("Please fill in your name and email");
      return;
    }

    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      setError("Please fill in all payment details");
      return;
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setError("Card number must be 16 digits");
      return;
    }

    if (cvv.length !== 3) {
      setError("CVV must be 3 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          donorName,
          email,
          message,
          isRecurring,
          paymentMethod: "card",
          status: "completed"
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setSelectedAmount(null);
        setCustomAmount("");
        setDonorName("");
        setEmail("");
        setMessage("");
        setCardNumber("");
        setCardName("");
        setExpiryDate("");
        setCvv("");
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.message || "Donation failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

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

            {/* Donor Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Your Information
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message (Optional)"
                  rows={3}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                />
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-gray-700">Make this a monthly recurring donation</span>
                </label>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Payment Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                      if (value.length <= 16) setCardNumber(formatted);
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 4) {
                          const formatted = value.length >= 2 ? value.slice(0, 2) + '/' + value.slice(2) : value;
                          setExpiryDate(formatted);
                        }
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 3) setCvv(value);
                      }}
                      placeholder="123"
                      maxLength={3}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
                    />
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                  🔒 Your payment information is secure and encrypted. We never store your card details.
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600">
                Thank you for your generous donation! You will receive a confirmation email shortly.
              </div>
            )}

            {/* Donate Button */}
            <button 
              onClick={handleDonate}
              disabled={loading}
              className="w-full bg-orange-400 text-white py-4 rounded-full font-semibold hover:bg-orange-500 transition text-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Donate Now"
              )}
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
                <button 
                  onClick={() => {
                    setIsRecurring(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-pink-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-pink-300 transition"
                >
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
                <a 
                  href="mailto:hopefoundation2024@gmail.com?subject=Corporate Sponsorship Inquiry"
                  className="inline-block bg-pink-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-pink-300 transition"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
