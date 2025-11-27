"use client";

import { useState } from "react";
import CounselorLayout from "@/components/counselor/CounselorLayout";
import { Calendar, Clock, User, Plus, Video, Phone } from "lucide-react";
import VideoCall from "@/components/VideoCall";

interface Session {
  id: string;
  studentName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: string;
  notes?: string;
}

export default function CounselorSessionsPage() {
  const [sessions] = useState<Session[]>([
    {
      id: "1",
      studentName: "John Doe",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: 60,
      type: "Individual Counseling",
      status: "Scheduled"
    },
    {
      id: "2", 
      studentName: "Sarah Johnson",
      date: "2024-01-20",
      time: "2:00 PM",
      duration: 45,
      type: "Academic Support",
      status: "Scheduled"
    },
    {
      id: "3",
      studentName: "John Doe",
      date: "2024-01-18",
      time: "10:00 AM", 
      duration: 60,
      type: "Individual Counseling",
      status: "Completed",
      notes: "Student showed good progress in managing stress levels."
    }
  ]);

  const [showNewSession, setShowNewSession] = useState(false);
  const [activeCall, setActiveCall] = useState<string | null>(null);

  const upcomingSessions = sessions.filter(s => s.status === "Scheduled");
  const completedSessions = sessions.filter(s => s.status === "Completed");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <CounselorLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sessions</h1>
            <p className="text-gray-600">Manage your counseling sessions</p>
          </div>
          <button
            onClick={() => setShowNewSession(true)}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Schedule Session
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Sessions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Sessions</h2>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <h3 className="font-semibold text-gray-800">{session.studentName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(session.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{session.time} ({session.duration}min)</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{session.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setActiveCall(session.studentName)}
                      className="flex-1 bg-orange-500 text-white px-3 py-2 rounded text-sm hover:bg-orange-600 transition flex items-center justify-center gap-1"
                    >
                      <Video className="w-4 h-4" />
                      Join Video
                    </button>
                    <button 
                      onClick={() => alert('Demo: Phone call would start here. In production, this would integrate with a calling service.')}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition flex items-center gap-1"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </button>
                  </div>
                </div>
              ))}

              {upcomingSessions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No upcoming sessions
                </div>
              )}
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Sessions</h2>
            <div className="space-y-4">
              {completedSessions.map((session) => (
                <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <h3 className="font-semibold text-gray-800">{session.studentName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(session.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{session.time} ({session.duration}min)</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{session.type}</p>
                      {session.notes && (
                        <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          <strong>Notes:</strong> {session.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {completedSessions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No completed sessions
                </div>
              )}
            </div>
          </div>
        </div>

        {/* New Session Modal */}
        {showNewSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Schedule New Session</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option>Select student</option>
                    <option>John Doe</option>
                    <option>Sarah Johnson</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option>30</option>
                    <option>45</option>
                    <option>60</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewSession(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                  >
                    Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Video Call Modal */}
        {activeCall && (
          <VideoCall 
            studentName={activeCall} 
            onClose={() => setActiveCall(null)} 
          />
        )}
      </div>
    </CounselorLayout>
  );
}