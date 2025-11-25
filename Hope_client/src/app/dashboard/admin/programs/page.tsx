// File: app/admin/programs/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AdminProgramsPage() {
  const programs = [
    {
      id: "1",
      title: "Academic Tutoring",
      description:
        "One-on-one tutoring for students struggling with core subjects",
      studentsEnrolled: 45,
      sessionsCompleted: 120,
      schedule: "Mon, Wed, Fri",
      status: "Active",
    },
    {
      id: "2",
      title: "Mental Health Support",
      description: "Professional counseling and emotional support services",
      studentsEnrolled: 32,
      sessionsCompleted: 85,
      schedule: "Tue, Thu",
      status: "Active",
    },
    {
      id: "3",
      title: "Career Guidance",
      description:
        "Help students explore career paths and develop professional skills",
      studentsEnrolled: 28,
      sessionsCompleted: 64,
      schedule: "Wednesday",
      status: "Active",
    },
    {
      id: "4",
      title: "Community Service",
      description: "Volunteer opportunities to build character and give back",
      studentsEnrolled: 52,
      sessionsCompleted: 45,
      schedule: "Weekends",
      status: "Active",
    },
  ];

  return (
    <div>
      {/* Header with Navigation */}
      <Navbar />
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <div>
              <h1 className="text-3xl font-bold text-gray-700">Programs</h1>
              <p className="text-gray-500 mt-1">
                Manage all programs and activities
              </p>
            </div>
          </div>

          {/* Create Program Button */}
          <Link
            href="/dashboard/admin/programs/create"
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Program
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition"
            >
              {/* Header with Icon and Status */}
              <div className="flex items-start justify-between mb-4">
                {/* Book Icon */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
                    </svg>
                  </div>
                </div>

                {/* Active Badge */}
                <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  {program.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                {program.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6">{program.description}</p>

              {/* Stats */}
              <div className="space-y-3 mb-6">
                {/* Students Enrolled */}
                <div className="flex items-center gap-2 text-gray-700">
                  <svg
                    className="w-5 h-5 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span>{program.studentsEnrolled} students enrolled</span>
                </div>

                {/* Sessions Completed */}
                <div className="flex items-center gap-2 text-gray-700">
                  <svg
                    className="w-5 h-5 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{program.sessionsCompleted} sessions completed</span>
                </div>

                {/* Schedule */}
                <div className="flex items-center gap-2 text-gray-700">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Schedule: {program.schedule}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link
                  href={`/admin/programs/${program.id}`}
                  className="flex-1 text-center px-6 py-3 bg-gray-50 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition"
                >
                  View Details
                </Link>
                <Link
                  href={`/admin/programs/${program.id}/manage`}
                  className="flex-1 text-center px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
                >
                  Manage
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/*
==============================================
FEATURES:
==============================================

✅ Header with "Create Program" button
✅ Grid layout (2 columns on desktop)
✅ Program cards with:
   - Book icon in orange circle
   - Active badge
   - Title and description
   - Students enrolled (orange icon)
   - Sessions completed (pink icon)
   - Schedule (yellow icon)
   - View Details button (gray)
   - Manage button (orange)
✅ Hover effects on cards
✅ Responsive design
*/
