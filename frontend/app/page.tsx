'use client';

// ============================================================================
// IMPORTS
// ============================================================================
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Code2, 
  Award, 
  Users, 
  ArrowRight, 
  Zap,
  Trophy,
  Sparkles,
  Target,
  Rocket,
  CheckCircle,
  BookOpen,
  Terminal,
  Globe
} from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgGradient: string;
}

interface LearningPath {
  level: string;
  title: string;
  duration: string;
  icon: React.ReactNode;
  color: string;
}

// ============================================================================
// CONSTANTS & DATA
// ============================================================================
const STATS_DATA: StatItem[] = [
  { 
    value: '10K+', 
    label: 'Students', 
    icon: <Users className="w-6 h-6" />, 
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10'
  },
  { 
    value: '50+', 
    label: 'Courses', 
    icon: <BookOpen className="w-6 h-6" />, 
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  { 
    value: '100+', 
    label: 'Labs', 
    icon: <Terminal className="w-6 h-6" />, 
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  },
  { 
    value: '95%', 
    label: 'Success Rate', 
    icon: <Trophy className="w-6 h-6" />, 
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10'
  },
];

const FEATURES_DATA: FeatureItem[] = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Hands-on Labs',
    description: 'Real-world scenarios with practical exercises',
    color: 'from-cyan-500 to-blue-500',
    bgGradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals',
    color: 'from-blue-500 to-purple-500',
    bgGradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Verified Certificates',
    description: 'Get blockchain-verified certificates',
    color: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Community Support',
    description: 'Join our global cybersecurity community',
    color: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-500/20 to-rose-500/20',
  },
];

const LEARNING_PATHS_DATA: LearningPath[] = [
  { 
    level: 'Beginner', 
    title: 'Linux & Networking', 
    duration: '40 hours', 
    icon: <Target className="w-6 h-6" />,
    color: 'from-green-500 to-cyan-500'
  },
  { 
    level: 'Intermediate', 
    title: 'Web Hacking', 
    duration: '60 hours', 
    icon: <Code2 className="w-6 h-6" />,
    color: 'from-blue-500 to-purple-500'
  },
  { 
    level: 'Advanced', 
    title: 'Exploitation', 
    duration: '80 hours', 
    icon: <Rocket className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500'
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md rounded-full px-5 py-2.5 mb-8 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
            >
              <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="text-sm font-semibold text-cyan-300 tracking-wide">START YOUR JOURNEY TODAY</span>
            </motion.div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                ZeroTrace Academy
              </span>
              <br />
              <span className="text-white">Master Cybersecurity</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              From beginner to professional. Learn ethical hacking, penetration testing, 
              and security fundamentals with our hands-on courses and labs.
            </p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Link 
                href="/register" 
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <Link 
                href="/courses" 
                className="px-8 py-4 bg-gray-800/50 backdrop-blur-md text-white font-semibold rounded-xl border-2 border-gray-600 hover:border-cyan-500/50 hover:bg-gray-800/70 transition-all duration-300"
              >
                Explore Courses
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-20 border-t border-gray-800/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS_DATA.map((stat, index) => (
              <motion.div
                key={`stat-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className={`${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105`}>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className={`${stat.color} transition-transform group-hover:scale-110 duration-300`}>
                      {stat.icon}
                    </div>
                    <span className="text-4xl md:text-5xl font-bold text-white">
                      {stat.value}
                    </span>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-cyan-500/30">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300 tracking-wide">WHY CHOOSE US</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Why Choose ZeroTrace?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We provide everything you need to start your cybersecurity career
            </p>
          </motion.div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES_DATA.map((feature, index) => (
              <motion.div
                key={`feature-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative p-8">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-blue-400 transition-all">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-semibold">Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LEARNING PATHS SECTION ========== */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Learning Path
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Structured curriculum from zero to hero
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {LEARNING_PATHS_DATA.map((path, index) => (
              <motion.div
                key={`path-${index}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                
                <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/30 transition-all">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  
                  {/* Icon & Level */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-r ${path.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <div className="text-white">{path.icon}</div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        {path.level}
                      </span>
                      <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-transparent rounded-full mt-1" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {path.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {path.duration} of content
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-cyan-400 font-semibold">{index + 1}0%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(index + 1) * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className={`h-full bg-gradient-to-r ${path.color} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
            
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-gray-700/50 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 text-center">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  Ready to{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Start Your Journey?
                  </span>
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                >
                  Join thousands of students who have launched their cybersecurity careers with ZeroTrace
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link 
                    href="/register" 
                    className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <span className="relative z-10 text-lg">Join ZeroTrace Now</span>
                    <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}