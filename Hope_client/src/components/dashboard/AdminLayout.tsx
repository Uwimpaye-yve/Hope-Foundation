"use client";
import AdminSidebar from "./AdminSidebar";
import Navbar from "../Navbar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children } : AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <AdminSidebar />
                
                <main className="flex-1 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}