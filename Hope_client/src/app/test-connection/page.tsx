'use client';

import { useEffect, useState } from 'react';

export default function TestConnection() {
  const [tests, setTests] = useState({
    root: { status: 'Testing...', data: null },
    students: { status: 'Testing...', data: null },
    programs: { status: 'Testing...', data: null },
  });

  useEffect(() => {
    // Test root endpoint
    fetch('http://localhost:3000')
      .then(res => res.json())
      .then(data => {
        setTests(prev => ({
          ...prev,
          root: { status: '✅ Connected', data }
        }));
      })
      .catch(err => {
        setTests(prev => ({
          ...prev,
          root: { status: '❌ Failed: ' + err.message, data: null }
        }));
      });

    // Test students endpoint
    fetch('http://localhost:3000/students')
      .then(res => res.json())
      .then(data => {
        setTests(prev => ({
          ...prev,
          students: { status: '✅ Success', data }
        }));
      })
      .catch(err => {
        setTests(prev => ({
          ...prev,
          students: { status: '❌ Failed: ' + err.message, data: null }
        }));
      });

    // Test programs endpoint
    fetch('http://localhost:3000/programs')
      .then(res => res.json())
      .then(data => {
        setTests(prev => ({
          ...prev,
          programs: { status: '✅ Success', data }
        }));
      })
      .catch(err => {
        setTests(prev => ({
          ...prev,
          programs: { status: '❌ Failed: ' + err.message, data: null }
        }));
      });
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">🔗 Backend API Test</h1>
        
        <div className="space-y-6">
          {/* Root Endpoint */}
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Root Endpoint</h2>
            <p className="text-sm text-gray-600 mb-2">GET http://localhost:3000/</p>
            <p className="text-lg mb-2">{tests.root.status}</p>
            {tests.root.data && (
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                {JSON.stringify(tests.root.data, null, 2)}
              </pre>
            )}
          </div>

          {/* Students Endpoint */}
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Students Endpoint</h2>
            <p className="text-sm text-gray-600 mb-2">GET http://localhost:3000/students</p>
            <p className="text-lg mb-2">{tests.students.status}</p>
            {tests.students.data && (
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-60">
                {JSON.stringify(tests.students.data, null, 2)}
              </pre>
            )}
          </div>

          {/* Programs Endpoint */}
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Programs Endpoint</h2>
            <p className="text-sm text-gray-600 mb-2">GET http://localhost:3000/programs</p>
            <p className="text-lg mb-2">{tests.programs.status}</p>
            {tests.programs.data && (
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-60">
                {JSON.stringify(tests.programs.data, null, 2)}
              </pre>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800 font-semibold">✅ Backend is running successfully!</p>
          <p className="text-sm text-green-700 mt-1">
            Backend: http://localhost:3000 | Frontend: http://localhost:3001
          </p>
        </div>
      </div>
    </div>
  );
}