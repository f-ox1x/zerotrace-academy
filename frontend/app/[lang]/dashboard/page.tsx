'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Award, BookOpen, Clock, TrendingUp, Calendar, CheckCircle, ChevronRight } from 'lucide-react';
import translations from '@/app/i18n/translations';

export default function DashboardPage() {
  const { lang } = useParams();
  const t = translations[lang as keyof typeof translations] || translations.en;

  const stats = [
    { label: t.dashboard.completedCourses, value: '4', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { label: t.dashboard.certificates, value: '2', icon: Award, color: 'from-purple-500 to-pink-500' },
    { label: t.dashboard.hoursLearned, value: '124', icon: Clock, color: 'from-green-500 to-cyan-500' },
    { label: 'Current Streak', value: '7', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
  ];

  const recentCourses = [
    { name: 'Linux Fundamentals', progress: 75, lesson: 'Chapter 8/12' },
    { name: 'Web Hacking Basics', progress: 45, lesson: 'Chapter 5/10' },
    { name: 'Network Security', progress: 100, lesson: 'Completed' },
  ];

  const upcomingLabs = [
    { name: 'SQL Injection Lab', due: 'Tomorrow', difficulty: 'Medium' },
    { name: 'XSS Challenge', due: 'In 3 days', difficulty: 'Easy' },
    { name: 'Buffer Overflow', due: 'Next week', difficulty: 'Hard' },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold">
            {t.dashboard.welcome}, <span className="gradient-text">Ahmed!</span>
          </h1>
          <p className="text-gray-400 mt-2">Track your progress and continue learning</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              {t.dashboard.continueLearning}
            </h2>
            <div className="space-y-4">
              {recentCourses.map((course, index) => (
                <div key={index} className="p-4 bg-gray-800/30 rounded-xl">
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{course.name}</span>
                    <span className="text-sm text-cyan-400">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{course.lesson}</span>
                    <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Labs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Upcoming Labs
            </h2>
            <div className="space-y-3">
              {upcomingLabs.map((lab, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div>
                    <span className="text-white font-medium">{lab.name}</span>
                    <p className="text-xs text-gray-400">Due: {lab.due}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${lab.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      lab.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                    }`}>
                    {lab.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass-card p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4">Recent Achievements</h2>
          <div className="flex flex-wrap gap-4">
            {['Linux Master', 'Web Hunter', 'Network Pro', 'Speed Runner'].map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">{achievement}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}