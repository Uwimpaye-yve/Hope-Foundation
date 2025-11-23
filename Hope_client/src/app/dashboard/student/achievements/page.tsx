// File: app/dashboard/student/achievements/page.tsx
"use client";

import { Award, Star, Heart, Zap, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function StudentAchievementsPage() {
  const earnedAchievements = [
    {
      id: "1",
      title: "First Week Complete",
      description: "Completed your first week in the program",
      earnedDate: "Jan 22, 2024",
      icon: <Star className="w-6 h-6" />,
      bgColor: "bg-yellow-50"
    },
    {
      id: "2",
      title: "Perfect Attendance",
      description: "Attended all sessions for a month",
      earnedDate: "Feb 15, 2024",
      icon: <Award className="w-6 h-6" />,
      bgColor: "bg-green-50"
    },
    {
      id: "3",
      title: "Helping Hand",
      description: "Completed 10 hours of community service",
      earnedDate: "Mar 8, 2024",
      icon: <Heart className="w-6 h-6" />,
      bgColor: "bg-pink-50"
    },
    {
      id: "4",
      title: "Quick Learner",
      description: "Improved grade by one letter in any subject",
      earnedDate: "Mar 20, 2024",
      icon: <Zap className="w-6 h-6" />,
      bgColor: "bg-blue-50"
    }
  ];

  const lockedAchievements = [
    {
      id: "1",
      title: "Champion",
      description: "Complete 6 months in all programs",
      progress: 65,
      icon: <Trophy className="w-6 h-6" />
    },
    {
      id: "2",
      title: "Mentor",
      description: "Help another student succeed",
      progress: 0,
      icon: <Award className="w-6 h-6" />
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
            <a href="/dashboard/student/programs" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              My Programs
            </a>
            <a href="/dashboard/student/resources" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              Resources
            </a>
            <a href="/dashboard/student/support" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
              Get Support
            </a>
            <a href="/dashboard/student/achievements" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 text-orange-600 font-medium">
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
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Achievements</h1>
            <p className="text-gray-600 text-lg">Track your progress and celebrate your wins!</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-6 h-6 text-orange-500" />
                <span className="text-gray-600 font-medium">Total Achievements</span>
              </div>
              <div className="text-4xl font-bold text-gray-800">4/6</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-6 h-6 text-orange-500" />
                <span className="text-gray-600 font-medium">Points Earned</span>
              </div>
              <div className="text-4xl font-bold text-gray-800">450</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-orange-500" />
                <span className="text-gray-600 font-medium">Current Streak</span>
              </div>
              <div className="text-4xl font-bold text-gray-800">12 days</div>
            </div>
          </div>

          {/* Earned Achievements */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Earned Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {earnedAchievements.map((achievement) => (
                <div key={achievement.id} className={`${achievement.bgColor} rounded-2xl p-6 border-2 border-transparent hover:border-orange-300 transition`}>
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-xl p-3 text-orange-600">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{achievement.title}</h3>
                        <span className="px-3 py-1 bg-pink-200 text-pink-700 text-xs font-semibold rounded-full">
                          Earned
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{achievement.description}</p>
                      <p className="text-sm text-gray-500">Earned on {achievement.earnedDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Locked Achievements */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Locked Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lockedAchievements.map((achievement) => (
                <div key={achievement.id} className="bg-gray-100 rounded-2xl p-6 opacity-75">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-gray-200 rounded-xl p-3 text-gray-500">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-700">{achievement.title}</h3>
                        <span className="px-3 py-1 bg-gray-300 text-gray-600 text-xs font-semibold rounded-full">
                          Locked
                        </span>
                      </div>
                      <p className="text-gray-600">{achievement.description}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold text-gray-700">{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-full rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
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