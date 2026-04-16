'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Shield, Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import translations from '@/app/i18n/translations';

export default function Footer() {
    const { lang } = useParams();
    const t = translations[lang as keyof typeof translations] || translations.en;

    const footerLinks = {
        company: ['About Us', 'Careers', 'Blog', 'Contact'],
        learning: ['Courses', 'Labs', 'Certificates', 'Community'],
        legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'],
    };

    return (
        <footer className="relative z-10 bg-gray-900/80 backdrop-blur-md border-t border-gray-800">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                ZeroTrace Academy
                            </span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Master cybersecurity with hands-on labs and expert instruction.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-cyan-400 transition"><Github className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-cyan-400 transition"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-cyan-400 transition"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-gray-400 hover:text-cyan-400 transition text-sm">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Learning Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Learning</h3>
                        <ul className="space-y-2">
                            {footerLinks.learning.map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-gray-400 hover:text-cyan-400 transition text-sm">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Mail className="w-4 h-4 text-cyan-400" /> support@zerotrace.com
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Phone className="w-4 h-4 text-cyan-400" /> +967 XXX XXX XXX
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <MapPin className="w-4 h-4 text-cyan-400" /> Yemen, Sana'a
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} ZeroTrace Academy. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}