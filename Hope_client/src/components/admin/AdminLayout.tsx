"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Heart,
  Settings,
  LogOut,
  User,
  FileText,
} from "lucide-react";
import SharedNavbar from "@/components/SharedNavbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/Login');
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const navItems = [
    {
      href: "/dashboard/admin",
      icon: LayoutDashboard,
      label: "Dashboard",
      exact: true,
    },
    {
      href: "/dashboard/admin/students",
      icon: Users,
      label: "Students",
    },
    {
      href: "/dashboard/admin/programs",
      icon: BookOpen,
      label: "Programs",
    },
    {
      href: "/dashboard/admin/support",
      icon: Heart,
      label: "Support Requests",
    },
    {
      href: "/dashboard/admin/analytics",
      icon: FileText,
      label: "Analytics",
    },
    {
      href: "/dashboard/admin/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedNavbar />
      <div className="pt-20">
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = item.exact 
                  ? pathname === item.href 
                  : isActive(item.href);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      active
                        ? "bg-orange-50 text-orange-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Profile Section */}
          <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium">
                  A
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-800">Admin User</p>
                  <p className="text-sm text-gray-500">Administrator</p>
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <Link
                    href="/dashboard/admin/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition w-full text-left text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
      </div>
    </div>
  );
}