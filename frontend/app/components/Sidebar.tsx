'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  FlaskConical,
  Award,
  Settings,
  Users,
  Shield,
  Trophy,
  X,
  ChevronRight,
  LayoutDashboard,
  FileText,
  CreditCard,
  HelpCircle,
  LogOut,
  Terminal,
  Activity,
  Zap
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: '/dashboard', label: 'Command Center', icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: '/courses', label: 'Academy Paths', icon: <BookOpen className="w-5 h-5" /> },
    { href: '/labs', label: 'Vulnerable Labs', icon: <FlaskConical className="w-5 h-5" /> },
    { href: '/certificate-request', label: 'Certifications', icon: <Award className="w-5 h-5" /> },
    { href: '/leaderboard', label: 'Elite Rank', icon: <Trophy className="w-5 h-5" /> },
  ];

  const adminItems = [
    { href: '/admin', label: 'Core Control', icon: <Shield className="w-5 h-5" /> },
    { href: '/admin/users', label: 'Operatives', icon: <Users className="w-5 h-5" /> },
    { href: '/admin/certificates', label: 'Issue Clearances', icon: <FileText className="w-5 h-5" /> },
    { href: '/admin/payments', label: 'Ledger Transact', icon: <CreditCard className="w-5 h-5" /> },
    { href: '/admin/courses', label: 'Manage Modules', icon: <Settings className="w-5 h-5" /> },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Overlay مع تمويه زجاجي داكن */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity duration-500"
          onClick={onClose}
        />
      )}

      {/* Sidebar - الهيكل الرئيسي */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 glass-cyber z-50 transform transition-all duration-500 ease-in-out
        flex flex-col border-r border-cyan-500/20
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:relative md:translate-x-0
      `}>

        {/* شريط المسح الضوئي العلوي (تأثير جمالي) */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/50 animate-pulse shadow-[0_0_15px_cyan]" />

        {/* Logo Section */}
        <div className="p-8 border-b border-white/5 relative group">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="relative">
              <div className="w-12 h-12 bg-gray-900 border border-cyan-500/50 rounded-lg flex items-center justify-center group-hover:border-cyan-400 transition-colors duration-500">
                <Shield className="w-7 h-7 text-cyan-500 group-hover:scale-110 transition-transform" />
              </div>
              {/* نقطة "النشاط" الوامضة */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white">
                ZERO<span className="text-cyan-500">TRACE</span>
              </span>
              <span className="text-[10px] font-mono text-cyan-500/60 leading-none uppercase tracking-widest">
                Academy OS v2.0
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden absolute top-8 right-4 text-gray-500 hover:text-cyan-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Module - قسم المستخدم الاحترافي */}
        {user && (
          <div className="mx-4 mt-6 p-4 rounded-xl bg-black/40 border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 p-1">
                  <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-lg font-bold text-cyan-500 uppercase">
                      {user.full_name?.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-500 rounded-full border-2 border-gray-900 shadow-[0_0_5px_cyan]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate font-mono">
                  {user.full_name?.split(' ')[0]} <span className="text-cyan-500">_</span>
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Activity className="w-3 h-3 text-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-green-500/80 uppercase">Active Connection</span>
                </div>
              </div>
            </div>

            {/* شريط التقدم (XP Bar) */}
            <div className="mt-4 space-y-1 relative z-10">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-gray-500">SYSTEM_XP</span>
                <span className="text-cyan-500">{user.total_score || 0} PTS</span>
              </div>
              <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  style={{ width: '65%' }} // هنا تضع نسبة حقيقية مستقبلاً
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-8 scrollbar-hide">

          {/* Main Navigation */}
          <div>
            <h3 className="text-[10px] font-mono font-black text-gray-600 uppercase tracking-[0.2em] px-4 mb-4 flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Navigation_Root
            </h3>
            <div className="space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`
                      group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden
                      ${active
                        ? 'bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]'
                        : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                      }
                    `}
                  >
                    {/* مؤشر النيون النشط */}
                    {active && (
                      <div className="absolute left-0 top-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_cyan]" />
                    )}

                    <span className={`${active ? 'text-cyan-400' : 'group-hover:text-cyan-400 transition-colors'}`}>
                      {item.icon}
                    </span>
                    <span className="flex-1 text-sm font-medium tracking-wide font-mono italic">
                      {item.label}
                    </span>
                    {active && <Zap className="w-3 h-3 text-cyan-500 animate-bounce" />}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Admin Command Section */}
          {user?.role === 'admin' && (
            <div className="pt-4 border-t border-white/5">
              <h3 className="text-[10px] font-mono font-black text-purple-500/70 uppercase tracking-[0.2em] px-4 mb-4 flex items-center gap-2">
                <Shield className="w-3 h-3" /> Admin_Privileges
              </h3>
              <div className="space-y-1">
                {adminItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`
                        group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative
                        ${active
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                          : 'text-gray-500 hover:text-purple-400 hover:bg-purple-500/5'
                        }
                      `}
                    >
                      {active && (
                        <div className="absolute left-0 top-0 w-1 h-full bg-purple-500 shadow-[0_0_15px_purple]" />
                      )}
                      {item.icon}
                      <span className="flex-1 text-sm font-mono italic">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-black/20 border-t border-white/5">
          <div className="flex flex-col gap-1">
            <Link
              href="/settings"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-tighter">Config</span>
            </Link>

            <button
              onClick={() => { logout(); onClose(); }}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-all duration-300"
            >
              <LogOut className="w-4 h-4 text-red-500 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Terminate Session</span>
            </button>
          </div>

          <div className="mt-4 px-4">
            <p className="text-[9px] font-mono text-gray-600 text-center uppercase tracking-widest">
              Encrypted Connection // RSA-4096
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}