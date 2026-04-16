import Link from 'next/link';
import { BookOpen, Clock, Award } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  progress?: number;
  thumbnail?: string;
}

export default function CourseCard({ id, title, description, level, duration, progress = 0 }: CourseCardProps) {
  const getLevelColor = () => {
    switch (level) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getLevelText = () => {
    switch (level) {
      case 'beginner': return 'Beginner';
      case 'intermediate': return 'Intermediate';
      case 'advanced': return 'Advanced';
      default: return level;
    }
  };

  return (
    <Link href={`/course/${id}`}>
      <div className="group glass-card overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-white group-hover:text-cyan-500 transition">
              {title}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full border ${getLevelColor()}`}>
              {getLevelText()}
            </span>
          </div>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{duration} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>~{duration * 2} hours</span>
            </div>
          </div>
          
          {progress > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {progress === 100 && (
            <div className="mt-4 flex items-center gap-2 text-green-500 text-sm">
              <Award className="w-4 h-4" />
              <span>Completed!</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}