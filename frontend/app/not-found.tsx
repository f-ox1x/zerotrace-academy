'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Animated Logo */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center animate-glow">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold gradient-text mb-2">404</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500 mb-3 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Try searching for:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/courses" className="text-sm text-cyan-500 hover:text-cyan-400 transition">
              Courses
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/labs" className="text-sm text-cyan-500 hover:text-cyan-400 transition">
              Labs
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/dashboard" className="text-sm text-cyan-500 hover:text-cyan-400 transition">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
          <p className="text-xs text-gray-500">
            💡 Did you know? The first computer virus was created in 1983!
          </p>
        </div>
      </div>
    </div>
  );
}