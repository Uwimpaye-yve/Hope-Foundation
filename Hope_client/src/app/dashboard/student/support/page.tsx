// File: app/dashboard/student/support/page.tsx
"use client";

import { MessageCircle, Phone, Mail, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function StudentSupportPage() {
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

            <form className="space-y-6">
              {/* Type of Support */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Type of Support</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50">
                  <option>Select type</option>
                  <option>Academic Help</option>
                  <option>Mental Health</option>
                  <option>Program Question</option>
                  <option>Technical Issue</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Priority Level */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Priority Level</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50">
                  <option>Select priority</option>
                  <option>Low - Can wait a few days</option>
                  <option>Medium - Need help this week</option>
                  <option>High - Need help today</option>
                  <option>Urgent - Emergency</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-4 rounded-full font-semibold hover:bg-orange-600 transition"
                >
                  Submit Request
                </button>
                <button
                  type="button"
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