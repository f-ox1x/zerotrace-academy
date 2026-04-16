'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Shield, Code2, Award, Users, ArrowRight, Zap, Trophy,
    BookOpen, Terminal, Globe, Target, Rocket, CheckCircle, Sparkles
} from 'lucide-react';

export default function HomePage() {
    const { lang } = useParams();
    const t = {
        hero: {
            badge: "Start Your Journey Today",
            title: "ZeroTrace Academy",
            subtitle: "Master Cybersecurity",
            description: "From beginner to professional. Learn ethical hacking, penetration testing, and security fundamentals."
        },
        stats: {
            students: "Students",
            courses: "Courses",
            labs: "Labs",
            successRate: "Success Rate"
        },
        common: {
            getStarted: "Get Started",
            exploreCourses: "Explore Courses"
        }
    };

    const stats = [
        { value: '10K+', label: t.stats.students, icon: Users, color: 'text-cyan-400' },
        { value: '50+', label: t.stats.courses, icon: BookOpen, color: 'text-blue-400' },
        { value: '100+', label: t.stats.labs, icon: Terminal, color: 'text-purple-400' },
        { value: '95%', label: t.stats.successRate, icon: Trophy, color: 'text-yellow-400' },
    ];

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center">
                <div className="container mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-5xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md rounded-full px-5 py-2.5 mb-8 border border-cyan-500/30"
                        >
                            <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
                            <span className="text-sm font-semibold text-cyan-300">{t.hero.badge}</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                {t.hero.title}
                            </span>
                            <br />
                            <span className="text-white">{t.hero.subtitle}</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
                            {t.hero.description}
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-5 justify-center"
                        >
                            <Link href={`/${lang}/register`} className="btn-primary group">
                                {t.common.getStarted}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href={`/${lang}/courses`} className="btn-secondary">
                                {t.common.exploreCourses}
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-t border-gray-800/30">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-6 text-center group hover:border-cyan-500/50 transition-all hover:scale-105"
                            >
                                <stat.icon className={`w-10 h-10 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                                <span className="text-3xl md:text-4xl font-bold text-white block">{stat.value}</span>
                                <p className="text-gray-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}