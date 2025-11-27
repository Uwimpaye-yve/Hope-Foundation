"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Mail, Phone, Calendar, BookOpen, TrendingUp } from "lucide-react";

export default function StudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Mock student data
  const student = {
    id: params.id,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    enrollmentDate: new Date().toISOString(),
    status: "Active",
    age: 16,
    grade: "10th Grade",
    programs: ["Academic Tutoring", "Mental Health Support"],
    progress: 75,
    sessions: 12,
    notes: "Student is making excellent progress in math and science."
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Students
        </button>

        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {student.firstName[0]}{student.lastName[0]}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{student.firstName} {student.lastName}</h1>
                <p className="text-gray-600">{student.grade}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {student.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{student.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{student.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Age: {student.age}</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Sessions Completed: {student.sessions}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-orange-500 h-3 rounded-full" 
                  style={{ width: `${student.progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600">{student.progress}%</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Enrolled Programs</h3>
            <div className="flex flex-wrap gap-2">
              {student.programs.map((program, index) => (
                <span key={index} className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
                  {program}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Counselor Notes</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">{student.notes}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push('/dashboard/counselor/students')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Back to Students
          </button>
          <button
            onClick={() => alert('Schedule session feature coming soon!')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Schedule Session
          </button>
        </div>
      </div>
    </div>
  );
}
