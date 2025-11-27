// File: app/dashboard/student/resources/page.tsx
"use client";

import { useState } from "react";
import { FileText, Video, BookOpen, Headphones, Download } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function StudentResourcesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const resources = [
    {
      id: "1",
      category: "Academic",
      title: "Study Tips Guide",
      description: "Effective study techniques and time management strategies",
      type: "PDF",
      icon: <FileText className="w-6 h-6" />,
      url: "https://www.youtube.com/results?search_query=study+tips+guide"
    },
    {
      id: "2",
      category: "Wellness",
      title: "Relaxation Exercises",
      description: "Guided meditation and breathing exercises for stress relief",
      type: "Video",
      icon: <Video className="w-6 h-6" />,
      url: "https://www.youtube.com/results?search_query=guided+meditation+relaxation"
    },
    {
      id: "3",
      category: "Career",
      title: "Career Planning Workbook",
      description: "Interactive workbook to explore career interests and goals",
      type: "PDF",
      icon: <BookOpen className="w-6 h-6" />,
      url: "https://www.youtube.com/results?search_query=career+planning+guide"
    },
    {
      id: "4",
      category: "Academic",
      title: "Focus Music Playlist",
      description: "Curated playlist to enhance concentration while studying",
      type: "Audio",
      icon: <Headphones className="w-6 h-6" />,
      url: "https://www.youtube.com/results?search_query=study+focus+music"
    },
    {
      id: "5",
      category: "Career",
      title: "College Application Guide",
      description: "Step-by-step guide for the college application process",
      type: "PDF",
      icon: <FileText className="w-6 h-6" />,
      url: "https://www.youtube.com/results?search_query=college+application+guide"
    },
    {
      id: "6",
      category: "Wellness",
      title: "Mental Health Awareness",
      description: "Understanding mental health and when to seek support",
      type: "Video",
      icon: <Video className="w-6 h-6" />,
      url: "https://www.youtube.com/results?search_query=mental+health+awareness"
    }
  ];

  const filters = ["All", "Academic", "Wellness", "Career"];

  const filteredResources = activeFilter === "All" 
    ? resources 
    : resources.filter(r => r.category === activeFilter);

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
            <a href="/dashboard/student/resources" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 text-orange-600 font-medium">
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
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Resources</h1>
            <p className="text-gray-600 text-lg">Helpful materials to support your journey</p>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-8">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  activeFilter === filter
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-orange-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="bg-orange-100 text-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  {resource.icon}
                </div>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-3">
                  {resource.category}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{resource.type}</span>
                  <a 
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 font-medium hover:text-orange-500 transition"
                  >
                    <Download className="w-4 h-4" />
                    Access
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}