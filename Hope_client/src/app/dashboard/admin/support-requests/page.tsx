"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface SupportRequest {
  id: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function SupportRequestsPage() {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null);

  useEffect(() => {
    loadSupportRequests();
  }, []);

  const loadSupportRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/support-requests', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error('Failed to load support requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/support-requests/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        loadSupportRequests();
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'in_progress': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="px-6 lg:px-8 py-12">
        <div className="text-center">Loading support requests...</div>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/admin" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Support Requests</h1>
          <p className="text-gray-600">Manage and respond to student support requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {requests.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No Support Requests</h3>
              <p className="text-gray-600">No support requests have been submitted yet.</p>
            </div>
          ) : (
            requests.map((request) => (
              <div
                key={request.id}
                className={`bg-white rounded-lg p-6 border cursor-pointer transition-all ${
                  selectedRequest?.id === request.id ? 'border-orange-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRequest(request)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(request.status)}
                    <h3 className="font-semibold text-gray-800">{request.subject}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{request.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{request.user.firstName} {request.user.lastName}</span>
                  <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-white rounded-lg p-6">
          {selectedRequest ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Request Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <p className="text-gray-800">{selectedRequest.subject}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <p className="text-gray-800">{selectedRequest.description}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Student</label>
                  <p className="text-gray-800">{selectedRequest.user.firstName} {selectedRequest.user.lastName}</p>
                  <p className="text-gray-600 text-sm">{selectedRequest.user.email}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <p className="text-gray-800">{selectedRequest.category}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Priority</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                    {selectedRequest.priority}
                  </span>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedRequest.status)}
                    <span className="capitalize">{selectedRequest.status.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(selectedRequest.id, 'in_progress')}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateStatus(selectedRequest.id, 'resolved')}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200"
                  >
                    Resolved
                  </button>
                  <button
                    onClick={() => updateStatus(selectedRequest.id, 'closed')}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                  >
                    Closed
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Select a support request to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}