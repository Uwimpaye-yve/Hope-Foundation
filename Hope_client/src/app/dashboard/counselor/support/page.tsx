"use client";

import { useState, useEffect } from "react";
import CounselorLayout from "@/components/counselor/CounselorLayout";
import { api } from "@/lib/api";
import { MessageCircle, Clock, User, AlertTriangle } from "lucide-react";

interface SupportRequest {
  id: string;
  priority: string;
  category: string;
  subject: string;
  description: string;
  status: string;
  studentId: string;
  createdAt: string;
}

export default function CounselorSupportPage() {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await api.supportRequests.getAll();
      setRequests(data);
    } catch (error) {
      console.error("Failed to load requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.supportRequests.updateStatus(id, status);
      setRequests(requests.map(req => 
        req.id === id ? { ...req, status } : req
      ));
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = requests.filter(req => {
    if (filter === "pending") return req.status === "Pending";
    if (filter === "inprogress") return req.status === "In Progress";
    if (filter === "resolved") return req.status === "Resolved";
    return true;
  });

  if (loading) {
    return (
      <CounselorLayout>
        <div className="p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading support requests...</p>
          </div>
        </div>
      </CounselorLayout>
    );
  }

  return (
    <CounselorLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Support Requests</h1>
            <p className="text-gray-600">Manage student support requests</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition ${
                filter === "all" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({requests.length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg transition ${
                filter === "pending" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending ({requests.filter(r => r.status === "Pending").length})
            </button>
            <button
              onClick={() => setFilter("inprogress")}
              className={`px-4 py-2 rounded-lg transition ${
                filter === "inprogress" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              In Progress ({requests.filter(r => r.status === "In Progress").length})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className={`bg-white rounded-lg border-2 p-6 ${getPriorityColor(request.priority)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageCircle className="w-5 h-5 text-gray-500" />
                    <h3 className="text-lg font-bold text-gray-800">{request.subject}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                      {request.priority}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      {request.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{request.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>Student ID: {request.studentId}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                  
                  {request.status === "Pending" && (
                    <button
                      onClick={() => updateStatus(request.id, "In Progress")}
                      className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition"
                    >
                      Take Action
                    </button>
                  )}
                  
                  {request.status === "In Progress" && (
                    <button
                      onClick={() => updateStatus(request.id, "Resolved")}
                      className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>

              {request.priority === "Urgent" && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="text-red-800 text-sm font-medium">This is an urgent request requiring immediate attention</span>
                </div>
              )}
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Support Requests</h3>
              <p className="text-gray-500">
                {filter === "all" ? "No support requests found." : `No ${filter} requests found.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </CounselorLayout>
  );
}