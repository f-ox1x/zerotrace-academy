'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Target, 
  Clock, 
  Trophy, 
  Shield, 
  Zap,
  AlertCircle,
  CheckCircle,
  Copy,
  Terminal,
  HelpCircle,
  Flag,
  ArrowLeft
} from 'lucide-react';

export default function LabDetailPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [lab, setLab] = useState<any>(null);
  const [flag, setFlag] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchLab();
    }
  }, [user, authLoading, id]);

  const fetchLab = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/labs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLab(response.data);
    } catch (error) {
      console.error('Error fetching lab:', error);
      toast.error('Lab not found');
      router.push('/labs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFlag = async () => {
    if (!flag.trim()) {
      toast.error('Please enter a flag');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5000/api/labs/${id}/verify`, 
        { flag },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.correct) {
        toast.success('Correct flag! Lab completed! 🎉');
        setLab({ ...lab, completed: true });
        setFlag('');
      } else {
        toast.error('Incorrect flag. Try again!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to verify flag');
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied to clipboard!');
  };

  const getDifficultyConfig = () => {
    if (!lab) return { color: 'gray', badge: 'Unknown', icon: <Shield /> };
    switch (lab.difficulty) {
      case 'easy':
        return { color: 'green', badge: 'Easy', icon: <Shield className="w-5 h-5" /> };
      case 'medium':
        return { color: 'yellow', badge: 'Medium', icon: <Zap className="w-5 h-5" /> };
      case 'hard':
        return { color: 'red', badge: 'Hard', icon: <Target className="w-5 h-5" /> };
      default:
        return { color: 'gray', badge: 'Unknown', icon: <Shield /> };
    }
  };

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  if (!lab) {
    return null;
  }

  const difficultyConfig = getDifficultyConfig();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Labs
          </button>

          {/* Header */}
          <div className="glass-card p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-${difficultyConfig.color}-500/20 rounded-2xl flex items-center justify-center`}>
                  {difficultyConfig.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{lab.title}</h1>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-3 py-1 rounded-full border border-${difficultyConfig.color}-500/30 bg-${difficultyConfig.color}-500/20 text-${difficultyConfig.color}-400`}>
                      {difficultyConfig.badge}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Trophy className="w-4 h-4" />
                      <span className="font-medium">{lab.points} points</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>~30 mins</span>
                    </div>
                  </div>
                </div>
              </div>
              {lab.completed && (
                <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 font-medium">Completed</span>
                </div>
              )}
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">{lab.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Target IP */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-500" />
                  Target Information
                </h2>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Target IP Address</p>
                      <code className="text-cyan-500 font-mono text-lg">{lab.target_ip}</code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(lab.target_ip)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition"
                    >
                      <Copy className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  {lab.initial_command && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-sm text-gray-400 mb-2">Initial Command</p>
                      <code className="block bg-black/50 p-3 rounded-lg font-mono text-sm text-green-400">
                        {lab.initial_command}
                      </code>
                    </div>
                  )}
                </div>
              </div>

              {/* Hints */}
              {lab.hints && lab.hints.length > 0 && (
                <div className="glass-card p-6">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center justify-between w-full"
                  >
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-yellow-500" />
                      Hints
                    </h2>
                    <span className="text-gray-400">{showHint ? '▼' : '▶'}</span>
                  </button>
                  {showHint && (
                    <div className="mt-4 space-y-3">
                      {lab.hints.map((hint: string, index: number) => (
                        <div key={index} className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-yellow-300 text-sm">
                          💡 {hint}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Flag Submission */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Flag className="w-5 h-5 text-red-500" />
                  Submit Flag
                </h2>
                {!lab.completed ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-300 text-sm mb-2">Flag</label>
                      <input
                        type="text"
                        value={flag}
                        onChange={(e) => setFlag(e.target.value)}
                        placeholder="FLAG{...}"
                        className="input-field font-mono"
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmitFlag()}
                      />
                    </div>
                    <button
                      onClick={handleSubmitFlag}
                      disabled={submitting}
                      className="w-full btn-primary py-3 disabled:opacity-50"
                    >
                      {submitting ? 'Verifying...' : 'Submit Flag'}
                    </button>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-green-500 font-medium">Lab Completed!</p>
                    <p className="text-sm text-gray-400 mt-1">You earned {lab.points} points</p>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-500" />
                  Pro Tips
                </h2>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500">•</span>
                    Use `nmap` for port scanning
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500">•</span>
                    Check common vulnerabilities
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500">•</span>
                    Look for hidden directories
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500">•</span>
                    Use `curl` for HTTP requests
                  </li>
                </ul>
              </div>

              {/* Terminal Simulation */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-green-500" />
                  Web Terminal
                </h2>
                <div className="bg-black/80 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2">$ connected to {lab.target_ip}</div>
                  <div className="text-gray-400">Type your commands here...</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-green-400">$</span>
                    <input
                      type="text"
                      placeholder="nmap -sV target"
                      className="flex-1 bg-transparent border-none outline-none text-white text-sm"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Note: This is a simulation. Use your own tools for actual exploitation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}