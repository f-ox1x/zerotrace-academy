'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Users, DollarSign, Award, Eye, CheckCircle, XCircle, Clock,
  TrendingUp, UserPlus, FileText, CreditCard
} from 'lucide-react';

export default function AdminDashboard() {
  const { lang } = useParams();

  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Revenue', value: '$12,345', change: '+8%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'Certificates Issued', value: '456', change: '+15%', icon: Award, color: 'from-purple-500 to-pink-500' },
    { label: 'Pending Reviews', value: '23', change: '-3%', icon: Clock, color: 'from-orange-500 to-red-500' },
  ];

  const recentUsers = [
    { name: 'Ahmed Mohammed', email: 'ahmed@example.com', date: '2024-01-15', status: 'active' },
    { name: 'Fatima Ali', email: 'fatima@example.com', date: '2024-01-14', status: 'active' },
    { name: 'Omar Hassan', email: 'omar@example.com', date: '2024-01-13', status: 'pending' },
  ];

  const pendingCertificates = [
    { user: 'Ali Saeed', course: 'Web Hacking', date: '2024-01-15', payment: 'Confirmed' },
    { user: 'Noor Ahmed', course: 'Linux Basics', date: '2024-01-14', payment: 'Pending' },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage users, payments, and certificates</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-800 pb-4">
          <Link href={`/${lang}/admin`} className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
            Overview
          </Link>
          <Link href={`/${lang}/admin/users`} className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition">
            Users
          </Link>
          <Link href={`/${lang}/admin/payments`} className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition">
            Payments
          </Link>
          <Link href={`/${lang}/admin/certificates`} className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition">
            Certificates
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-green-400">{stat.change}</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              Recent Users
            </h2>
            <div className="space-y-3">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div>
                    <span className="text-white font-medium">{user.name}</span>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                      {user.status}
                    </span>
                    <button className="p-1 hover:bg-gray-700 rounded transition">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Link href={`/${lang}/admin/users`} className="mt-4 text-cyan-400 text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View All Users <TrendingUp className="w-3 h-3" />
            </Link>
          </div>

          {/* Pending Certificates */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              Pending Certificates
            </h2>
            <div className="space-y-3">
              {pendingCertificates.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div>
                    <span className="text-white font-medium">{cert.user}</span>
                    <p className="text-xs text-gray-400">{cert.course}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${cert.payment === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                      {cert.payment}
                    </span>
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-green-500/20 rounded transition">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </button>
                      <button className="p-1 hover:bg-red-500/20 rounded transition">
                        <XCircle className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="glass-card p-4 text-center hover:border-cyan-500/50 transition-all group">
            <UserPlus className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-white">Add New Course</span>
          </button>
          <button className="glass-card p-4 text-center hover:border-cyan-500/50 transition-all group">
            <FileText className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-white">Create Certificate</span>
          </button>
          <button className="glass-card p-4 text-center hover:border-cyan-500/50 transition-all group">
            <CreditCard className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-white">Verify Payments</span>
          </button>
        </div>
      </div>
    </div>
  );
}