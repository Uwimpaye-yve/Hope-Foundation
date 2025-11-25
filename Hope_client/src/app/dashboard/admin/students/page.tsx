// File: app/admin/students/page.tsx
"use client"

import { useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import Link from 'next/link'

export default function AdminStudentsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data - replace with real data from API
  const students = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      joinedDate: 'Jan 15, 2024',
      age: 14,
      programsEnrolled: 3,
      status: 'Active'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      phone: '(555) 234-5678',
      joinedDate: 'Feb 3, 2024',
      age: 13,
      programsEnrolled: 2,
      status: 'Active'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      email: 'emma.r@email.com',
      phone: '(555) 345-6789',
      joinedDate: 'Mar 12, 2024',
      age: 15,
      programsEnrolled: 4,
      status: 'Active'
    }
  ]

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <AdminHeader
        title="Students"
        subtitle="Manage and monitor all student profiles"
        actionButton={{
          label: 'Add Student',
          href: '/admin/students/add',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )
        }}
      />

      {/* Content */}
      <div className="p-8">
        {/* Search Bar */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">All Students</h2>
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Students List */}
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                {/* Student Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                    <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {student.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {/* Email */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{student.email}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{student.phone}</span>
                    </div>

                    {/* Joined Date */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Joined: {student.joinedDate}</span>
                    </div>

                    {/* Programs */}
                    <div className="text-gray-600">
                      Age: {student.age} • Enrolled in {student.programsEnrolled} programs
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/admin/students/${student.id}`}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition"
                  >
                    View Profile
                  </Link>
                  <Link
                    href={`/admin/students/${student.id}/edit`}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No students found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  )
}