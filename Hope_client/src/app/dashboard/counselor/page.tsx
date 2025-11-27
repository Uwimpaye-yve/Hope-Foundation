"use client";
import React, { useState, useEffect } from 'react';
import {Users, Calendar, CheckCircle, Search, Mail, Video, Phone, Clock, AlertCircle, MessageSquare, Plus, X, Save, Send, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { sessionService, supportRequestService, studentService, messageService } from '@/services/api';

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
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [supportRequests, setSupportRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showRespondModal, setShowRespondModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [studentProfile, setStudentProfile] = useState<any | null>(null);
  const [messageText, setMessageText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [noteText, setNoteText] = useState('');
  const [newSession, setNewSession] = useState({
    studentId: '',
    topic: '',
    scheduledTime: '',
    sessionType: 'video',
    duration: '45 mins'
  });

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

  const handleViewProfile = async (student: Student) => {
    try {
      const profile = await studentService.getStudentProfile(student.id.toString());
      setStudentProfile(profile);
      setSelectedStudent(student);
      setShowProfileModal(true);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleMessage = (student: Student) => {
    setSelectedStudent(student);
    setShowMessageModal(true);
  };

  const handleSendMessage = async () => {
    if (!selectedStudent || !messageText) return;
    try {
      await messageService.sendMessage({
        receiverId: selectedStudent.id.toString(),
        message: messageText
      });
      setShowMessageModal(false);
      setMessageText('');
      setSelectedStudent(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleRespondSubmit = async () => {
    if (!selectedRequest || !responseText) return;
    try {
      await supportRequestService.respond(selectedRequest.id, responseText);
      setShowRespondModal(false);
      setResponseText('');
      setSelectedRequest(null);
      loadSupportRequests();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEmailSubmit = async () => {
    if (!selectedRequest || !emailSubject || !emailMessage) return;
    try {
      await supportRequestService.sendEmail(selectedRequest.id, emailSubject, emailMessage);
      setShowEmailModal(false);
      setEmailSubject('');
      setEmailMessage('');
      setSelectedRequest(null);
      loadSupportRequests();
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadSessions();
    loadSupportRequests();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const data = await sessionService.getCounselorSessions();
      setSessions(data);
    } catch (error: any) {
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSupportRequests = async () => {
    try {
      const data = await supportRequestService.getAllRequests();
      setSupportRequests(data);
    } catch (error: any) {
      console.error('Failed to load support requests:', error);
    }
  };

  const handleScheduleNewSession = async () => {
    try {
      await sessionService.createSession(newSession);
      setShowScheduleModal(false);
      setNewSession({ studentId: '', topic: '', scheduledTime: '', sessionType: 'video', duration: '45 mins' });
      loadSessions();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleAddNote = async () => {
    if (!selectedSession || !noteText) return;
    try {
      await sessionService.addNote(selectedSession.id, noteText);
      setShowNoteModal(false);
      setNoteText('');
      setSelectedSession(null);
      loadSessions();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleRescheduleSubmit = async (sessionId: string, newTime: string) => {
    try {
      await sessionService.rescheduleSession(sessionId, new Date(newTime));
      setShowRescheduleModal(false);
      loadSessions();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleJoinSession = async (session: any) => {
    try {
      await sessionService.updateStatus(session.id, 'In Progress');
      window.open(`/session/${session.id}`, '_blank');
      loadSessions();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleCompleteSession = async (sessionId: string) => {
    try {
      await sessionService.updateStatus(sessionId, 'Completed');
      loadSessions();
    } catch (error: any) {
      alert(error.message);
    }
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
          <h2 className="text-2xl font-bold text-gray-800">Sessions</h2>
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Schedule New Session
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading sessions...</div>
        ) : sessions.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No sessions scheduled</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${session.sessionType === 'video' ? 'bg-orange-100' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
                      {session.sessionType === 'video' ? (
                        <Video className="w-6 h-6 text-orange-600" />
                      ) : (
                        <Phone className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{session.student?.firstName} {session.student?.lastName}</h3>
                      <p className="text-gray-600">{session.topic}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {new Date(session.scheduledTime).toLocaleString()}
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          session.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          session.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {session.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        setSelectedSession(session);
                        setShowRescheduleModal(true);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Reschedule
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedSession(session);
                        setNoteText(session.notes || '');
                        setShowNoteModal(true);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Notes
                    </button>
                    {session.status === 'Scheduled' && (
                      <button 
                        onClick={() => handleJoinSession(session)}
                        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                      >
                        Join Session
                      </button>
                    )}
                    {session.status === 'In Progress' && (
                      <button 
                        onClick={() => handleCompleteSession(session.id)}
                        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
                {session.notes && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{session.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSupportRequests = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Support Requests</h2>
      
      {loading ? (
        <div className="text-center py-12">Loading requests...</div>
      ) : supportRequests.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No support requests</p>
        </div>
      ) : (
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
                      <h3 className="font-bold text-gray-800 text-lg">{request.studentName || 'Student'}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                        request.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-gray-800">{request.issue || request.description}</p>
                    <p className="text-sm text-gray-500 mt-1">{new Date(request.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setSelectedRequest(request);
                      setEmailSubject(`Re: ${request.issue || 'Support Request'}`);
                      setShowEmailModal(true);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedRequest(request);
                      setResponseText(request.response || '');
                      setShowRespondModal(true);
                    }}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    Respond
                  </button>
                </div>
              </div>
              {request.response && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800 mb-1">Response:</p>
                  <p className="text-sm text-green-700">{request.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Schedule Session Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Schedule New Session</h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                <input
                  type="text"
                  value={newSession.studentId}
                  onChange={(e) => setNewSession({...newSession, studentId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter student ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                <input
                  type="text"
                  value={newSession.topic}
                  onChange={(e) => setNewSession({...newSession, topic: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Session topic"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Time</label>
                <input
                  type="datetime-local"
                  value={newSession.scheduledTime}
                  onChange={(e) => setNewSession({...newSession, scheduledTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
                <select
                  value={newSession.sessionType}
                  onChange={(e) => setNewSession({...newSession, sessionType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="video">Video Call</option>
                  <option value="phone">Phone Call</option>
                  <option value="in-person">In Person</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleNewSession}
                  className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Note Modal */}
      {showNoteModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Session Notes</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedSession.student?.firstName} {selectedSession.student?.lastName} • {selectedSession.topic}
                </p>
              </div>
              <button onClick={() => {
                setShowNoteModal(false);
                setSelectedSession(null);
                setNoteText('');
              }} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-64"
              placeholder="Enter session notes here..."
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowNoteModal(false);
                  setSelectedSession(null);
                  setNoteText('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Respond Modal */}
      {showRespondModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Respond to Support Request</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedRequest.issue || selectedRequest.description}</p>
              </div>
              <button onClick={() => {
                setShowRespondModal(false);
                setSelectedRequest(null);
                setResponseText('');
              }} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-48"
              placeholder="Enter your response here..."
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowRespondModal(false);
                  setSelectedRequest(null);
                  setResponseText('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRespondSubmit}
                className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Response
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Send Email</h3>
              <button onClick={() => {
                setShowEmailModal(false);
                setSelectedRequest(null);
                setEmailSubject('');
                setEmailMessage('');
              }} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Email subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-48"
                  placeholder="Enter your email message here..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEmailModal(false);
                  setSelectedRequest(null);
                  setEmailSubject('');
                  setEmailMessage('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEmailSubmit}
                className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Profile Modal */}
      {showProfileModal && selectedStudent && studentProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Student Profile</h3>
              <button onClick={() => {
                setShowProfileModal(false);
                setSelectedStudent(null);
                setStudentProfile(null);
              }} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center">
                  <span className="text-orange-700 font-bold text-2xl">{selectedStudent.initials}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedStudent.name}</h4>
                  <p className="text-gray-600">{studentProfile.email || 'No email'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Progress</p>
                  <p className="text-2xl font-bold text-gray-800">{selectedStudent.progress}%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Last Session</p>
                  <p className="text-lg font-semibold text-gray-800">{selectedStudent.lastSession}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Priority</p>
                  <p className="text-lg font-semibold text-gray-800 capitalize">{selectedStudent.priority}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <p className="text-lg font-semibold text-green-600 capitalize">{selectedStudent.status}</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-2">Additional Information</p>
                <p className="text-sm text-blue-700">Programs: {studentProfile.programs || 0}</p>
                <p className="text-sm text-blue-700">Last Active: {studentProfile.lastActive || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Send Message</h3>
                <p className="text-sm text-gray-600 mt-1">To: {selectedStudent.name}</p>
              </div>
              <button onClick={() => {
                setShowMessageModal(false);
                setSelectedStudent(null);
                setMessageText('');
              }} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-40"
              placeholder="Type your message here..."
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setSelectedStudent(null);
                  setMessageText('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Reschedule Session</h3>
              <button onClick={() => {
                setShowRescheduleModal(false);
                setSelectedSession(null);
              }} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">Current time:</p>
              <p className="font-medium text-gray-800">{new Date(selectedSession.scheduledTime).toLocaleString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Time</label>
              <input
                type="datetime-local"
                id="rescheduleTime"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowRescheduleModal(false);
                  setSelectedSession(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const input = document.getElementById('rescheduleTime') as HTMLInputElement;
                  if (input.value) {
                    handleRescheduleSubmit(selectedSession.id, input.value);
                  }
                }}
                className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

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