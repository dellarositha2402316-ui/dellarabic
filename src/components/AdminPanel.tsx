import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MufrodatItem, Announcement } from '../types';
import { createCustomMufrodat, deleteCustomMufrodat, createAnnouncement, deleteAnnouncement } from '../services/api';
import {
  ShieldCheck,
  PlusCircle,
  Trash2,
  Bell,
  BookPlus,
  Users,
  CheckCircle,
  TrendingUp,
  Award,
} from 'lucide-react';

interface AdminPanelProps {
  customMufrodat: MufrodatItem[];
  announcements: Announcement[];
  onRefreshData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  customMufrodat,
  announcements,
  onRefreshData,
}) => {
  const { user } = useAuth();

  // Mufrodat form state
  const [arabic, setArabic] = useState('');
  const [transliteration, setTransliteration] = useState('');
  const [meaning, setMeaning] = useState('');
  const [category, setCategory] = useState('Pendidikan');
  const [exampleArabic, setExampleArabic] = useState('');
  const [exampleMeaning, setExampleMeaning] = useState('');
  const [mufrodatSubmitting, setMufrodatSubmitting] = useState(false);
  const [mufrodatSuccess, setMufrodatSuccess] = useState('');

  // Announcement form state
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annBadge, setAnnBadge] = useState('Pemberitahuan');
  const [annSubmitting, setAnnSubmitting] = useState(false);
  const [annSuccess, setAnnSuccess] = useState('');

  const handleAddMufrodat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!arabic.trim() || !meaning.trim()) return;

    setMufrodatSubmitting(true);
    setMufrodatSuccess('');

    try {
      const created = await createCustomMufrodat({
        arabic: arabic.trim(),
        transliteration: transliteration.trim(),
        meaning: meaning.trim(),
        category,
        exampleArabic: exampleArabic.trim(),
        exampleMeaning: exampleMeaning.trim(),
        createdBy: user?.username || 'rosithadmin',
      });

      if (created) {
        setMufrodatSuccess('Kosakata baru berhasil ditambahkan ke database pembelajaran!');
        setArabic('');
        setTransliteration('');
        setMeaning('');
        setExampleArabic('');
        setExampleMeaning('');
        onRefreshData();
      }
    } catch {
      setMufrodatSuccess('Gagal menyimpan kosakata.');
    } finally {
      setMufrodatSubmitting(false);
    }
  };

  const handleDeleteMufrodat = async (id: string) => {
    if (confirm('Hapus kosakata ini dari daftar materi?')) {
      await deleteCustomMufrodat(id);
      onRefreshData();
    }
  };

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    setAnnSubmitting(true);
    setAnnSuccess('');

    try {
      const created = await createAnnouncement({
        title: annTitle.trim(),
        content: annContent.trim(),
        badge: annBadge,
        author: `${user?.name || 'Rositha'} (Admin)`,
      });

      if (created) {
        setAnnSuccess('Pengumuman baru berhasil diterbitkan untuk seluruh santri!');
        setAnnTitle('');
        setAnnContent('');
        onRefreshData();
      }
    } catch {
      setAnnSuccess('Gagal menerbitkan pengumuman.');
    } finally {
      setAnnSubmitting(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (confirm('Hapus pengumuman ini?')) {
      await deleteAnnouncement(id);
      onRefreshData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Verification Header */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-900/40 border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 uppercase">
                Akses Administrator
              </span>
              <span className="text-xs text-amber-300 font-mono">rosithadmin</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              Panel Pengajar: Ustadzah Rositha
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Kelola kurikulum kosakata, tugas kelas santri, publikasikan pengumuman pekanan, dan pantau
              progres belajar kelas.
            </p>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 shrink-0 text-right">
          <p className="text-[11px] text-slate-400 font-medium">Status Akun:</p>
          <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 justify-end mt-0.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Aktif & Terverifikasi</span>
          </p>
        </div>
      </div>

      {/* Class Statistics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Santri Terdaftar</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">32 Santri</p>
          <p className="text-xs text-slate-500 mt-0.5">Kelas Bahasa Arab Dasar A & B</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Kosakata Tambahan Guru</span>
            <BookPlus className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {customMufrodat.length} Kosakata
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Diinput khusus oleh rosithadmin</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Rata-rata Nilai Kuis</span>
            <Award className="w-4 h-4 text-teal-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">87.5%</p>
          <p className="text-xs text-slate-500 mt-0.5">Tingkat kelulusan di atas target (Mumtaz)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form 1: Add Custom Mufrodat */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <BookPlus className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              Tambah Kosakata Baru (Mufrodat)
            </h2>
          </div>

          {mufrodatSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              {mufrodatSuccess}
            </div>
          )}

          <form onSubmit={handleAddMufrodat} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tulisan Arab (Wajib sertakan Harakat) *
              </label>
              <input
                type="text"
                value={arabic}
                onChange={(e) => setArabic(e.target.value)}
                placeholder="Contoh: حَاسُوبٌ"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-lg font-arabic text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                dir="rtl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Transliterasi Latin
                </label>
                <input
                  type="text"
                  value={transliteration}
                  onChange={(e) => setTransliteration(e.target.value)}
                  placeholder="Contoh: Hāsūbun"
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Sekolah">Sekolah</option>
                  <option value="Keluarga">Keluarga</option>
                  <option value="Kata Kerja">Kata Kerja</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Rumah">Rumah</option>
                  <option value="Motivasi">Motivasi</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Arti / Terjemahan Bahasa Indonesia *
              </label>
              <input
                type="text"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="Contoh: Komputer / Laptop"
                required
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Contoh Kalimat Arab (Opsional)
              </label>
              <input
                type="text"
                value={exampleArabic}
                onChange={(e) => setExampleArabic(e.target.value)}
                placeholder="Contoh: أَعْمَلُ بِالحَاسُوبِ"
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-arabic text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Arti Contoh Kalimat
              </label>
              <input
                type="text"
                value={exampleMeaning}
                onChange={(e) => setExampleMeaning(e.target.value)}
                placeholder="Contoh: Saya bekerja menggunakan komputer"
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={mufrodatSubmitting}
              className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{mufrodatSubmitting ? 'Menyimpan...' : 'Simpan Kosakata Baru'}</span>
            </button>
          </form>

          {/* List of Custom Mufrodat */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Daftar Kosakata Guru ({customMufrodat.length})
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {customMufrodat.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-arabic font-bold text-sm text-slate-900 dark:text-white ml-2" dir="rtl">
                      {item.arabic}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">({item.meaning})</span>
                  </div>
                  <button
                    onClick={() => handleDeleteMufrodat(item.id)}
                    className="text-rose-500 hover:text-rose-400 p-1"
                    title="Hapus kosakata"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form 2: Add Announcement */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <Bell className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              Publikasi Pengumuman & Tugas Kelas
            </h2>
          </div>

          {annSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              {annSuccess}
            </div>
          )}

          <form onSubmit={handleAddAnnouncement} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Judul Pengumuman / Instruksi *
              </label>
              <input
                type="text"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="Contoh: Tugas Hafalan Kosakata Pekan ke-2"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Kategori Label
              </label>
              <select
                value={annBadge}
                onChange={(e) => setAnnBadge(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Pemberitahuan">Pemberitahuan</option>
                <option value="Tugas">Tugas Santri</option>
                <option value="Jadwal">Jadwal Kelas</option>
                <option value="Evaluasi">Evaluasi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Isi Pengumuman *
              </label>
              <textarea
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                rows={3}
                placeholder="Tuliskan instruksi belajar atau pesan motivasi untuk santri..."
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={annSubmitting}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Bell className="w-4 h-4" />
              <span>{annSubmitting ? 'Menerbitkan...' : 'Terbitkan Pengumuman'}</span>
            </button>
          </form>

          {/* List of Announcements */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Pengumuman Aktif ({announcements.length})
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {announcements.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-2 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{item.title}</span>
                    <p className="text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{item.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAnnouncement(item.id)}
                    className="text-rose-500 hover:text-rose-400 p-1 shrink-0"
                    title="Hapus pengumuman"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
