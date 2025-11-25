// File: app/admin/support/page.tsx
"use client"

import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function AdminSupportPage() {
  // Mock data - replace with real data from API
  const supportRequests = [
    {
      id: '1',
      studentName: 'Sarah Johnson',
      priority: 'High',
      category: 'Academic',
      subject: 'Need help with Math assignment',
      message: 'I am struggling with the algebra homework and need help understanding quadratic equations.',
      status: 'Pending',
      timestamp: '5 mins ago'
    },
    {
      id: '2',
      studentName: 'Michael Chen',
      priority: 'Urgent',
      category: 'Emotional',
      subject: 'Feeling overwhelmed with exams',
      message: 'I have been feeling very anxious about upcoming exams and need to talk to someone.',
      status: 'Pending',
      timestamp: '12 mins ago'
    },
    {
      id: '3',
      studentName: 'Emma Rodriguez',
      priority: 'Normal',
      category: 'General',
      subject: 'Question about program schedule',
      message: 'When is the next tutoring session for the math program?',
      status: 'Resolved',
      timestamp: '1 hour ago'
    }
  ]

  const stats = {
    total: 8,
    pending: 3,
    urgent: 1,
    resolved: 4
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-500'
      case 'High':
        return 'bg-orange-500'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div>
      {/* Header */}
      <Navbar/>

      {/* Content */}
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Requests */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
                <div className="text-sm text-gray-500">Total Requests</div>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{stats.pending}</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
            </div>
          </div>

          {/* Urgent */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{stats.urgent}</div>
                <div className="text-sm text-gray-500">Urgent</div>
              </div>
            </div>
          </div>

          {/* Resolved */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{stats.resolved}</div>
                <div className="text-sm text-gray-500">Resolved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Recent Requests</h2>

          <div className="space-y-4">
            {supportRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  {/* Left Side - Request Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-gray-700">{request.studentName}</h3>
                      
                      {/* Priority Badge */}
                      <span className={`${getPriorityColor(request.priority)} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
                        {request.priority}
                      </span>

                      {/* Category Badge */}
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                        {request.category}
                      </span>
                    </div>

                    {/* Subject */}
                    <p className="font-semibold text-gray-800 mb-2">{request.subject}</p>

                    {/* Message Preview */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{request.message}</p>

                    {/* Status and Time */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Status: <span className={request.status === 'Pending' ? 'text-orange-600 font-medium' : 'text-green-600 font-medium'}>{request.status}</span></span>
                      <span>•</span>
                      <span>{request.timestamp}</span>
                    </div>
                  </div>

                  {/* Right Side - Action Buttons */}
                  <div className="flex gap-2 ml-4">
                    <Link
                      href={`/admin/support/${request.id}`}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition font-medium"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/support/${request.id}/respond`}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
                    >
                      Respond
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
