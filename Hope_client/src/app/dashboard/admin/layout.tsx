// File: app/admin/layout.tsx

import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  )
}