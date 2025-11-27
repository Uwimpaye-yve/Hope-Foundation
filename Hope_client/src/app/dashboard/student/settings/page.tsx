// File: app/dashboard/student/settings/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Bell, Lock, Palette, LogOut, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function StudentSettingsPage() {
  const router = useRouter();
  const [name, setName] = useState("Sarah Johnson");
  const [email, setEmail] = useState("sarah.j@email.com");
  const [age, setAge] = useState("14");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleUpdateProfile = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    setPasswordLoading(true);
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill in all password fields");
      setPasswordLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match");
      setPasswordLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      setPasswordLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(""), 3000);
    } catch (err) {
      setPasswordError("Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/Login");
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
            <a href="/dashboard/student/support" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              Get Support
            </a>
            <a href="/dashboard/student/achievements" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              Achievements
            </a>
            <a href="/dashboard/student/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 text-orange-600 font-medium">
              Settings
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-gray-600 text-lg">Manage your account preferences</p>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
            </div>

            <div className="space-y-6">
              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                  {success}
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                />
              </div>

              <button 
                onClick={handleUpdateProfile}
                disabled={loading}
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Session Reminders</h3>
                  <p className="text-sm text-gray-600">Get notified before your sessions</p>
                </div>
                <label className="relative inline-block w-14 h-8">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-14 h-8 bg-orange-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Achievement Updates</h3>
                  <p className="text-sm text-gray-600">Celebrate your achievements</p>
                </div>
                <label className="relative inline-block w-14 h-8">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-14 h-8 bg-orange-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">New Resources</h3>
                  <p className="text-sm text-gray-600">Learn about new helpful resources</p>
                </div>
                <label className="relative inline-block w-14 h-8">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-orange-500 peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Security</h2>
            </div>

            <div className="space-y-6">
              {passwordSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                  {passwordSuccess}
                </div>
              )}

              {passwordError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {passwordError}
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                />
              </div>

              <button 
                onClick={handleUpdatePassword}
                disabled={passwordLoading}
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition disabled:opacity-50 flex items-center gap-2"
              >
                {passwordLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {passwordLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Preferences</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Email Digest</h3>
                  <p className="text-sm text-gray-600">Weekly summary of your progress</p>
                </div>
                <label className="relative inline-block w-14 h-8">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-14 h-8 bg-orange-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Public Profile</h3>
                  <p className="text-sm text-gray-600">Show your achievements to others</p>
                </div>
                <label className="relative inline-block w-14 h-8">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-orange-500 peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Logout Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-red-100">
            <div className="flex items-center gap-3 mb-6">
              <LogOut className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-800">Logout</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Sign out of your account. You'll need to log in again to access your dashboard.
            </p>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}