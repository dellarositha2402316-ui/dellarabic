import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { DAILY_QUOTES } from '../data/arabicData';
import { playArabicAudio } from '../utils/audio';
import { fetchAnnouncements } from '../services/api';
import { Announcement } from '../types';
import {
  BookOpen,
  Volume2,
  Sparkles,
  HelpCircle,
  Layers,
  ArrowRight,
  Award,
  CheckCircle,
  Bell,
  VolumeX,
  Play,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
  masteredCount: number;
  totalMufrodat: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  masteredCount,
  totalMufrodat,
}) => {
  const { user, isAdmin } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  useEffect(() => {
    fetchAnnouncements().then(setAnnouncements);
  }, []);

  const currentQuote = DAILY_QUOTES[activeQuoteIdx % DAILY_QUOTES.length];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome & Motivational Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-700/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portal Pembelajaran Bahasa Arab Terpadu</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ahlan wa Sahlan,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                {user?.name || 'Sahabat Al-Arabiyyah'}
              </span>
              !
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Tingkatkan kemampuan bahasa Arab Fushah dengan kosakata tematik berharakat lengkap, kaidah
              Nahwu-Sharaf praktis, audio pelafalan asli, dan bimbingan Ustadz AI interaktif.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('mufrodat')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02]"
              >
                <Volume2 className="w-4 h-4" />
                <span>Pelajari Kosakata Hari Ini</span>
              </button>

              <button
                onClick={() => onNavigate('hiwar')}
                className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition-all"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Tanya Ustadz AI</span>
              </button>

              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold text-xs sm:text-sm flex items-center gap-2 border border-amber-500/30 transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Buka Panel Guru</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Arabic Display card */}
          <div className="bg-slate-950/60 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-5 text-center shrink-0 w-full md:w-72 shadow-lg">
            <span className="text-[11px] font-semibold text-emerald-400 tracking-wider uppercase">
              Kata Mutiara Arab (مَحْفُوظَات)
            </span>
            <p className="font-arabic text-2xl font-bold text-white mt-3 leading-relaxed" dir="rtl">
              {currentQuote.arabic}
            </p>
            <p className="text-xs text-slate-300 mt-2 italic font-serif">"{currentQuote.translation}"</p>
            <button
              onClick={() => playArabicAudio(currentQuote.arabic)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Pengucapan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Quick Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Kosakata</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Volume2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-slate-900 dark:text-white">{totalMufrodat}</p>
            <p className="text-xs text-slate-500 mt-0.5">Tersedia dengan harakat & audio</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Sudah Dihafal</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-slate-900 dark:text-white">{masteredCount}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {totalMufrodat > 0 ? Math.round((masteredCount / totalMufrodat) * 100) : 0}% dari seluruh materi
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Materi Qawa'id</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-slate-900 dark:text-white">6 Modul</p>
            <p className="text-xs text-slate-500 mt-0.5">Nahwu, Sharaf, Dhomir & Kaidah</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Tutor Cerdas</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-slate-900 dark:text-white">Gemini 3.8</p>
            <p className="text-xs text-slate-500 mt-0.5">Tutor AI aktif 24 jam</p>
          </div>
        </div>
      </div>

      {/* Feature Modules Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <span>Modul Pembelajaran Utama</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
            6 Modul
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Module 1: Mufrodat */}
          <div
            onClick={() => onNavigate('mufrodat')}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 rounded-3xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
              Mufrodat & Audio Pelafalan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Pelajari kosakata tematik: angka, keluarga, sekolah, percakapan harian, makanan, kata kerja, dan
              dengarkan langsung audio bahasa Arab fushah.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Buka Kosakata</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 2: Qawa'id */}
          <div
            onClick={() => onNavigate('qawaid')}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 rounded-3xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors">
              Qawa'id (Nahwu & Sharaf)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Kaidah tata bahasa praktis: Isim, Fi'il, Huruf, Mudzakkar/Muannats, Isim Isyarah, Dhomir, Jumlah
              Ismiyyah/Fi'liyyah & Huruf Jar dengan contoh harakat.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400">
              <span>Pelajari Kaidah</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 3: Hiwar & Ustadz AI */}
          <div
            onClick={() => onNavigate('hiwar')}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 rounded-3xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
              Hiwar & Ustadz AI
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Latihan percakapan tematik dan konsultasi bebas bersama tutor cerdas Ustadz AI bertenaga Gemini
              3.8 Flash untuk tanya arti, bedah i'rob, dan latihan bicara.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Mulai Chat AI</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 4: Kuis */}
          <div
            onClick={() => onNavigate('kuis')}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 rounded-3xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
              Latihan Soal & Kuis Interaktif
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Uji pemahaman kosakata dan kaidah bahasa Arab dengan soal pilihan ganda, evaluasi langsung, serta
              generator soal otomatis berbobot tinggi.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <span>Uji Kemampuan</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 5: Flashcards */}
          <div
            onClick={() => onNavigate('flashcard')}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-500 rounded-3xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-950/70 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-violet-500 transition-colors">
              Flashcard Kartu Hafalan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Metode cepat menghafal mufrodat dengan kartu bolak-balik interaktif, pelafalan audio instan, dan
              fitur tandai kosakata yang perlu diulang.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400">
              <span>Buka Flashcard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 6: Panel Guru / Admin */}
          <div
            onClick={() => onNavigate(isAdmin ? 'admin' : 'mufrodat')}
            className={`group cursor-pointer bg-white dark:bg-slate-900 border ${
              isAdmin
                ? 'border-amber-400/50 hover:border-amber-400'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
            } rounded-3xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden`}
          >
            <div
              className={`w-12 h-12 rounded-2xl ${
                isAdmin
                  ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
              {isAdmin ? 'Panel Guru (rosithadmin)' : 'Kelola Materi & Pembelajaran'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              {isAdmin
                ? 'Tambah mufrodat baru, publikasikan pengumuman dan tugas santri, pantau rekap aktivitas pembelajaran.'
                : 'Dikelola oleh Ustadzah Rositha (rosithadmin). Masuk sebagai admin untuk menambah kosakata baru.'}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <span>{isAdmin ? 'Kelola Sekarang' : 'Informasi Pengajar'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Board */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Pengumuman & Instruksi Pengajar
            </h3>
          </div>
          {isAdmin && (
            <button
              onClick={() => onNavigate('admin')}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              + Buat Pengumuman Baru
            </button>
          )}
        </div>

        <div className="space-y-3">
          {announcements.length > 0 ? (
            announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      {ann.badge || 'Pemberitahuan'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{ann.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ann.content}</p>
                </div>
                <div className="text-left sm:text-right shrink-0 text-[11px] text-slate-400">
                  <p className="font-medium text-slate-500 dark:text-slate-300">{ann.author}</p>
                  <p>{ann.date}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 py-3 text-center">Belum ada pengumuman pengajar.</p>
          )}
        </div>
      </div>
    </div>
  );
};
