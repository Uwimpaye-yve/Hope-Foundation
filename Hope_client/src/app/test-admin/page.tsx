"use client";
import { useState, useEffect } from 'react';
import { studentsApi, programsApi, dashboardApi } from '@/services/adminApi';

export default function TestAdminPage() {
  const [testResults, setTestResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results: any = {};

    // Test dashboard stats
    try {
      const stats = await dashboardApi.getStats();
      results.dashboardStats = { success: true, data: stats };
    } catch (error: any) {
      results.dashboardStats = { success: false, error: error.message };
    }

    // Test students API
    try {
      const students = await studentsApi.getAll();
      results.students = { success: true, data: students };
    } catch (error: any) {
      results.students = { success: false, error: error.message };
    }

    // Test programs API
    try {
      const programs = await programsApi.getAll();
      results.programs = { success: true, data: programs };
    } catch (error: any) {
      results.programs = { success: false, error: error.message };
    }

    // Test programs overview
    try {
      const overview = await programsApi.getOverview();
      results.programsOverview = { success: true, data: overview };
    } catch (error: any) {
      results.programsOverview = { success: false, error: error.message };
    }

    setTestResults(results);
    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin API Test Page</h1>
      
      <button 
        onClick={runTests}
        disabled={loading}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Run Tests'}
      </button>

      <div className="space-y-6">
        {Object.entries(testResults).map(([key, result]: [string, any]) => (
          <div key={key} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h2>
            <div className={`p-3 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <div className="font-medium">
                Status: {result.success ? '✅ Success' : '❌ Failed'}
              </div>
              {result.error && (
                <div className="mt-2">Error: {result.error}</div>
              )}
              {result.data && (
                <div className="mt-2">
                  <details>
                    <summary className="cursor-pointer">View Data</summary>
                    <pre className="mt-2 text-xs overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}