'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Award, 
  Upload, 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  FileText,
  UserCheck,
  Shield,
  DollarSign,
  Image
} from 'lucide-react';

export default function CertificateRequestPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [idImage, setIdImage] = useState<File | null>(null);
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const paymentMethods = [
    { id: 'bank_karimi', name: 'Bank Al-Karimi', icon: '🏦', accounts: ['100123456789', '200987654321'] },
    { id: 'bank_aden', name: 'Aden Islamic Bank', icon: '🏦', accounts: ['300123456789'] },
    { id: 'bank_qutaybi', name: 'Al-Qutaybi Bank', icon: '🏦', accounts: ['400123456789'] },
    { id: 'cac', name: 'CAC Bank', icon: '🏦', accounts: ['500123456789'] },
    { id: 'binance', name: 'Binance Pay', icon: '₿', accounts: ['ID: 123456789'] },
    { id: 'bybit', name: 'Bybit', icon: '₿', accounts: ['ID: 987654321'] },
  ];

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchCompletedCourses();
    }
  }, [user, authLoading]);

  const fetchCompletedCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/courses/completed', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleIdImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        toast.error('Only JPEG, PNG, JPG images are allowed');
        return;
      }
      setIdImage(file);
    }
  };

  const handleProofImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setProofImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      toast.error('Please select a course');
      return;
    }
    if (!idImage) {
      toast.error('Please upload your ID image');
      return;
    }
    if (!selectedPayment) {
      toast.error('Please select a payment method');
      return;
    }
    if (!proofImage) {
      toast.error('Please upload payment proof');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('course_id', selectedCourse);
    formData.append('payment_method', selectedPayment);
    formData.append('id_image', idImage);
    formData.append('proof_image', proofImage);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/certificates/request', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Certificate request submitted successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Request Your Certificate
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get your verified certificate after completing a course. Follow the steps below.
            </p>
          </div>

          {/* Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold
                    ${step >= s ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' : 'bg-gray-800 text-gray-500'}
                  `}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 h-0.5 mx-2 ${step > s ? 'bg-cyan-600' : 'bg-gray-800'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Select Course */}
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Select Completed Course</h2>
                    <p className="text-gray-400 text-sm">Choose the course you have completed</p>
                  </div>
                </div>

                {courses.length > 0 ? (
                  <div className="space-y-3">
                    {courses.map((course: any) => (
                      <label
                        key={course.id}
                        className={`
                          flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all
                          ${selectedCourse === course.id 
                            ? 'border-cyan-500 bg-cyan-500/10' 
                            : 'border-gray-700 hover:border-gray-600'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="course"
                          value={course.id}
                          checked={selectedCourse === course.id}
                          onChange={(e) => setSelectedCourse(e.target.value)}
                          className="w-4 h-4 text-cyan-500"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{course.title}</h3>
                          <p className="text-sm text-gray-400">{course.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-green-500">Completed</div>
                          <div className="text-xs text-gray-500">{course.completed_at}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No completed courses found</p>
                    <a href="/courses" className="text-cyan-500 hover:underline mt-2 inline-block">
                      Browse Courses
                    </a>
                  </div>
                )}
              </div>

              {/* Step 2: Upload ID */}
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Identity Verification</h2>
                    <p className="text-gray-400 text-sm">Upload a clear photo of your ID card</p>
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-cyan-500 transition">
                  {idImage ? (
                    <div>
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <p className="text-white font-medium">{idImage.name}</p>
                      <p className="text-sm text-gray-400">
                        {(idImage.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={() => setIdImage(null)}
                        className="mt-3 text-red-400 text-sm hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <Upload className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-white mb-1">Click to upload ID image</p>
                      <p className="text-sm text-gray-500">JPEG, PNG, JPG (Max 5MB)</p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handleIdImageUpload}
                        className="hidden"
                        required
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Step 3: Payment */}
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Payment</h2>
                    <p className="text-gray-400 text-sm">Certificate fee: $49.99</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-white">Select Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`
                          flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                          ${selectedPayment === method.id 
                            ? 'border-green-500 bg-green-500/10' 
                            : 'border-gray-700 hover:border-gray-600'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="w-4 h-4 text-green-500"
                        />
                        <span className="text-2xl">{method.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-white">{method.name}</div>
                          <div className="text-xs text-gray-500">{method.accounts[0]}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-green-500 transition">
                  {proofImage ? (
                    <div>
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <p className="text-white font-medium">{proofImage.name}</p>
                      <p className="text-sm text-gray-400">
                        {(proofImage.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={() => setProofImage(null)}
                        className="mt-3 text-red-400 text-sm hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <Image className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-white mb-1">Upload payment proof</p>
                      <p className="text-sm text-gray-500">Screenshot of transfer receipt</p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handleProofImageUpload}
                        className="hidden"
                        required
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading || courses.length === 0}
                  className="btn-primary py-3 px-8 text-lg disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-300">
                <p className="font-medium mb-1">What happens next?</p>
                <p>After submission, our team will verify your documents and payment within 2-3 business days. 
                   You will receive an email notification once your certificate is ready for download.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}