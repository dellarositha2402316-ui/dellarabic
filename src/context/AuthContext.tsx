import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  loginWithAdminCredentials: (username: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (customEmail?: string, customName?: string) => Promise<{ success: boolean; error?: string }>;
  loginAsStudentDemo: (name?: string) => void;
  logout: () => void;
}

const STORAGE_KEY = 'al_arabiyyah_auth_user_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id && parsed.role) {
          setUser(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to parse cached auth:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Login khusus Admin sesuai permintaan pengguna:
  // username: rosithadmin, password: 64rositha
  const loginWithAdminCredentials = async (
    username: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedUsername = username.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if (trimmedUsername === 'rosithadmin' && trimmedPass === '64rositha') {
      const adminUser: User = {
        id: 'admin-rositha',
        name: 'Rositha (Admin Pembelajaran)',
        username: 'rosithadmin',
        email: 'della.rositha.2402316@students.um.ac.id',
        role: 'admin',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        provider: 'credentials',
        createdAt: new Date().toISOString(),
      };
      saveUserSession(adminUser);
      return { success: true };
    }

    return {
      success: false,
      error: 'Username atau password admin salah. Gunakan username: rosithadmin & password: 64rositha',
    };
  };

  // Google Sign-In Flow
  const loginWithGoogle = async (
    customEmail?: string,
    customName?: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate Google OAuth authentication
    const email = customEmail || 'della.rositha.2402316@students.um.ac.id';
    const name = customName || (email.split('@')[0].replace(/\./g, ' ').toUpperCase());

    // If the Google account is the designated admin account, assign admin role
    const role: UserRole = email.includes('rositha') ? 'admin' : 'student';

    const googleUser: User = {
      id: 'g-user-' + Math.random().toString(36).substring(2, 9),
      name: name,
      email: email,
      role: role,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      provider: 'google',
      createdAt: new Date().toISOString(),
    };

    saveUserSession(googleUser);
    return { success: true };
  };

  const loginAsStudentDemo = (studentName: string = 'Ahmad Fauzan (Santri)') => {
    const studentUser: User = {
      id: 'std-' + Date.now(),
      name: studentName,
      email: 'santri.fauzan@pesantren.id',
      role: 'student',
      avatarUrl: `https://api.dicebear.com/7.x/micah/svg?seed=Ahmad`,
      provider: 'credentials',
      createdAt: new Date().toISOString(),
    };
    saveUserSession(studentUser);
  };

  const logout = () => {
    saveUserSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isLoading,
        loginWithAdminCredentials,
        loginWithGoogle,
        loginAsStudentDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
