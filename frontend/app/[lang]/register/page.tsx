'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  User, Mail, Lock, Eye, EyeOff, ArrowRight,
  Chrome, Facebook, Shield, CheckCircle, AlertCircle,
  Award
} from 'lucide-react';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

export default function RegisterPage() {
  const { lang } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ message: string; type: string } | null>(null);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '', color: '' });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    subscribeNewsletter: true,
  });

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let message = '';
    let color = '';

    if (password.length >= 8) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;

    if (score <= 2) {
      message = lang === 'ar' ? 'ضعيفة' : 'Weak';
      color = 'text-red-400';
    } else if (score <= 4) {
      message = lang === 'ar' ? 'متوسطة' : 'Medium';
      color = 'text-yellow-400';
    } else {
      message = lang === 'ar' ? 'قوية' : 'Strong';
      color = 'text-green-400';
    }

    setPasswordStrength({ score, message, color });
  };

  // Validate email and check if exists
  const validateEmail = async (email: string) => {
    if (!email) {
      setEmailStatus(null);
      return;
    }

    const emailLower = email.toLowerCase();
    const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const domain = emailLower.split('@')[1];

    let message = '';
    let type = '';

    if (freeDomains.includes(domain)) {
      message = lang === 'ar' ? '📧 بريد إلكتروني مجاني' : '📧 Free email address';
      type = 'free';
    } else if (domain?.includes('.edu') || domain?.includes('ac.')) {
      message = lang === 'ar' ? '🎓 بريد أكاديمي معتمد' : '🎓 Educational email';
      type = 'edu';
    } else {
      message = lang === 'ar' ? '✉️ بريد شخصي' : '✉️ Personal email';
      type = 'personal';
    }

    setEmailStatus({ message, type });

    try {
      const response = await axios.get(`http://localhost:5000/api/auth/check-email?email=${email}`);
      if (response.data.exists) {
        setEmailStatus({
          message: lang === 'ar' ? '⚠️ هذا البريد مسجل بالفعل' : '⚠️ Email already registered',
          type: 'exists'
        });
      }
    } catch (err) {
      // Ignore
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { signInWithPopup, googleProvider, auth } = await import('@/app/lib/firebase');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // طلب كلمة مرور من المستخدم (لأول مرة فقط)
      let password = '';
      const existingUser = await axios.get(`http://localhost:5000/api/auth/check-email?email=${user.email}`);

      if (!existingUser.data.exists) {
        // مستخدم جديد، اطلب منه كلمة مرور
        password = prompt('أدخل كلمة مرور للحساب (ستستخدمها لتسجيل الدخول لاحقاً):');
        if (!password) {
          setError('كلمة المرور مطلوبة');
          setIsLoading(false);
          return;
        }
      }

      const response = await axios.post('http://localhost:5000/api/auth/google', {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        password: password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setSuccess('تم تسجيل الدخول بنجاح!');
        setTimeout(() => {
          router.push(`/${lang}/dashboard`);
        }, 1500);
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

      // طلب البريد الإلكتروني بشكل إضافي
      facebookProvider.addScope('email');

      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      console.log('Facebook user:', user);

      let userEmail = user.email;

      if (!userEmail) {
        setError('لم نتمكن من الحصول على بريدك الإلكتروني. الرجاء استخدام Google أو التسجيل العادي');
        setIsLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:5000/api/auth/facebook', {
        email: userEmail,
        name: user.displayName,
        photo: user.photoURL
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setSuccess('تم تسجيل الدخول بنجاح!');
        setTimeout(() => {
          router.push(`/${lang}/dashboard`);
        }, 1500);
      }
    } catch (err: any) {
      console.error('Facebook login error:', err);
      setError(err.response?.data?.message || 'Facebook login failed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formData.password) {
      checkPasswordStrength(formData.password);
    }
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (!formData.fullName.trim()) {
      setError(lang === 'ar' ? 'الاسم الكامل مطلوب' : 'Full name is required');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(lang === 'ar' ? 'كلمة المرور غير متطابقة' : 'Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setError(lang === 'ar' ? 'يجب الموافقة على الشروط والأحكام' : 'Please agree to the Terms and Conditions');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(lang === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      // إنشاء المستخدم في Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const firebaseUser = userCredential.user;

      // إرسال البيانات إلى Backend
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        phone: '', // رقم هاتف فارغ
        password: formData.password,
        firebaseUid: firebaseUser.uid
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setSuccess(lang === 'ar' ? 'تم إنشاء الحساب بنجاح! جاري التحويل...' : 'Account created successfully! Redirecting...');

        setTimeout(() => {
          router.push(`/${lang}/dashboard`);
        }, 2000);
      }
    } catch (err: any) {
      console.error('Registration error:', err);

      if (err.code === 'auth/email-already-in-use') {
        setError(lang === 'ar' ? 'البريد الإلكتروني مسجل بالفعل' : 'Email already in use');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(lang === 'ar' ? 'حدث خطأ. الرجاء المحاولة مرة أخرى' : 'An error occurred. Please try again');
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

      <div className="max-w-md w-full relative z-10 bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-cyan-500/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {lang === 'ar' ? 'إنشاء حساب جديد' : 'Create an Account'}
          </h1>
          <p className="text-gray-400">
            {lang === 'ar' ? 'انضم إلى آلاف المتعلمين' : 'Join thousands of learners'}
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-xl text-red-400 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-xl text-green-400 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
            </label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 text-white transition-all"
                placeholder={lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed'}
                required
                disabled={isLoading}
              />
            </div>
          </div>

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
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  validateEmail(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 text-white transition-all"
                placeholder="ahmed@example.com"
                required
                disabled={isLoading}
              />
            </div>
            {emailStatus && emailStatus.type !== 'exists' && (
              <p className="mt-1 text-xs text-cyan-400 flex items-center gap-1">
                {emailStatus.type === 'edu' && <Award className="w-3 h-3" />}
                <span>{emailStatus.message}</span>
              </p>
            )}
            {emailStatus?.type === 'exists' && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{emailStatus.message}</span>
              </p>
            )}
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
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.score <= 2 ? 'bg-red-500 w-[33%]' :
                        passwordStrength.score <= 4 ? 'bg-yellow-500 w-[66%]' : 'bg-green-500 w-full'
                        }`}
                    />
                  </div>
                  <span className={`text-xs ${passwordStrength.color}`}>
                    {passwordStrength.message}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-12 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 text-white transition-all"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
          </div>

          {/* Newsletter */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.subscribeNewsletter}
              onChange={(e) => setFormData({ ...formData, subscribeNewsletter: e.target.checked })}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-sm text-gray-400">
              {lang === 'ar' ? 'أرغب في تلقي النشرات البريدية والتحديثات' : 'I want to receive newsletters and updates'}
            </span>
          </label>

          {/* Terms */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-sm text-gray-400">
              {lang === 'ar' ? 'أوافق على الشروط والأحكام' : 'I agree to the Terms and Conditions'}
            </span>
          </label>

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
                {lang === 'ar' ? 'إنشاء حساب' : 'Create Account'}
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

        {/* Login Link */}
        <p className="text-center mt-8 text-gray-400">
          {lang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
          <Link href={`/${lang}/login`} className="text-cyan-400 hover:text-cyan-300 font-semibold transition">
            {lang === 'ar' ? 'تسجيل الدخول' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  );
}