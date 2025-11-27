"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { api } from "@/lib/api";

interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  status: string;
  startDate: string;
  endDate: string;
  materials: any[];
}

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      loadProgram(params.id as string);
    }
  }, [params.id]);

  const loadProgram = async (id: string) => {
    try {
      const data = await api.programs.getOne(id);
      setProgram(data);
    } catch (err: any) {
      setError(err.message || "Failed to load program");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!program || !confirm("Are you sure you want to delete this program?")) return;
    
    try {
      await api.programs.delete(program.id);
      router.push("/dashboard/admin/programs");
    } catch (err: any) {
      setError(err.message || "Failed to delete program");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading program...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !program) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Program Not Found</h1>
            <p className="text-gray-600">The requested program could not be found</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error || "Program not found"}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{program.name}</h1>
          <p className="text-gray-600">Program Details and Management</p>
        </div>

        <div className="max-w-4xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{program.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  program.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {program.status}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-500">{program.enrolled}/{program.capacity}</div>
                <div className="text-sm text-gray-500">Students Enrolled</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Program Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Description</label>
                    <p className="text-gray-800">{program.description}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Duration</label>
                    <p className="text-gray-800">{program.duration}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Schedule</label>
                    <p className="text-gray-800">{program.schedule}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeline</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Start Date</label>
                    <p className="text-gray-800">{new Date(program.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">End Date</label>
                    <p className="text-gray-800">{new Date(program.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Materials</label>
                    <p className="text-gray-800">{program.materials.length} items</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Enrollment Progress</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-orange-500 h-3 rounded-full" 
                    style={{ width: `${(program.enrolled / program.capacity) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round((program.enrolled / program.capacity) * 100)}% Full
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => router.push(`/dashboard/admin/programs/${program.id}/manage`)}
              className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Manage Program
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              View Students
            </button>
            <button 
              onClick={handleDelete}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Delete Program
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}