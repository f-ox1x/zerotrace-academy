'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, Users, Star, ChevronRight } from 'lucide-react';
import translations from '@/app/i18n/translations';

export default function CoursesPage() {
  const { lang } = useParams();
  const t = translations[lang as keyof typeof translations] || translations.en;
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // التحقق من وجود الترجمة
  if (!t.courses) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const courses = [
    {
      id: 1,
      title: 'Linux Fundamentals for Security',
      level: 'Beginner',
      duration: '40 hours',
      students: 1245,
      rating: 4.8,
      image: '🐧',
      color: 'from-green-500 to-cyan-500',
    },
    {
      id: 2,
      title: 'Network Security Basics',
      level: 'Beginner',
      duration: '35 hours',
      students: 982,
      rating: 4.7,
      image: '🌐',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 3,
      title: 'Web Application Penetration Testing',
      level: 'Intermediate',
      duration: '60 hours',
      students: 2156,
      rating: 4.9,
      image: '🌍',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 4,
      title: 'Advanced Exploitation Techniques',
      level: 'Advanced',
      duration: '80 hours',
      students: 856,
      rating: 4.9,
      image: '💀',
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 5,
      title: 'Cryptography & Security',
      level: 'Intermediate',
      duration: '45 hours',
      students: 734,
      rating: 4.6,
      image: '🔐',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 6,
      title: 'Cloud Security & DevSecOps',
      level: 'Advanced',
      duration: '55 hours',
      students: 623,
      rating: 4.8,
      image: '☁️',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  const filteredCourses = courses.filter(course => {
    if (activeFilter !== 'all' && course.level.toLowerCase() !== activeFilter) return false;
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filters = [
    { id: 'all', label: t.courses.filterAll || 'All' },
    { id: 'beginner', label: t.courses.filterBeginner || 'Beginner' },
    { id: 'intermediate', label: t.courses.filterIntermediate || 'Intermediate' },
    { id: 'advanced', label: t.courses.filterAdvanced || 'Advanced' },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.courses.title || 'Our Courses'}</span>
          </h1>
          <p className="text-xl text-gray-400">{t.courses.subtitle || 'Choose the right path for your level'}</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 text-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg transition-all ${activeFilter === filter.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700'
                    }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No courses found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card overflow-hidden group"
              >
                <div className={`h-32 bg-gradient-to-r ${course.color} flex items-center justify-center text-5xl`}>
                  {course.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400">
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-300">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {course.students.toLocaleString()} students
                    </span>
                  </div>
                  <Link
                    href={`/${lang}/course/${course.id}`}
                    className="flex items-center justify-between text-cyan-400 font-semibold group-hover:gap-2 transition-all"
                  >
                    {t.courses.startCourse || 'Start Learning'}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}