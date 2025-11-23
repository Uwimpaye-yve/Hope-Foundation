// File: app/dashboard/student/programs/page.tsx
"use client";

import { BookOpen, Brain, Users, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function StudentMyProgramsPage() {
  const enrolledPrograms = [
    {
      id: "1",
      name: "Math Tutoring",
      icon: <BookOpen className="w-6 h-6" />,
      nextSession: "Tomorrow at 3:00 PM",
      sessionsInfo: "13 of 20 sessions",
      progress: 65,
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100"
    },
    {
      id: "2",
      name: "Counseling Sessions",
      icon: <Brain className="w-6 h-6" />,
      nextSession: "Thursday at 2:00 PM",
      sessionsInfo: "8 of 10 sessions",
      progress: 80,
      bgColor: "bg-pink-100",
      iconBg: "bg-pink-200"
    },
    {
      id: "3",
      name: "Community Service",
      icon: <Users className="w-6 h-6" />,
      nextSession: "Saturday at 10:00 AM",
      sessionsInfo: "7 of 15 sessions",
      progress: 45,
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100"
    }
  ];

  const availablePrograms = [
    {
      id: "1",
      name: "Career Guidance",
      description: "Explore career paths and develop professional skills",
      participants: 28,
      icon: "📅"
    },
    {
      id: "2",
      name: "Art Therapy",
      description: "Express yourself through creative activities",
      participants: 15,
      icon: "🎨"
    }
  ];

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
            <a href="/dashboard/student/programs" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 text-orange-600 font-medium">
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
            <a href="/dashboard/student/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              Settings
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Programs</h1>
            <p className="text-gray-600 text-lg">Track your progress and upcoming sessions</p>
          </div>

          {/* Currently Enrolled */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Currently Enrolled</h2>
            <div className="space-y-6">
              {enrolledPrograms.map((program) => (
                <div key={program.id} className={`${program.bgColor} rounded-2xl p-6`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${program.iconBg} rounded-xl p-3 text-orange-600`}>
                      {program.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{program.name}</h3>
                      <div className="flex items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Next: {program.nextSession}</span>
                        </div>
                        <span>{program.sessionsInfo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="w-full bg-pink-200 rounded-full h-3">
                      <div 
                        className="bg-orange-500 h-full rounded-full"
                        style={{ width: `${program.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{program.progress}% completed</p>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition">
                      View Details
                    </button>
                    <button className="bg-white text-gray-700 px-6 py-2 rounded-full font-semibold border border-gray-300 hover:bg-gray-50 transition">
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Programs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availablePrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="text-4xl mb-4">{program.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{program.name}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{program.participants} participants</span>
                    <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition">
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}