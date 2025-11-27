// File: app/dashboard/student/programs/page.tsx
"use client";

import { useState } from "react";
import { BookOpen, Brain, Users, Clock, Calendar, X } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function StudentMyProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollingProgram, setEnrollingProgram] = useState<any>(null);
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
                    <button 
                      onClick={() => setSelectedProgram(program)}
                      className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedProgram(program);
                        setShowScheduleModal(true);
                      }}
                      className="bg-white text-gray-700 px-6 py-2 rounded-full font-semibold border border-gray-300 hover:bg-gray-50 transition"
                    >
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
                    <button 
                      onClick={() => {
                        setEnrollingProgram(program);
                        setShowEnrollModal(true);
                      }}
                      className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Program Details Modal */}
      {selectedProgram && !showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative">
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className={`${selectedProgram.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange-600`}>
                {selectedProgram.icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedProgram.name}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Next Session</h3>
                <p className="text-gray-600">{selectedProgram.nextSession}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Progress</h3>
                <p className="text-gray-600">{selectedProgram.sessionsInfo} - {selectedProgram.progress}% completed</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">This program helps you develop skills and achieve your goals through structured sessions and personalized support.</p>
              </div>

              <button
                onClick={() => setSelectedProgram(null)}
                className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative">
            <button
              onClick={() => {
                setShowScheduleModal(false);
                setSelectedProgram(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Schedule Session
              </h2>
              <p className="text-gray-600">{selectedProgram.name}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  📅 Your counselor will confirm the session within 24 hours.
                </p>
              </div>

              <button
                onClick={() => {
                  alert('Session scheduled successfully!');
                  setShowScheduleModal(false);
                  setSelectedProgram(null);
                }}
                className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition"
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enroll Modal */}
      {showEnrollModal && enrollingProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative">
            <button
              onClick={() => {
                setShowEnrollModal(false);
                setEnrollingProgram(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="text-5xl mb-4">{enrollingProgram.icon}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Enroll in {enrollingProgram.name}
              </h2>
              <p className="text-gray-600">{enrollingProgram.description}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Program Details</h3>
                <p className="text-gray-600">Current participants: {enrollingProgram.participants}</p>
                <p className="text-gray-600">Duration: 10-15 sessions</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  ✅ By enrolling, you'll get access to all program resources and scheduled sessions.
                </p>
              </div>

              <button
                onClick={() => {
                  alert(`Successfully enrolled in ${enrollingProgram.name}!`);
                  setShowEnrollModal(false);
                  setEnrollingProgram(null);
                }}
                className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition"
              >
                Confirm Enrollment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}