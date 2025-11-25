// File: app/components/admin/AdminHeader.tsx
"use client"

import { useState } from 'react'
import Link from 'next/link'

interface AdminHeaderProps {
  title: string
  subtitle?: string
  actionButton?: {
    label: string
    href: string
    icon?: React.ReactNode
  }
}

export default function AdminHeader({ title, subtitle, actionButton }: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          {subtitle && (
            <p className="text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Action Button (if provided) */}
          {actionButton && (
            <Link
              href={actionButton.href}
              className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition-all"
            >
              {actionButton.icon}
              {actionButton.label}
            </Link>
          )}

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition"
            >
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                AD
              </div>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <Link href="/admin/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                  Settings
                </Link>
                <Link href="/admin/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                  Profile
                </Link>
                <hr className="my-2" />
                <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}