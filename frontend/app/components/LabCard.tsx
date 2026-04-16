'use client';

import Link from 'next/link';
import { Target, Clock, Trophy, Shield, Zap, ChevronRight } from 'lucide-react';

interface LabCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  completed?: boolean;
  timeEstimate?: string;
}

export default function LabCard({ 
  id, 
  title, 
  description, 
  difficulty, 
  points, 
  completed = false,
  timeEstimate = "30 mins"
}: LabCardProps) {
  
  const getDifficultyConfig = () => {
    switch (difficulty) {
      case 'easy':
        return {
          color: 'bg-green-500/20 text-green-400 border-green-500/30',
          badge: 'Easy',
          icon: <Shield className="w-4 h-4" />
        };
      case 'medium':
        return {
          color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          badge: 'Medium',
          icon: <Zap className="w-4 h-4" />
        };
      case 'hard':
        return {
          color: 'bg-red-500/20 text-red-400 border-red-500/30',
          badge: 'Hard',
          icon: <Target className="w-4 h-4" />
        };
      default:
        return {
          color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          badge: 'Unknown',
          icon: <Shield className="w-4 h-4" />
        };
    }
  };

  const config = getDifficultyConfig();

  return (
    <Link href={`/lab/${id}`}>
      <div className={`group glass-card overflow-hidden transition-all duration-300 cursor-pointer hover:transform hover:scale-105 ${
        completed ? 'border-green-500/30 bg-green-500/5' : ''
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${config.color} border`}>
                {config.icon}
              </div>
              <h3 className="text-xl font-semibold text-white group-hover:text-cyan-500 transition">
                {title}
              </h3>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full border ${config.color}`}>
              {config.badge}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm mb-4">
            <div className="flex items-center gap-1 text-gray-500">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-500 font-medium">{points} points</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{timeEstimate}</span>
            </div>
          </div>

          {/* Progress/Status */}
          {completed ? (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-500 text-sm font-medium">Completed</span>
              </div>
              <span className="text-green-500 text-sm flex items-center gap-1">
                View Solution <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-cyan-500 text-sm font-medium">Ready to start</span>
              </div>
              <span className="text-gray-400 text-sm flex items-center gap-1 group-hover:text-cyan-500 transition">
                Start Lab <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}