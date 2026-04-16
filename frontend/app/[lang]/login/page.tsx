'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, Facebook, Shield, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function LoginPage() {
  const { lang } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Google Login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { signInWithPopup, googleProvider, auth } = await import('@/app/lib/firebase');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await axios.post('http://localhost:5000/api/auth/google', {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        router.push(`/${lang}/dashboard`);
      }
    } catch (err: any) {
      console.error('Google login error:', err);
      setError(err.response?.data?.message || 'Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Facebook Login
  const handleFacebookLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { signInWithPopup, facebookProvider, auth } = await import('@/app/lib/firebase');
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      const response = await axios.post('http://localhost:5000/api/auth/facebook', {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        router.push(`/${lang}/dashboard`);
      }
    } catch (err: any) {
      console.error('Facebook login error:', err);
      setError(err.response?.data?.message || 'Facebook login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        router.push(`/${lang}/dashboard`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Animated Background - مثل صفحة التسجيل */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-2000" />

        {/* Cyber Grid */}
        <div className="absolute inset-0 bg-cyber-grid opacity-20" />

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-500" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-cyan-500/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {lang === 'ar' ? 'تسجيل الدخول' : 'Welcome Back'}
            </h1>
            <p className="text-gray-400">
              {lang === 'ar' ? 'سجل الدخول للوصول إلى لوحة التحكم' : 'Login to access your dashboard'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-xl text-red-400 text-sm flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 text-white transition-all"
                  placeholder="ahmed@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 text-white transition-all"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href={`/${lang}/forgot-password`}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition"
              >
                {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900/30 text-gray-400">
                  {lang === 'ar' ? 'أو تابع باستخدام' : 'Or continue with'}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 py-2.5 bg-gray-900/50 border border-gray-700 rounded-xl hover:border-cyan-500/50 hover:bg-gray-900/70 transition-all group disabled:opacity-50"
              >
                <Chrome className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white">Google</span>
              </button>
              <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 py-2.5 bg-gray-900/50 border border-gray-700 rounded-xl hover:border-cyan-500/50 hover:bg-gray-900/70 transition-all group disabled:opacity-50"
              >
                <Facebook className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white">Facebook</span>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center mt-8 text-gray-400">
            {lang === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
            <Link href={`/${lang}/register`} className="text-cyan-400 hover:text-cyan-300 font-semibold transition">
              {lang === 'ar' ? 'إنشاء حساب' : 'Sign up'}
            </Link>
          </p>
        </div>

        {/* Security Badge */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500">
            <Shield className="w-3 h-3" />
            <span>{lang === 'ar' ? 'محمي بتقنية التشفير المتقدم' : 'Protected by advanced encryption'}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}