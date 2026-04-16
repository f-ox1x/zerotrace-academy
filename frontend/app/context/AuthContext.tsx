'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
    id: string;
    fullName: string;
    email: string;
    role: string;
    avatar?: string;
    provider?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    googleLogin: (email: string, name: string, photo: string) => Promise<void>;
    facebookLogin: (email: string, name: string, photo: string) => Promise<void>;
    logout: () => void;
}

interface RegisterData {
    fullName: string;
    email: string;
    phone: string;
    password: string;
}

const API_URL = 'http://localhost:5000/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const userProvider = localStorage.getItem('userProvider');
        const rememberMe = localStorage.getItem('rememberMe');

        if (storedToken) {
            // إذا كان مستخدم عادي وليس "تذكرني"، لا تعيد تسجيل الدخول تلقائياً
            if (userProvider === 'local' && rememberMe !== 'true') {
                logout();
                setIsLoading(false);
                return;
            }
            setToken(storedToken);
            fetchUser(storedToken);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchUser = async (authToken: string) => {
        try {
            const response = await axios.get(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setUser(response.data.user);
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('userProvider');
            localStorage.removeItem('rememberMe');
            setToken(null);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    // تسجيل الدخول العادي (Email/Password)
    const login = async (email: string, password: string) => {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        const { token: newToken, user: userData } = response.data;

        localStorage.setItem('token', newToken);
        localStorage.setItem('userProvider', userData.provider || 'local');
        // المستخدم العادي: لا نضع rememberMe، لذلك سيخرج عند إغلاق المتصفح

        setToken(newToken);
        setUser(userData);
    };

    // تسجيل الدخول عبر Google
    const googleLogin = async (email: string, name: string, photo: string) => {
        const response = await axios.post(`${API_URL}/auth/google`, {
            email,
            name,
            photo
        });

        const { token: newToken, user: userData } = response.data;

        localStorage.setItem('token', newToken);
        localStorage.setItem('userProvider', 'google');
        localStorage.setItem('rememberMe', 'true'); // يبقى مسجلاً حتى تسجيل خروج

        setToken(newToken);
        setUser(userData);
    };

    // تسجيل الدخول عبر Facebook
    const facebookLogin = async (email: string, name: string, photo: string) => {
        const response = await axios.post(`${API_URL}/auth/facebook`, {
            email,
            name,
            photo
        });

        const { token: newToken, user: userData } = response.data;

        localStorage.setItem('token', newToken);
        localStorage.setItem('userProvider', 'facebook');
        localStorage.setItem('rememberMe', 'true'); // يبقى مسجلاً حتى تسجيل خروج

        setToken(newToken);
        setUser(userData);
    };

    // تسجيل مستخدم جديد
    const register = async (data: RegisterData) => {
        const response = await axios.post(`${API_URL}/auth/register`, data);
        const { token: newToken, user: userData } = response.data;

        localStorage.setItem('token', newToken);
        localStorage.setItem('userProvider', 'local');

        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userProvider');
        localStorage.removeItem('rememberMe');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, register, googleLogin, facebookLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};