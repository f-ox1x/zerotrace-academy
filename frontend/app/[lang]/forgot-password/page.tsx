'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Shield, AlertCircle, CheckCircle, Send } from 'lucide-react';
import axios from 'axios';
import { sendPasswordResetEmail, auth } from '@/app/lib/firebase';

export default function ForgotPasswordPage() {
    const { lang } = useParams();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        if (!email) {
            setError(lang === 'ar' ? 'الرجاء إدخال البريد الإلكتروني' : 'Please enter your email');
            setIsLoading(false);
            return;
        }

        try {
            // إرسال رابط إعادة تعيين كلمة المرور عبر Firebase
            await sendPasswordResetEmail(auth, email);

            setSuccess(lang === 'ar'
                ? 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني'
                : 'Password reset link has been sent to your email');

            // تفريغ الحقل بعد النجاح
            setEmail('');
        } catch (err: any) {
            console.error('Password reset error:', err);

            if (err.code === 'auth/user-not-found') {
                setError(lang === 'ar'
                    ? 'لا يوجد حساب مرتبط بهذا البريد الإلكتروني'
                    : 'No account found with this email');
            } else if (err.code === 'auth/invalid-email') {
                setError(lang === 'ar'
                    ? 'البريد الإلكتروني غير صالح'
                    : 'Invalid email address');
            } else {
                setError(lang === 'ar'
                    ? 'حدث خطأ. الرجاء المحاولة مرة أخرى'
                    : 'An error occurred. Please try again');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl" />
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
                            {lang === 'ar' ? 'نسيت كلمة المرور' : 'Forgot Password'}
                        </h1>
                        <p className="text-gray-400">
                            {lang === 'ar'
                                ? 'أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين'
                                : 'Enter your email and we\'ll send you a reset link'}
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

                    {/* Success Message */}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-xl text-green-400 text-sm flex items-center gap-2"
                        >
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{success}</span>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 text-white transition-all"
                                    placeholder="ahmed@example.com"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
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
                                    {lang === 'ar' ? 'إرسال رابط إعادة التعيين' : 'Send Reset Link'}
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Back to Login Link */}
                    <p className="text-center mt-8 text-gray-400">
                        {lang === 'ar' ? 'تذكرت كلمة المرور؟' : 'Remember your password?'}{' '}
                        <Link href={`/${lang}/login`} className="text-cyan-400 hover:text-cyan-300 font-semibold transition">
                            {lang === 'ar' ? 'تسجيل الدخول' : 'Sign in'}
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}