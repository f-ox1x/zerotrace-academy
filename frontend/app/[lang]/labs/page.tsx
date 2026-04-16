'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import LabCard from '@/app/components/LabCard';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import axios from 'axios';
import { 
  Search, 
  Filter, 
  Trophy, 
  Target, 
  Zap,
  Shield,
  ChevronDown,
  BarChart3
} from 'lucide-react';

export default function LabsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [labs, setLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    totalPoints: 0,
    earnedPoints: 0
  });

  const difficulties = [
    { value: 'all', label: 'All Difficulties', icon: <Shield className="w-4 h-4" /> },
    { value: 'easy', label: 'Easy', icon: <Shield className="w-4 h-4 text-green-500" /> },
    { value: 'medium', label: 'Medium', icon: <Zap className="w-4 h-4 text-yellow-500" /> },
    { value: 'hard', label: 'Hard', icon: <Target className="w-4 h-4 text-red-500" /> },
  ];

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchLabs();
    }
  }, [user, authLoading]);

  useEffect(() => {
    filterLabs();
  }, [searchTerm, selectedDifficulty, labs]);

  const fetchLabs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/labs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLabs(response.data || []);
      
      // Calculate stats
      const completed = response.data?.filter((lab: any) => lab.completed).length || 0;
      const totalPoints = response.data?.reduce((acc: number, lab: any) => acc + lab.points, 0) || 0;
      const earnedPoints = response.data?.reduce((acc: number, lab: any) => 
        acc + (lab.completed ? lab.points : 0), 0
      ) || 0;
      
      setStats({
        total: response.data?.length || 0,
        completed,
        totalPoints,
        earnedPoints
      });
    } catch (error) {
      console.error('Error fetching labs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLabs = () => {
    let filtered = [...labs];
    
    if (searchTerm) {
      filtered = filtered.filter(lab => 
        lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(lab => lab.difficulty === selectedDifficulty);
    }
    
    setFilteredLabs(filtered);
  };

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Cybersecurity Labs
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Practice your skills in a safe environment with real-world scenarios
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-sm text-gray-400">Total Labs</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">{stats.earnedPoints}</div>
              <div className="text-sm text-gray-400">Points Earned</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-cyan-500">{stats.totalPoints}</div>
              <div className="text-sm text-gray-400">Total Possible</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="glass-card p-6 mb-8">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-500" />
                <span className="text-white font-medium">Overall Progress</span>
              </div>
              <span className="text-cyan-500 font-bold">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search labs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex gap-2">
              {difficulties.map((diff) => (
                <button
                  key={diff.value}
                  onClick={() => setSelectedDifficulty(diff.value)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                    ${selectedDifficulty === diff.value
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                    }
                  `}
                >
                  {diff.icon}
                  <span className="hidden sm:inline">{diff.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Labs Grid */}
          {filteredLabs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLabs.map((lab: any) => (
                <LabCard key={lab.id} {...lab} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No labs found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDifficulty('all');
                }}
                className="mt-4 text-cyan-500 hover:text-cyan-400"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Leaderboard Preview */}
          <div className="mt-12 glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold text-white">Top Performers</h2>
              </div>
              <a href="/leaderboard" className="text-cyan-500 text-sm hover:underline">
                View Full Leaderboard →
              </a>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((rank) => (
                <div key={rank} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold
                    ${rank === 1 ? 'bg-yellow-500/20 text-yellow-500' : ''}
                    ${rank === 2 ? 'bg-gray-400/20 text-gray-400' : ''}
                    ${rank === 3 ? 'bg-orange-500/20 text-orange-500' : ''}
                  `}>
                    #{rank}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Player Name</p>
                    <p className="text-sm text-gray-500">1,234 points</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-500">45 labs completed</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}