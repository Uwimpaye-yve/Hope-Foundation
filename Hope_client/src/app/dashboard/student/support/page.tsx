// File: app/dashboard/student/support/page.tsx
"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function StudentSupportPage() {
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!category || !priority || !subject || !description) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/support-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          priority,
          subject,
          description,
          studentId: '1',
          status: 'Pending',
        }),
      });

      if (response.ok) {
        setSuccess("Support request submitted successfully! We'll get back to you soon.");
        setCategory("");
        setPriority("");
        setSubject("");
        setDescription("");
      } else {
        setError("Failed to submit request. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <a href="/dashboard/student" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              Dashboard
            </a>
            <a href="/dashboard/student/programs" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              My Programs
            </a>
            <a href="/dashboard/student/resources" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              Resources
            </a>
            <a href="/dashboard/student/support" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 text-orange-600 font-medium">
              Get Support
            </a>
            <a href="/dashboard/student/achievements" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              Achievements
            </a>
            <a href="/dashboard/student/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              Settings
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Contact Options */}
          <div className="flex gap-4 mb-8">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
              Start Chat
            </button>
            <button className="bg-white text-gray-700 px-6 py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-50 transition">
              Call Now
            </button>
            <button className="bg-white text-gray-700 px-6 py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-50 transition">
              Send Email
            </button>
          </div>

          {/* Support Request Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-800">Submit a Support Request</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                />
              </div>

              {/* Type of Support */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Type of Support</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                >
                  <option value="">Select type</option>
                  <option value="Academic Help">Academic Help</option>
                  <option value="Mental Health">Mental Health</option>
                  <option value="Program Question">Program Question</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Priority Level */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Priority Level</label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                >
                  <option value="">Select priority</option>
                  <option value="Low">Low - Can wait a few days</option>
                  <option value="Medium">Medium - Need help this week</option>
                  <option value="High">High - Need help today</option>
                  <option value="Urgent">Urgent - Emergency</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                ></textarea>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                  {success}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-orange-500 text-white py-4 rounded-full font-semibold hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed transition"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCategory("");
                    setPriority("");
                    setSubject("");
                    setDescription("");
                    setError("");
                    setSuccess("");
                  }}
                  className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold border border-gray-300 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Crisis Support */}
          <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">In Crisis?</h3>
            <p className="text-gray-700 mb-4">
              If you're experiencing a mental health emergency, please contact:
            </p>
            <div className="space-y-2">
              <p className="text-gray-800">
                <strong>National Crisis Hotline:</strong> 988
              </p>
              <p className="text-gray-800">
                <strong>Crisis Text Line:</strong> Text HOME to 741741
              </p>
              <p className="text-gray-800">
                <strong>Emergency Services:</strong> 911
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}