"use client";
import { useState } from "react";
import { Users, BookOpen, Heart, TrendingUp, Search, Plus } from "lucide-react";

interface Student {
  id: string;
  name: string;
  age: number;
  programs: number;
  lastActive: string;
  avatar: string;
  avatarColor: string;
}
interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const students: Student[] = [
    {
      id: "5",
      name: "Bebe d",
      age: 5,
      programs: 2,
      lastActive: "Yesterday",
      avatar: "B",
      avatarColor: "bg-orange-400",
    },
    {
      id: "1",
      name: "Kevine G",
      age: 8,
      programs: 1,
      lastActive: "Yesterday",
      avatar: "K",
      avatarColor: "bg-orange-400",
    },
  ];

  const recentActivities: Activity[] = [
    {
      id: "2",
      title: "New Student",
      description: "Joined",
      time: "1 hour",
    },
    {
      id: "3",
      title: "New Student",
      description: "Joined",
      time: "2 hour",
    },
  ];

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className="px-6 lg:px-8 py-12">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Manage students, programs, and track impact
            </p>
          </div>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <a href="">Add New Student</a>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Total Students</span>
              <div className="w-10 h-10 flex iems-center justify-center">
                <Users className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">50</div>
            <div className="text-green-500 text-sm font-medium">
              +5 this month
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Active Programs</span>
              <div className="w-10 h-10 bg-pink rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-pink-500" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">15</div>
            <div className="text-green-500 text-sm font-medium">
              All running smoothly
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">
                Support Requests
              </span>
              <div className="w-10 h-10 items-center justify-center">
                <Heart className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">0</div>
            <div className="text-orange-500 text-sm font-medium">
              2 pending response
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Success Rate</span>
              <div className="w-10 h-10 bg-green-160 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">50%</div>
            <div className="text-green-500 text-sm font-medium">
              +5% from last month
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray- 800">
                Active students
              </h2>
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Students."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="space-y-4 mb-6">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${student.avatar}`}
                    >
                      {student.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {student.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Age {student.age} • {student.programs} programs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      {student.lastActive}
                    </span>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">
              <a href=""> Load More Students </a>
            </button>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Quick actions
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
                <Plus className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">
                  {" "}
                  <a href="">Add Student </a>{" "}
                </span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray50 transition text-left">
                <BookOpen className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">
                  <a href="">Create Program </a>
                </span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
                <Heart className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">
                  <a href="">View Support Request </a>
                </span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left">
                <TrendingUp className="w-5 h-5  text-gray-600" />
                <span className="font-medium text-gray-700">
                  <a href=""> Generate Report </a>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Program Overview
            </h2>
            <button className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <a href="">New Program </a>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-orange-50 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Education
              </h3>
              <div className="text-3xl font-bold text-orange-500 mb-2">
                5 programs
              </div>
              <p className="text-gray-600 text-sm">100 students enrolled</p>
            </div>
            <div className="bg-pink-50 rounded-2xl p-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Mental Health
              </h3>
              <div className="text-3xl font-bold text-pink-500 mb-2">
                5 programs
              </div>
              <p className="text-gray-600 text-sm">100 studentsenrolled</p>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Community
              </h3>
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                4 programs
              </div>
              <p className="text-gray-600 text-sm">98 students enrolled</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="pb-4 border-b border-gray-100 last:pb-0"
                >
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {activity.description}
                  </p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradiesnt-to-br from-orange-400 via-pink-300 to-purple-300 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Manage Stories</h2>
            <p className="text-white/90 mb-4">
              Review and publish new success stories
            </p>
            <button className="w-full bg-pink-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-pink-300 transition">
              {" "}
              <a href=""> View Submissions </a>{" "}
            </button>
          </div>
        </div>
      </div>

  );
}
