// File: app/dashboard/student/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Heart,
  Award,
  TrendingUp,
  Lightbulb,
  Brain,
  X,
  Send,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface Program {
  id: string;
  name: string;
  nextSession: string;
  progress: number;
  progressText: string;
  icon: React.ReactNode;
  bgColor: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
}

export default function StudentDashboard() {
  const studentName = "Student";
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [programs, setPrograms] = useState<Program[]>([]);
  const [stats, setStats] = useState({ programs: 0, sessions: 0, hours: 0, achievements: 0 });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/dashboard/student/stats");
      const data = await response.json();
      if (data.programs) setPrograms(data.programs);
      if (data.stats) setStats(data.stats);
    } catch (err) {
      console.error("Failed to fetch dashboard data");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/support-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priority: "Medium",
          category: "Counseling Request",
          subject: "Student needs counselor support",
          description: message,
          status: "Pending",
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setMessage("");
        setTimeout(() => {
          setSuccess(false);
          setShowModal(false);
        }, 2000);
      } else {
        setError("Failed to send request. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const defaultPrograms: Program[] = [
    {
      id: "1",
      name: "Math Tutoring",
      nextSession: "Tomorrow at 3:00 PM",
      progress: 65,
      progressText: "65% completed this month",
      icon: <BookOpen className="w-6 h-6" />,
      bgColor: "bg-orange-50",
    },
    {
      id: "2",
      name: "Counseling Sessions",
      nextSession: "Thursday at 2:00 PM",
      progress: 80,
      progressText: "8 of 10 sessions completed",
      icon: <Brain className="w-6 h-6" />,
      bgColor: "bg-pink-100",
    },
    {
      id: "3",
      name: "Art Club",
      nextSession: "Friday at 4:00 PM",
      progress: 40,
      progressText: "4 projects completed",
      icon: <Users className="w-6 h-6" />,
      bgColor: "bg-yellow-50",
    },
  ];

  const displayPrograms = programs.length > 0 ? programs : defaultPrograms;

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Perfect Attendance",
      description: "This week",
      icon: <Award className="w-6 h-6" />,
      bgColor: "bg-yellow-100",
    },
    {
      id: "2",
      title: "Quiz Master",
      description: "Math practice",
      icon: <BookOpen className="w-6 h-6" />,
      bgColor: "bg-orange-100",
    },
    {
      id: "3",
      title: "Helpful Friend",
      description: "Support group",
      icon: <Heart className="w-6 h-6" />,
      bgColor: "bg-pink-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <a
              href="/dashboard/student"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 text-orange-600 font-medium"
            >
              <TrendingUp className="w-5 h-5" />
              Dashboard
            </a>
            <a
              href="/dashboard/student/programs"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <BookOpen className="w-5 h-5" />
              My Programs
            </a>
            <a
              href="/dashboard/student/resources"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Lightbulb className="w-5 h-5" />
              Resources
            </a>
            <a
              href="/dashboard/student/support"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Heart className="w-5 h-5" />
              Get Support
            </a>
            <a
              href="/dashboard/student/achievements"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Award className="w-5 h-5" />
              Achievements
            </a>
            <a
              href="/dashboard/student/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Users className="w-5 h-5" />
              Settings
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              Welcome back, {studentName}! 👏
            </h1>
            <p className="text-gray-600 text-lg">
              You're doing amazing! Keep up the great progress.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Programs Active */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 font-medium">
                  Programs Active
                </span>
                <BookOpen className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-4xl font-bold text-gray-800">{stats.programs || displayPrograms.length}</div>
            </div>

            {/* Sessions Done */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 font-medium">Sessions Done</span>
                <Award className="w-5 h-5 text-pink-500" />
              </div>
              <div className="text-4xl font-bold text-gray-800">{stats.sessions || 12}</div>
            </div>

            {/* This Week */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 font-medium">This Week</span>
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-4xl font-bold text-gray-800">{stats.hours || 8}h</div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 font-medium">Achievements</span>
                <Heart className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-4xl font-bold text-gray-800">{stats.achievements || 5}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* My Programs */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">My Programs</h2>

              {displayPrograms.map((program) => (
                <div
                  key={program.id}
                  className={`${program.bgColor} rounded-2xl p-6`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-white rounded-xl p-3 text-orange-600">
                      {program.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {program.name}
                      </h3>
                      <p className="text-gray-600">
                        Next session: {program.nextSession}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="w-full bg-pink-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-orange-500 h-full rounded-full transition-all"
                        style={{ width: `${program.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {program.progressText}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Need Support Card */}
              <div className="bg-gradient-to-br from-orange-400 via-pink-300 to-purple-300 rounded-2xl p-6 text-white">
                <Heart className="w-10 h-10 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Need Support?</h3>
                <p className="text-white/90 mb-4">
                  Our counselors are here to help you anytime.
                </p>
                <button 
                  onClick={() => setShowModal(true)}
                  className="w-full bg-pink-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-pink-300 transition"
                >
                  Talk to a Counselor
                </button>
              </div>

              {/* Recent Achievements */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  Recent Achievements 🏆
                </h3>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`${achievement.bgColor} rounded-xl p-2 text-orange-600`}
                      >
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Inspiration */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Today's Inspiration
                </h3>
                <p className="text-gray-600 italic leading-relaxed">
                  "You are braver than you believe, stronger than you seem, and
                  smarter than you think."
                </p>
              </div>
            </div>
          </div>

          {/* Helpful Resources */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Helpful Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a 
                href="https://www.youtube.com/results?search_query=study+tips+for+students"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Study Tips
                </h3>
                <p className="text-gray-600 text-sm">
                  Articles and videos to help you learn better
                </p>
              </a>

              <a 
                href="https://www.youtube.com/results?search_query=guided+meditation+for+students"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Relaxation Videos
                </h3>
                <p className="text-gray-600 text-sm">
                  Guided meditation and calming exercises
                </p>
              </a>

              <a 
                href="/stories"
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Success Stories
                </h3>
                <p className="text-gray-600 text-sm">
                  Read inspiring stories from other students
                </p>
              </a>

              <a 
                href="https://www.youtube.com/results?search_query=educational+games+for+students"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Learning Games
                </h3>
                <p className="text-gray-600 text-sm">
                  Fun educational games and activities
                </p>
              </a>
            </div>
          </div>
        </main>
      </div>

      {/* Support Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-pink-100 text-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Heart className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Talk to a Counselor
              </h2>
              <p className="text-gray-600">
                Tell us what's on your mind. A counselor will reach out to you soon.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How can we help you? *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share what you're going through... Your message is confidential."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  🔒 Your message is private and confidential. A counselor will contact you within 24 hours.
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-600">
                  ✅ Request sent! A counselor will contact you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white py-4 rounded-full font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
