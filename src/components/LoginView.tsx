import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, UserCheck, BookOpen, Sparkles, CheckCircle2, Lock, ArrowRight, KeyRound } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { loginWithAdminCredentials, loginWithGoogle, loginAsStudentDemo } = useAuth();

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');

  // Admin form state
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  // Custom student state
  const [studentName, setStudentName] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setAdminLoading(true);

    try {
      const res = await loginWithAdminCredentials(adminUsername, adminPassword);
      if (!res.success) {
        setAdminError(res.error || 'Login gagal.');
      }
    } catch {
      setAdminError('Terjadi kesalahan saat memproses login.');
    } finally {
      setAdminLoading(false);
    }
  };

  const handleFillAdminCredentials = () => {
    setAdminUsername('rosithadmin');
    setAdminPassword('64rositha');
    setAdminError('');
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleStudentFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsStudentDemo(studentName.trim() || 'Ahmad Fauzan (Santri)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Islamic geometric background glows */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* App Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-xl shadow-emerald-900/40 border border-emerald-300/30 mb-4 transform hover:scale-105 transition-all">
            <span className="font-arabic text-3xl font-bold text-white drop-shadow">عَرَبِيّ</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            <span>Al-Arabiyyah</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Interaktif
            </span>
          </h1>

          <p className="font-arabic text-lg text-emerald-200 mt-2 font-medium" dir="rtl">
            بَوَّابَةُ تَعَلُّمِ اللُّغَةِ العَرَبِيَّةِ المُمْتِعَةِ
          </p>

          <p className="text-slate-400 text-xs mt-1">
            Silakan masuk untuk mengakses materi kosakata, nahwu, audio pelafalan, kuis & Ustadz AI.
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60">
          {/* Tab Selector */}
          <div className="flex bg-slate-950/70 p-1.5 rounded-2xl border border-slate-800/80 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'student'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Login Siswa</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Login Admin</span>
            </button>
          </div>

          {/* Student Tab Content */}
          {activeTab === 'student' && (
            <div className="space-y-5">
              {/* Google Sign-in Button */}
              <div>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                  className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-800 rounded-2xl font-semibold text-sm flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg active:scale-[0.98] border border-slate-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{googleLoading ? 'Menghubungkan...' : 'Masuk dengan Google (Firebase)'}</span>
                </button>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-3 text-slate-500 text-xs uppercase font-medium">
                  atau masuk langsung
                </span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              {/* Student custom name form */}
              <form onSubmit={handleStudentFormSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Nama Santri / Siswa (Opsional)
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Contoh: Muhammad Yusuf"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/30"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Mulai Belajar Sekarang</span>
                </button>
              </form>

              {/* Quick demo student login */}
              <div className="pt-2 border-t border-slate-800/80 text-center">
                <button
                  type="button"
                  onClick={() => loginAsStudentDemo('Ahmad Fauzan (Santri Teladan)')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-medium hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Masuk Cepat sebagai Santri Contoh</span>
                </button>
              </div>
            </div>
          )}

          {/* Admin Tab Content */}
          {activeTab === 'admin' && (
            <div className="space-y-4">
              <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-3 text-xs text-emerald-300 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-emerald-200">Kredensial Khusus Pengajar / Admin:</p>
                  <p className="text-slate-300 mt-0.5 font-mono text-[11px]">
                    Username: <span className="text-white font-bold">rosithadmin</span> | Password:{' '}
                    <span className="text-white font-bold">64rositha</span>
                  </p>
                </div>
              </div>

              {adminError && (
                <div className="bg-rose-950/40 border border-rose-800/50 rounded-xl p-3 text-xs text-rose-300">
                  {adminError}
                </div>
              )}

              <form onSubmit={handleAdminSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Username Admin</label>
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="rosithadmin"
                    required
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Password Admin</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono transition-all"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleFillAdminCredentials}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all"
                    title="Isi otomatis username dan password admin yang telah ditentukan"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    <span>Auto-Fill Admin</span>
                  </button>

                  <button
                    type="submit"
                    disabled={adminLoading}
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/30"
                  >
                    <span>{adminLoading ? 'Memeriksa...' : 'Masuk sebagai Admin'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Feature Highlights Footer */}
          <div className="mt-8 pt-5 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Audio Mufrodat Fushah</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Tutor Cerdas Gemini AI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Nahwu & Sharaf Ringkas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Kuis & Panel Kelola Guru</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-slate-500 text-xs mt-6">
          Al-Arabiyyah Platform © 2026 • Dirancang untuk santri, pelajar & pengajar bahasa Arab.
        </p>
      </div>
    </div>
  );
};
