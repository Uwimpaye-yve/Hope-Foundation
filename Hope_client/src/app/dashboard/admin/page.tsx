"use client";
import { useState, useEffect } from "react";
import { Users, BookOpen, Heart, TrendingUp, Search, Plus } from "lucide-react";
import { authService } from "@/services/api";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Student {
  id: string;
  name: string;
  age: number;
  programs: number;
  lastActive: string;
  avatar: string;
  avatarColor: string;
}

interface Stats {
  totalStudents: number;
  activePrograms: number;
  supportRequests: number;
  successRate: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    activePrograms: 15,
    supportRequests: 0,
    successRate: 50
  });
  const [displayCount, setDisplayCount] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      router.push('/Login');
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [statsData, studentsData] = await Promise.all([
        authService.getAdminStats(),
        authService.getAllStudents()
      ]);
      setStats(statsData);
      setStudents(studentsData.map((s: any) => ({
        id: s.id,
        name: s.name || `${s.firstName || ''} ${s.lastName || ''}`.trim(),
        age: s.age || 0,
        programs: s.programs || 0,
        lastActive: formatDate(s.lastActive),
        avatar: s.avatar || (s.name ? s.name.charAt(0).toUpperCase() : 'S'),
        avatarColor: s.avatarColor || 'bg-orange-400'
      })));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return 'Today';
    if (hours < 48) return 'Yesterday';
    return `${Math.floor(hours / 24)} days ago`;
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedStudents = filteredStudents.slice(0, displayCount);
  const hasMore = displayedStudents.length < filteredStudents.length;

  return (
    <div>
      <Navbar />
      <div className="px-6 lg:px-8 py-12">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Manage students, programs, and track impact
            </p>
          </div>
          <button 
            onClick={() => router.push('/dashboard/admin/add-student')}
            className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Student
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div 
            onClick={() => router.push('/dashboard/admin/students')}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Total Students</span>
              <div className="w-10 h-10 flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">{stats.totalStudents}</div>
            <div className="text-green-500 text-sm font-medium">
              Click to view all
            </div>
          </div>
          <div 
            onClick={() => router.push('/dashboard/admin/programs')}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Active Programs</span>
              <div className="w-10 h-10 bg-pink rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-pink-500" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">{stats.activePrograms}</div>
            <div className="text-green-500 text-sm font-medium">
              All running smoothly
            </div>
          </div>
          <div 
            onClick={() => router.push('/dashboard/counselor/support')}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">
                Support Requests
              </span>
              <div className="w-10 h-10 items-center justify-center">
                <Heart className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">{stats.supportRequests}</div>
            <div className="text-orange-500 text-sm font-medium">
              Click to view
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Success Rate</span>
              <div className="w-10 h-10 bg-green-160 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">{stats.successRate}%</div>
            <div className="text-green-500 text-sm font-medium">
              +5% from last month
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray- 800">
                Active students
              </h2>
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Students."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="space-y-4 mb-6">
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading students...</div>
              ) : displayedStudents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchQuery ? 'No students found' : 'No students yet. Add students to get started.'}
                </div>
              ) : (
                displayedStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${student.avatarColor}`}
                      >
                        {student.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {student.name || 'Unnamed Student'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {student.age > 0 ? `Age ${student.age} • ` : ''}{student.programs} programs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        {student.lastActive}
                      </span>
                      <button 
                        onClick={() => router.push(`/dashboard/admin/students/${student.id}`)}
                        className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {hasMore && (
              <button 
                onClick={() => setDisplayCount(prev => prev + 5)}
                className="w-full py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Load More Students
              </button>
            )}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Quick actions
            </h2>
            <div className="space-y-3">
              <button 
                onClick={() => router.push('/dashboard/admin/add-student')}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left"
              >
                <Plus className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Add Student</span>
              </button>
              <button 
                onClick={() => router.push('/dashboard/admin/programs')}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left"
              >
                <BookOpen className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Create Program</span>
              </button>
              <button 
                onClick={() => router.push('/dashboard/counselor/support')}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left"
              >
                <Heart className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">View Support Request</span>
              </button>
              <button 
                onClick={() => router.push('/dashboard/admin/reports')}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left"
              >
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Generate Report</span>
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Program Overview
            </h2>
            <button 
              onClick={() => router.push('/dashboard/admin/programs')}
              className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Program
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-orange-50 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Education
              </h3>
              <div className="text-3xl font-bold text-orange-500 mb-2">
                5 programs
              </div>
              <p className="text-gray-600 text-sm">100 students enrolled</p>
            </div>
            <div className="bg-pink-50 rounded-2xl p-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Mental Health
              </h3>
              <div className="text-3xl font-bold text-pink-500 mb-2">
                5 programs
              </div>
              <p className="text-gray-600 text-sm">100 studentsenrolled</p>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Community
              </h3>
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                4 programs
              </div>
              <p className="text-gray-600 text-sm">98 students enrolled</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {students.slice(0, 3).map((student) => (
                <div
                  key={student.id}
                  className="pb-4 border-b border-gray-100 last:pb-0 last:border-0"
                >
                  <h3 className="font-semibold text-gray-800 mb-1">
                    New Student Joined
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {student.name} joined the platform
                  </p>
                  <span className="text-xs text-gray-500">{student.lastActive}</span>
                </div>
              ))}
              {students.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No recent activity
                </div>
              )}
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-400 via-pink-300 to-purple-300 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Manage Stories</h2>
            <p className="text-white/90 mb-4">
              Review and publish new success stories
            </p>
            <button 
              onClick={() => router.push('/stories')}
              className="w-full bg-pink-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-pink-300 transition"
            >
              View Submissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
