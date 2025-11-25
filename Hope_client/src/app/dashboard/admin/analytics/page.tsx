// File: app/admin/analytics/page.tsx
"use client"

import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminAnalyticsPage() {
  return (
    <div>
      {/* Header */}
      <AdminHeader
        title="Analytics & Insights"
        subtitle="Track program performance and student progress"
      />

      {/* Content */}
      <div className="p-8">
        
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          
          {/* Growth Rate */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <span className="text-gray-600 text-sm font-medium">Growth Rate</span>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-1">+24%</div>
            <div className="text-sm text-green-600">vs last quarter</div>
          </div>

          {/* Engagement */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <span className="text-gray-600 text-sm font-medium">Engagement</span>
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-1">87%</div>
            <div className="text-sm text-green-600">+5% from last month</div>
          </div>

          {/* Program Completion */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <span className="text-gray-600 text-sm font-medium">Program Completion</span>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-1">92%</div>
            <div className="text-sm text-green-600">Above target</div>
          </div>

          {/* Satisfaction */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <span className="text-gray-600 text-sm font-medium">Satisfaction</span>
              <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-1">4.8/5</div>
            <div className="text-sm text-green-600">Excellent rating</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Monthly Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Monthly Overview</h2>
            
            <div className="space-y-4">
              {/* New Student Enrollments */}
              <div className="bg-orange-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-semibold">New Student Enrollments</span>
                  <span className="text-4xl font-bold text-gray-800">12</span>
                </div>
                <div className="text-sm text-gray-600">+20% from last month</div>
              </div>

              {/* Total Sessions Conducted */}
              <div className="bg-pink-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-semibold">Total Sessions Conducted</span>
                  <span className="text-4xl font-bold text-gray-800">156</span>
                </div>
                <div className="text-sm text-gray-700">On track with goals</div>
              </div>

              {/* Average Attendance Rate */}
              <div className="bg-purple-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-semibold">Average Attendance Rate</span>
                  <span className="text-4xl font-bold text-gray-800">94%</span>
                </div>
                <div className="text-sm text-gray-700">+2% improvement</div>
              </div>
            </div>
          </div>

          {/* Top Performing Programs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Top Performing Programs</h2>
            
            <div className="space-y-4">
              
              {/* Academic Tutoring */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-700 mb-1">Academic Tutoring</h3>
                      <p className="text-sm text-gray-500">45 students</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">96%</div>
                    <div className="text-xs text-gray-500">Success rate</div>
                  </div>
                </div>
              </div>

              {/* Mental Health Support */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-700 mb-1">Mental Health Support</h3>
                      <p className="text-sm text-gray-500">32 students</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-xs text-gray-500">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Community Service */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-700 mb-1">Community Service</h3>
                      <p className="text-sm text-gray-500">52 students</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">91%</div>
                    <div className="text-xs text-gray-500">Participation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}