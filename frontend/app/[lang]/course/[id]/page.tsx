'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  Play,
  Lock,
  ChevronRight,
  FileText,
  Code2,
  Terminal
} from 'lucide-react';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedLesson, setExpandedLesson] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      fetchCourse();
    }
  }, [user, authLoading, id]);

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourse(response.data);
      setLessons(response.data.lessons || []);
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error('Course not found');
      router.push('/courses');
    } finally {
      setLoading(false);
    }
  };

  const completeLesson = async (lessonId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/courses/${id}/lessons/${lessonId}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update local state
      setLessons(lessons.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, completed: true }
          : lesson
      ));
      
      toast.success('Lesson completed! +10 XP');
    } catch (error) {
      toast.error('Error completing lesson');
    }
  };

  const getLevelColor = () => {
    if (!course) return '';
    switch (course.level) {
      case 'beginner': return 'text-green-400 bg-green-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getLevelText = () => {
    if (!course) return '';
    switch (course.level) {
      case 'beginner': return 'Beginner';
      case 'intermediate': return 'Intermediate';
      case 'advanced': return 'Advanced';
      default: return course.level;
    }
  };

  const completedCount = lessons.filter(l => l.completed).length;
  const progress = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  if (!course) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Course Header */}
            <div className="glass-card p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor()}`}>
                      {getLevelText()}
                    </span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration_hours} hours
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{course.title}</h1>
                  <p className="text-gray-400">{course.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyan-500">{Math.round(progress)}%</div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {completedCount} of {lessons.length} lessons completed
                </p>
              </div>
            </div>

            {/* Lessons List */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-500" />
                Course Content
              </h2>
              
              {lessons.map((lesson, index) => (
                <div key={lesson.id} className="glass-card overflow-hidden">
                  <button
                    onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <span className="text-sm text-gray-400">{index + 1}</span>
                        )}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-white">{lesson.title}</h3>
                        <p className="text-xs text-gray-500">Lesson {index + 1}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!lesson.completed && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            completeLesson(lesson.id);
                          }}
                          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-sm text-white transition"
                        >
                          Mark Complete
                        </button>
                      )}
                      <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedLesson === lesson.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </button>
                  
                  {expandedLesson === lesson.id && (
                    <div className="p-4 border-t border-gray-800 bg-gray-800/30">
                      <div className="prose prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                        
                        {lesson.commands && lesson.commands.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-semibold text-cyan-500 mb-2 flex items-center gap-2">
                              <Terminal className="w-4 h-4" />
                              Commands to Practice
                            </h4>
                            <div className="space-y-2">
                              {lesson.commands.map((cmd, idx) => (
                                <div key={idx} className="bg-gray-900 rounded-lg p-3">
                                  <code className="text-green-400 text-sm">{cmd.command}</code>
                                  <p className="text-gray-400 text-xs mt-1">{cmd.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {lesson.quiz && lesson.quiz.questions && (
                          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <h4 className="text-sm font-semibold text-yellow-500 mb-2 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Quiz Available
                            </h4>
                            <p className="text-sm text-gray-300">
                              This lesson contains a quiz. Complete it to test your knowledge!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Certificate Alert */}
            {progress === 100 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl">
                <div className="flex items-center gap-4">
                  <Award className="w-12 h-12 text-cyan-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Congratulations!</h3>
                    <p className="text-gray-300 mb-3">You've completed all lessons in this course!</p>
                    <Link href="/certificate-request" className="btn-primary inline-block">
                      Request Your Certificate
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}