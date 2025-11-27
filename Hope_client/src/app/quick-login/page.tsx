"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api';

export default function QuickLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const quickLogin = async (role: 'admin' | 'student' | 'counselor') => {
    setLoading(true);
    setError('');

    const credentials = {
      admin: { email: 'admin@hopefoundation.org', password: 'password123' },
      student: { email: 'student@hopefoundation.org', password: 'password123' },
      counselor: { email: 'counselor@hopefoundation.org', password: 'password123' }
    };

    try {
      const response = await authService.login(credentials[role]);
      authService.saveToken(response.access_token);
      authService.saveUser(response.user);

      router.push(`/dashboard/${role}`);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Quick Login</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => quickLogin('admin')}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 disabled:opacity-50 font-semibold"
          >
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
          
          <button
            onClick={() => quickLogin('student')}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 font-semibold"
          >
            {loading ? 'Logging in...' : 'Login as Student'}
          </button>
          
          <button
            onClick={() => quickLogin('counselor')}
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 font-semibold"
          >
            {loading ? 'Logging in...' : 'Login as Counselor'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-orange-600 hover:underline">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}