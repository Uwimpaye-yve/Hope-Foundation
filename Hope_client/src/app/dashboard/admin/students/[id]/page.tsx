"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { api } from "@/lib/api";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  enrollmentDate: string;
  status: string;
  programs: string[];
  progress: number;
}

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      loadStudent(params.id as string);
    }
  }, [params.id]);

  const loadStudent = async (id: string) => {
    try {
      const data = await api.students.getOne(id);
      setStudent(data);
    } catch (err: any) {
      setError(err.message || "Failed to load student");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student...</p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Not Found</h1>
            <p className="text-gray-600">The requested student could not be found</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error || "Student not found"}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{student.firstName} {student.lastName}</h1>
          <p className="text-gray-600">Student Profile Details</p>
        </div>

        <div className="max-w-4xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {student.firstName?.[0] || 'S'}{student.lastName?.[0] || 'T'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{student.firstName} {student.lastName}</h2>
                  <p className="text-gray-600">{student.email}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {student.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-gray-800">{student.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                    <p className="text-gray-800">{student.dateOfBirth || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Address</label>
                    <p className="text-gray-800">{student.address || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Emergency Contact</label>
                    <p className="text-gray-800">{student.emergencyContact || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Enrollment Date</label>
                    <p className="text-gray-800">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Programs Enrolled</label>
                    <p className="text-gray-800">{student.programs?.length || 0} programs</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Overall Progress</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${student.progress || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{student.progress || 0}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Programs */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Enrolled Programs</h3>
            <div className="space-y-3">
              {student.programs && student.programs.length > 0 ? (
                student.programs.map((programId, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Program {programId}</h4>
                      <p className="text-sm text-gray-600">Active enrollment</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Active
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No programs enrolled
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => router.push(`/dashboard/admin/students/${student.id}/edit`)}
              className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Edit Student
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Enroll in Program
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Contact Student
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}