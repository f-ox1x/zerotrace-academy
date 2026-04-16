'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// تعريف بسيط لنوع المستخدم
interface User {
    id: string;
    email: string;
    name?: string;
}

// تعريف نوع السياق
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

// إنشاء السياق
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider الذي سيلف تطبيقك
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // دالة تسجيل الدخول (ستربطها بالـ API لاحقاً)
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // محاكاة اتصال API
            console.log('Logging in with:', email, password);
            // بعد نجاح الاتصال، قم بتحديث حالة المستخدم
            // setUser({ id: '1', email: email });
        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook مخصص لاستخدام السياق بسهولة
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};