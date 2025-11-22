"use client";
import { useState } from "react";
import { LayoutDashboard, Users, BookOpen, Heart, BarChart3, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard/admin",
            active: pathname === "/dashboard/admin"
        },
        {
            name: "Students",
            icon: Users,
            href: "/dashboard/admin/students",
            active: pathname === "/dashboard/admin/students"
        },
        {
            name: "Programs",
            icon: BookOpen,
            href: "/dashboard/admin/programs",
            active: pathname === "/dashboard/admin/Programs" 
        },
        {
            name: "Support",
            icon: Heart,
            href: "/dashboard/admin/support",
            active: pathname === "/dashboard/admin/support"
        },
        {
            name: "Analytics",
            icon: BarChart3,
            href: "/dashboard/admin/analytics",
            active: pathname === "/dashboard/admin/analytics"
        },
        {
            name: "Settings",
            icon: Settings,
            href: "/dashboard/admin/settings",
            active: pathname === "/dashboard/admin/settings"
        }
    ];

    return (
        <div className={`${isCollapsed ? "w-20" : "w-64"} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen sticky top-0`}>
            <div className="flex justify-end p-4">
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                    {isCollapsed ? (
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    ) : (
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    )}
                </button>
            </div>
            <nav className="flex-1 px-3 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                            item.active
                            ? "bg-orange-50 text-orange-500"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        >
                            <Icon className={`w-5 h-5 flex-shrink-0 ${item.active ? "text-orange-500" : "text-gray-600"}`} />
                            {isCollapsed && (
                                <span className={`font-medium ${item.active ? "text-orange-500" : ""}`}>
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    )
}