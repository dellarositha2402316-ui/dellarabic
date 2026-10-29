import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  Volume2,
  Sparkles,
  HelpCircle,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  Layers,
  GraduationCap,
  MessageSquareQuote,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const { user, isAdmin, logout } = useAuth();

  const navItems = [
    { id: 'beranda', label: 'Dasbor', icon: LayoutDashboard },
    { id: 'mufrodat', label: 'Mufrodat (Kosakata)', icon: Volume2 },
    { id: 'qawaid', label: 'Qawa\'id (Nahwu-Sharaf)', icon: BookOpen },
    { id: 'hiwar', label: 'Hiwar & Ustadz AI', icon: Sparkles },
    { id: 'kuis', label: 'Latihan & Kuis', icon: HelpCircle },
    { id: 'flashcard', label: 'Flashcard', icon: Layers },
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Panel Guru / Admin', icon: ShieldCheck });
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => onSelectTab('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-arabic text-xl font-bold shadow-md shadow-emerald-900/40 group-hover:scale-105 transition-transform">
              ع
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Al-Arabiyyah
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  العَرَبِيَّة
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                Pembelajaran Bahasa Arab Interaktif
              </p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const isSpecialAdmin = item.id === 'admin';

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? isSpecialAdmin
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                        : 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/30'
                      : isSpecialAdmin
                      ? 'text-amber-400 hover:bg-amber-950/30 hover:text-amber-300'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : ''}`} />
                  <span>{item.label}</span>
                  {isSpecialAdmin && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile & Logout Button */}
          <div className="flex items-center gap-3">
            {/* User Chip */}
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-800/80 border border-slate-700/60 rounded-full py-1 pl-1.5 pr-3">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-emerald-500/40"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <div className="text-left">
                <p className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">
                  {user?.name}
                </p>
                <div className="flex items-center gap-1">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      isAdmin ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                  />
                  <p className="text-[10px] text-slate-400 leading-none">
                    {isAdmin ? 'Admin (Guru)' : 'Santri / Siswa'}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Button (Tombol Logout Wajib Sesuai Permintaan) */}
            <button
              onClick={logout}
              title="Keluar dari akun (Logout)"
              className="py-2 px-3 sm:px-3.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-rose-200 border border-rose-800/60 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-800 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
