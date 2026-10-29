import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginView } from './components/LoginView';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { MufrodatView } from './components/MufrodatView';
import { QawaidView } from './components/QawaidView';
import { HiwarView } from './components/HiwarView';
import { QuizView } from './components/QuizView';
import { FlashcardView } from './components/FlashcardView';
import { AdminPanel } from './components/AdminPanel';
import { INITIAL_MUFRODAT } from './data/arabicData';
import { fetchCustomMufrodat, fetchAnnouncements } from './services/api';
import { MufrodatItem, Announcement } from './types';
import { Loader2 } from 'lucide-react';

const MASTERED_STORAGE_KEY = 'al_arabiyyah_mastered_ids_v1';

function MainAppContent() {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('beranda');

  // Mufrodat state
  const [customMufrodat, setCustomMufrodat] = useState<MufrodatItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  // Load mastered IDs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(MASTERED_STORAGE_KEY);
      if (stored) {
        setMasteredIds(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Fetch custom mufrodat and announcements from server
  const reloadServerData = async () => {
    try {
      const [customWords, annList] = await Promise.all([
        fetchCustomMufrodat(),
        fetchAnnouncements(),
      ]);
      setCustomMufrodat(customWords.map((w) => ({ ...w, isCustom: true })));
      setAnnouncements(annList);
    } catch (e) {
      console.warn('Failed to load initial server data:', e);
    }
  };

  useEffect(() => {
    reloadServerData();
  }, []);

  // Toggle vocabulary mastery
  const toggleMastered = (id: string) => {
    setMasteredIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      localStorage.setItem(MASTERED_STORAGE_KEY, JSON.stringify(Array.from(updated)));
      return updated;
    });
  };

  // Combine initial curated mufrodat with custom entries from admin
  const allMufrodat: MufrodatItem[] = [...INITIAL_MUFRODAT, ...customMufrodat];

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mb-3" />
        <p className="text-sm font-medium text-slate-400">Memuat Al-Arabiyyah...</p>
      </div>
    );
  }

  // 2. Wajib Login: Protected Route Enforced
  // Jika belum login, wajib menampilkan halaman login
  if (!isAuthenticated) {
    return <LoginView />;
  }

  // 3. Authenticated App Layout with Navbar & Logout
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar currentTab={currentTab} onSelectTab={setCurrentTab} />

      <main className="flex-1 pb-16">
        {currentTab === 'beranda' && (
          <DashboardView
            onNavigate={setCurrentTab}
            masteredCount={masteredIds.size}
            totalMufrodat={allMufrodat.length}
          />
        )}

        {currentTab === 'mufrodat' && (
          <MufrodatView
            mufrodatList={allMufrodat}
            masteredIds={masteredIds}
            onToggleMastered={toggleMastered}
          />
        )}

        {currentTab === 'qawaid' && <QawaidView />}

        {currentTab === 'hiwar' && <HiwarView />}

        {currentTab === 'kuis' && <QuizView />}

        {currentTab === 'flashcard' && (
          <FlashcardView
            mufrodatList={allMufrodat}
            masteredIds={masteredIds}
            onToggleMastered={toggleMastered}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPanel
            customMufrodat={customMufrodat}
            announcements={announcements}
            onRefreshData={reloadServerData}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-arabic text-base font-bold text-emerald-600 dark:text-emerald-400" dir="rtl">
            العَرَبِيَّةُ لُغَةُ القُرْآنِ الكَرِيمِ
          </p>
          <p>© 2026 Al-Arabiyyah • Platform Pembelajaran Bahasa Arab Terpadu</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
