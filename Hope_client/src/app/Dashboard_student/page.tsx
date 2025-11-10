"use client";
import { useState } from "react";
export default function StudentDashboard() {
  const [sidebar, setSidebar] = useState(false);

  const studentData = {
    name: "Yvette Uwimpaye",
    email: "stude@gmail.com",
    studentID: "Y20251",
    enrolledPrograms: 3,
    completedCourses: 5,
  };

  const programs = [
    { id: 1, name: "computer", status: "Active", progress: 50 },
    { id: 2, name: "English", status: "Active", progress: 80 },
    { id: 3, name: "Art", status: "Active", progress: 30 },
  ];

  const announcments = [
    { id: 1, title: "New workshop", date: "2025-10-25", type: "Event" },
    { id: 2, title: "Registration open", date: "2025-11-19", type: "Info" },
    {
      id: 3,
      title: "Scholarship application open",
      date: "2025-10-20",
      type: "Important",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`bg-orange-500 text-white w-64 fixed h-fulltrabsform transition-transform duration-300 ease-in-out z-30 ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl">
              🌟
            </div>
            <span className="text-xl font-bold">Hope Foundation</span>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 bg-teal-600 rounded-lg"
            >
              <span>📊</span>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex it ems-center gap-3 px-4 py-3 bg-teal-600 rounded-lg transition"
            >
              <span>📚</span>
              <span>My programs</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-4 bg-teal-600 rounded-lg transition"
            >
              <span>📅</span>
              <span>Schedule</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 bg-teal-600 rounded-lg transition"
            >
              <span>💬</span>
              <span>Messages</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 bg-teal-600 rounded-lg transition"
            >
              <span>👤</span>
              <span>Profile</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 bg-teal-600 rounded-lg transition"
            >
              <span>⚙️</span>
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </aside>
    </div>
  );
}
