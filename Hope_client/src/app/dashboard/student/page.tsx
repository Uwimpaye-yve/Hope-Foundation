// File: app/dashboard/student/page.tsx
"use client";

import {
  BookOpen,
  Users,
  Heart,
  Award,
  TrendingUp,
  Lightbulb,
  Brain,
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

  const programs: Program[] = [
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
              <div className="text-4xl font-bold text-gray-800">3</div>
            </div>

            {/* Sessions Done */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 font-medium">Sessions Done</span>
                <Award className="w-5 h-5 text-pink-500" />
              </div>
              <div className="text-4xl font-bold text-gray-800">12</div>
            </div>

            {/* This Week */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 font-medium">This Week</span>
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-4xl font-bold text-gray-800">8h</div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 font-medium">Achievements</span>
                <Heart className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-4xl font-bold text-gray-800">5</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* My Programs */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">My Programs</h2>

              {programs.map((program) => (
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
                <button className="w-full bg-pink-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-pink-300 transition">
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
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Study Tips
                </h3>
                <p className="text-gray-600 text-sm">
                  Articles and videos to help you learn better
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Relaxation Videos
                </h3>
                <p className="text-gray-600 text-sm">
                  Guided meditation and calming exercises
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Success Stories
                </h3>
                <p className="text-gray-600 text-sm">
                  Read inspiring stories from other students
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Learning Games
                </h3>
                <p className="text-gray-600 text-sm">
                  Fun educational games and activities
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
