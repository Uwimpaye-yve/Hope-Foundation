"use client";

import { useRouter } from "next/navigation";
import { Shield, ArrowLeft } from "lucide-react";

interface UnauthorizedAccessProps {
  userRole?: string;
  requiredRole?: string;
}

export default function UnauthorizedAccess({ userRole, requiredRole }: UnauthorizedAccessProps) {
  const router = useRouter();

  const handleGoBack = () => {
    // Redirect to appropriate dashboard based on user role
    switch (userRole) {
      case "student":
        router.push("/dashboard/student");
        break;
      case "admin":
        router.push("/dashboard/admin");
        break;
      case "counselor":
        router.push("/dashboard/counselor");
        break;
      default:
        router.push("/Signin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Access Denied
        </h1>
        
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. 
          {requiredRole && (
            <span className="block mt-2 text-sm">
              This page requires <span className="font-semibold">{requiredRole}</span> access.
            </span>
          )}
        </p>
        
        <button
          onClick={handleGoBack}
          className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Go to My Dashboard
        </button>
      </div>
    </div>
  );
}