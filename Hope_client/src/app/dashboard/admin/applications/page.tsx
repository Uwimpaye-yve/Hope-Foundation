"use client";
import { useState, useEffect } from "react";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/programs/applications");
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Program Applications</h1>
        <p className="text-gray-600">Review and manage program applications from students</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Applications Yet</h3>
          <p className="text-gray-600">Applications will appear here when students apply for programs</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((app: any) => (
            <div key={app.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{app.fullName}</h3>
                  <p className="text-gray-600">{app.email}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  app.status === 'approved' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {app.status === 'pending' && <Clock className="w-4 h-4 inline mr-1" />}
                  {app.status === 'approved' && <CheckCircle className="w-4 h-4 inline mr-1" />}
                  {app.status === 'rejected' && <XCircle className="w-4 h-4 inline mr-1" />}
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">{app.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium text-gray-800">{app.age}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Program</p>
                  <p className="font-medium text-gray-800 capitalize">{app.programType.replace('-', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Applied</p>
                  <p className="font-medium text-gray-800">{new Date(app.appliedAt).toLocaleDateString()}</p>
                </div>
              </div>

              {app.message && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1">Message</p>
                  <p className="text-gray-700">{app.message}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                  Approve
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  Reject
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
