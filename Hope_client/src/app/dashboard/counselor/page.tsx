"use client";
import React, { useState } from 'react';
import {Users, Calendar, CheckCircle, Search, Mail, Video, Phone, Clock, AlertCircle, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Student {
  id: number;
  name: string;
  initials: string;
  lastSession: string;
  progress: number;
  priority: string;
  status: string;
}

interface Session {
  id: number;
  student: string;
  topic: string;
  time: string;
  icon: string;
  iconBg: string;
}

interface SupportRequest {
  id: number;
  student: string;
  issue: string;
  time: string;
  priority: string;
  priorityColor: string;
}

interface SessionNote {
  id: number;
  sessionId: number;
  student: string;
  date: string;
  notes: string;
  duration: string;
}

const CounselorDashboard = () => {
  const [currentTab, setCurrentTab] = useState('my-students');
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  const [assignedStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      initials: 'SJ',
      lastSession: '2 days ago',
      progress: 75,
      priority: 'high priority',
      status: 'active'
    },
    {
      id: 2,
      name: 'Michael Chen',
      initials: 'MC',
      lastSession: '5 days ago',
      progress: 45,
      priority: 'medium priority',
      status: 'active'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      initials: 'ER',
      lastSession: '1 day ago',
      progress: 90,
      priority: 'low priority',
      status: 'active'
    },
    {
      id: 4,
      name: 'David Kim',
      initials: 'DK',
      lastSession: '3 days ago',
      progress: 60,
      priority: 'medium priority',
      status: 'active'
    }
  ]);

  const [upcomingSessions] = useState<Session[]>([
    {
      id: 1,
      student: 'Sarah Johnson',
      topic: 'Anxiety Management',
      time: 'Today, 2:00 PM',
      icon: 'video',
      iconBg: 'bg-orange-100'
    },
    {
      id: 2,
      student: 'David Brown',
      topic: 'Progress Check-in',
      time: 'Today, 4:30 PM',
      icon: 'phone',
      iconBg: 'bg-green-100'
    },
    {
      id: 3,
      student: 'Michael Chen',
      topic: 'Stress Coping',
      time: 'Tomorrow, 10:00 AM',
      icon: 'video',
      iconBg: 'bg-orange-100'
    }
  ]);

  const [supportRequests] = useState<SupportRequest[]>([
    {
      id: 1,
      student: 'Sarah Johnson',
      issue: 'Anxiety',
      time: '30 mins ago',
      priority: 'Urgent',
      priorityColor: 'bg-red-100 text-red-700'
    },
    {
      id: 2,
      student: 'Michael Chen',
      issue: 'Academic Stress',
      time: '2 hours ago',
      priority: 'High',
      priorityColor: 'bg-orange-100 text-orange-700'
    },
    {
      id: 3,
      student: 'Emma Rodriguez',
      issue: 'Family Issues',
      time: '5 hours ago',
      priority: 'Medium',
      priorityColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 4,
      student: 'David Kim',
      issue: 'Time Management',
      time: '1 day ago',
      priority: 'Low',
      priorityColor: 'bg-gray-100 text-gray-700'
    }
  ]);

  const [sessionNotes] = useState<SessionNote[]>([
    {
      id: 1,
      sessionId: 1,
      student: 'Sarah Johnson',
      date: 'Nov 20, 2024',
      notes: 'Student showed improvement in managing anxiety. Discussed coping strategies.',
      duration: '45 mins'
    },
    {
      id: 2,
      sessionId: 2,
      student: 'Michael Chen',
      date: 'Nov 19, 2024',
      notes: 'Focused on exam stress. Student practicing mindfulness techniques.',
      duration: '50 mins'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high priority': return 'bg-red-100 text-red-700';
      case 'medium priority': return 'bg-pink-100 text-pink-700';
      case 'low priority': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleViewProfile = (student: Student) => {
    alert(`Viewing profile for ${student.name}`);
  };

  const handleMessage = (student: Student) => {
    alert(`Opening message for ${student.name}`);
  };

  const handleJoinSession = (session: Session) => {
    alert(`Joining session with ${session.student}`);
  };

  const handleReschedule = (session: Session) => {
    alert(`Rescheduling session with ${session.student}`);
  };

  const handleRespond = (request: SupportRequest) => {
    alert(`Responding to ${request.student}'s request`);
  };

  const handleEmail = (request: SupportRequest) => {
    alert(`Sending email to ${request.student}`);
  };

  const handleScheduleNewSession = () => {
    alert('Opening schedule new session form');
  };

  const handleAddNote = () => {
    alert('Adding new session note');
  };

  const renderMyStudents = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Assigned Students</h2>
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
          />
        </div>
      </div>

      <div className="space-y-4">
        {assignedStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                  <span className="text-orange-700 font-semibold text-lg">{student.initials}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{student.name}</h3>
                  <p className="text-sm text-gray-600">Last session: {student.lastSession}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(student.priority)}`}>
                  {student.priority}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {student.status}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-semibold text-gray-800">{student.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${student.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleMessage(student)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
              <button 
                onClick={() => handleViewProfile(student)}
                className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSessions = () => (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Sessions</h2>
        </div>

        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${session.iconBg} rounded-lg flex items-center justify-center`}>
                    {session.icon === 'video' ? (
                      <Video className="w-6 h-6 text-orange-600" />
                    ) : (
                      <Phone className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{session.student}</h3>
                    <p className="text-gray-600">{session.topic}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4" />
                      {session.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleReschedule(session)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reschedule
                  </button>
                  <button 
                    onClick={() => handleJoinSession(session)}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    Join Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Session Notes</h2>
          <button 
            onClick={handleScheduleNewSession}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Schedule New Session
          </button>
        </div>

        {selectedSession ? (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{sessionNotes[0].student}</h3>
                <p className="text-sm text-gray-600">{sessionNotes[0].date} • {sessionNotes[0].duration}</p>
              </div>
              <button 
                onClick={() => setSelectedSession(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <textarea
              className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-40"
              defaultValue={sessionNotes[0].notes}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
                Save Note
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-16 border border-gray-200 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Select a session to view or add notes</p>
            <button 
              onClick={handleAddNote}
              className="mt-4 px-6 py-2 text-orange-500 hover:text-orange-600 font-medium"
            >
              Add New Note
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSupportRequests = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending Support Requests</h2>
      
      <div className="space-y-4">
        {supportRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  request.priority === 'Urgent' ? 'bg-red-100' : 'bg-orange-100'
                }`}>
                  <AlertCircle className={`w-6 h-6 ${
                    request.priority === 'Urgent' ? 'text-red-600' : 'text-orange-600'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-gray-800 text-lg">{request.student}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${request.priorityColor}`}>
                      {request.priority}
                    </span>
                  </div>
                  <p className="text-gray-800">{request.issue}</p>
                  <p className="text-sm text-gray-500 mt-1">{request.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleEmail(request)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button 
                  onClick={() => handleRespond(request)}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Respond
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl text-gray-600 mb-8">Welcome back, Dr. Anderson</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Assigned Students</p>
                <p className="text-4xl font-bold text-gray-800">24</p>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-7 h-7 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending Requests</p>
                <p className="text-4xl font-bold text-gray-800">8</p>
              </div>
              <div className="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Sessions This Week</p>
                <p className="text-4xl font-bold text-gray-800">12</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Completed Cases</p>
                <p className="text-4xl font-bold text-gray-800">47</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setCurrentTab('my-students')}
            className={`pb-4 font-medium transition-colors relative ${
              currentTab === 'my-students'
                ? 'text-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Students
            {currentTab === 'my-students' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
            )}
          </button>
          <button
            onClick={() => setCurrentTab('sessions')}
            className={`pb-4 font-medium transition-colors relative ${
              currentTab === 'sessions'
                ? 'text-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sessions
            {currentTab === 'sessions' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
            )}
          </button>
          <button
            onClick={() => setCurrentTab('support-requests')}
            className={`pb-4 font-medium transition-colors relative ${
              currentTab === 'support-requests'
                ? 'text-gray-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Support Requests
            {currentTab === 'support-requests' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
            )}
          </button>
        </div>

        {/* Tab Content */}
        {currentTab === 'my-students' && renderMyStudents()}
        {currentTab === 'sessions' && renderSessions()}
        {currentTab === 'support-requests' && renderSupportRequests()}
      </div>
    </div>
  );
};

export default CounselorDashboard;