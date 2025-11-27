"use client";
import { useState } from "react";
import { Heart, Phone, Mail, MessageCircle, Video, X, PhoneCall } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GetHelpPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showChatModal, setShowChatModal] = useState(false);
  const [callType, setCallType] = useState<'video' | 'audio' | null>(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_URL}/support-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priority: "Medium", // You can add a dropdown for this
          category: "General Support", // You can add a dropdown for this
          subject: `Support request from ${formData.name}`,
          description: `Name: ${formData.name}\nAge: ${formData.age}\nEmail: ${
            formData.email
          }\nPhone: ${formData.phone || "Not provided"}\n\nMessage:\n${
            formData.message
          }`,
          status: "Pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setSuccess(true);
      setFormData({
        name: "",
        age: "",
        email: "",
        phone: "",
        message: "",
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-pink-200 text-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center">
              <Heart className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
            We are here to help
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Reach out and connect with our caring counselors and support groups.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Call Us */}
            <div className="text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Phone className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Call Us</h2>
              <p className="text-gray-600 mb-4">Helpline</p>
              <a
                href="tel:+250791279477"
                className="text-orange-500 text-xl font-semibold hover:text-orange-600 transition"
              >
                +250 (791) 279477
              </a>
            </div>

            {/* Email Us */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-pink-200 text-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Mail className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Email Us
              </h2>
              <p className="text-gray-600 mb-4">Quick Response</p>
              <a
                href="mailto:hopefoundation@example.org"
                className="text-orange-500 text-xl font-semibold hover:text-orange-600 transition"
              >
                hopefoundation@example.org
              </a>
            </div>

            {/* Live Chat */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-yellow-100 text-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Live Chat
              </h2>
              <p className="text-gray-600 mb-4">Chat with a Counselor</p>
              <button 
                onClick={() => setShowChatModal(true)}
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Request Support Form */}
      <section className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Request Support
            </h2>
            <p className="text-lg text-gray-600">
              Fill out this form and a counselor will reach out to you. All
              information is confidential.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">
                  ✓ Your request has been submitted successfully!
                </p>
                <p className="text-green-700 text-sm mt-1">
                  A counselor will reach out to you soon.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-semibold">✗ {error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Name + Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                    placeholder="Your age"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                    placeholder="+250 (791) 279477"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  How can we help you? *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  placeholder="Tell us what you're going through... Your message is confidential."
                ></textarea>
              </div>

              {/* Privacy Notice */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Your privacy is important:</strong> All communications
                  are confidential and secure. We never share your information
                  without your permission.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Crisis Support */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-orange-400 via-orange-300 to-pink-200 rounded-3xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-4">Crisis Support</h2>
            <p className="text-white/90 text-lg mb-6">
              If you're in immediate danger or having thoughts of self-harm,
              please call our 24/7 crisis line or emergency services
              immediately.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+250791279477"
                className="bg-pink-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-pink-300 transition"
              >
                Call Crisis Hotline: +250 (791) 279477
              </a>

              <a
                href="tel:112"
                className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Emergency: 112
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Video/Audio Call Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative">
            <button
              onClick={() => {
                setShowChatModal(false);
                setCallType(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            {!callType ? (
              <>
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="bg-orange-100 text-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center">
                      <MessageCircle className="w-8 h-8" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Connect with a Counselor
                  </h2>
                  <p className="text-gray-600">
                    Choose how you'd like to connect with our support team
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Video Call */}
                  <button
                    onClick={() => setCallType('video')}
                    className="bg-gradient-to-br from-orange-400 to-orange-500 text-white p-8 rounded-2xl hover:shadow-lg transition group"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                        <Video className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Video Call</h3>
                    <p className="text-white/90">
                      Face-to-face conversation with a counselor
                    </p>
                  </button>

                  {/* Audio Call */}
                  <button
                    onClick={() => setCallType('audio')}
                    className="bg-gradient-to-br from-pink-400 to-pink-500 text-white p-8 rounded-2xl hover:shadow-lg transition group"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                        <PhoneCall className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Voice Call</h3>
                    <p className="text-white/90">
                      Private audio conversation with a counselor
                    </p>
                  </button>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    🔒 All calls are private and confidential. Average wait time: 2-5 minutes
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      callType === 'video' ? 'bg-orange-100 text-orange-500' : 'bg-pink-100 text-pink-500'
                    }`}>
                      {callType === 'video' ? <Video className="w-8 h-8" /> : <PhoneCall className="w-8 h-8" />}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {callType === 'video' ? 'Video Call' : 'Voice Call'} Session
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Connecting you with an available counselor...
                  </p>
                </div>

                {/* Simulated Call Interface */}
                <div className="bg-gray-900 rounded-2xl aspect-video mb-6 flex items-center justify-center relative overflow-hidden">
                  {callType === 'video' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-pink-400/20" />
                  )}
                  <div className="text-center z-10">
                    <div className="animate-pulse mb-4">
                      {callType === 'video' ? (
                        <Video className="w-16 h-16 text-white mx-auto" />
                      ) : (
                        <PhoneCall className="w-16 h-16 text-white mx-auto" />
                      )}
                    </div>
                    <p className="text-white text-lg font-semibold">Connecting...</p>
                    <p className="text-white/70 text-sm mt-2">Please wait while we find an available counselor</p>
                  </div>
                </div>

                {/* Call Controls */}
                <div className="flex justify-center gap-4">
                  <button className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition flex items-center gap-2">
                    <PhoneCall className="w-5 h-5" />
                    Accept
                  </button>
                  <button 
                    onClick={() => {
                      setShowChatModal(false);
                      setCallType(null);
                    }}
                    className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    End Call
                  </button>
                </div>

                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    💡 <strong>Demo Mode:</strong> This is a demonstration. In production, this would connect to a real counselor via WebRTC.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
