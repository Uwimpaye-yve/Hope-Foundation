// File: app/admin/settings/page.tsx
"use client"

import { useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminSettingsPage() {
  const [profileData, setProfileData] = useState({
    fullName: 'Admin User',
    email: 'admin@hopefoundation.org',
    phone: '(555) 123-4567'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [emailPreferences, setEmailPreferences] = useState({
    marketing: true,
    programUpdates: true,
    supportRequests: true
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Profile updated successfully!')
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    alert('Password updated successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <div>
      {/* Header */}
      <AdminHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />

      {/* Content */}
      <div className="p-8">
        <div className="max-w-4xl">
          
          {/* Profile Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-700">Profile Information</h2>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Security - Change Password */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-700">Security</h2>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Update Password Button */}
              <button
                type="submit"
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Email Preferences */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-700">Email Preferences</h2>
            </div>

            <div className="space-y-6">
              {/* Marketing Emails */}
              <div className="flex items-start justify-between py-4 border-b border-gray-200">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Marketing Emails</h3>
                  <p className="text-sm text-gray-500">Updates and news from Hope Foundation</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailPreferences.marketing}
                    onChange={(e) => setEmailPreferences({ ...emailPreferences, marketing: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              {/* Program Updates */}
              <div className="flex items-start justify-between py-4 border-b border-gray-200">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Program Updates</h3>
                  <p className="text-sm text-gray-500">Information about new programs</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailPreferences.programUpdates}
                    onChange={(e) => setEmailPreferences({ ...emailPreferences, programUpdates: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              {/* Support Request Notifications */}
              <div className="flex items-start justify-between py-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Support Request Notifications</h3>
                  <p className="text-sm text-gray-500">Alerts when students submit support requests</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailPreferences.supportRequests}
                    onChange={(e) => setEmailPreferences({ ...emailPreferences, supportRequests: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}