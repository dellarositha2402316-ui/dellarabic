import React, { useState } from 'react';
import { MufrodatItem } from '../types';
import { playArabicAudio } from '../utils/audio';
import {
  Search,
  Volume2,
  CheckCircle2,
  Circle,
  Sparkles,
  BookMarked,
  Tag,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface MufrodatViewProps {
  mufrodatList: MufrodatItem[];
  masteredIds: Set<string>;
  onToggleMastered: (id: string) => void;
}

export const MufrodatView: React.FC<MufrodatViewProps> = ({
  mufrodatList,
  masteredIds,
  onToggleMastered,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Extract unique categories
  const categories = [
    'Semua',
    'Angka',
    'Keluarga',
    'Sekolah',
    'Sapaan',
    'Kata Kerja',
    'Makanan',
    'Rumah',
  ];

  const filteredItems = mufrodatList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Semua' ||
      item.category.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === 'Kustom' && item.isCustom);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.arabic.includes(q) ||
      item.transliteration.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <BookMarked className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Kamus Mufrodat Tematik (المُفْرَدَاتُ)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Kosakata bahasa Arab Fushah dengan harakat lengkap, transliterasi Latin, audio pelafalan asli, dan
            contoh kalimat aplikatif.
          </p>
        </div>

        {/* Counter Chip */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>
            Dihafal: <strong className="text-emerald-600 dark:text-emerald-400">{masteredIds.size}</strong> /{' '}
            {mufrodatList.length} kata
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kosakata (Arab, Latin, arti Indonesia)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white placeholder-slate-400 shadow-sm"
          />
        </div>

        {/* Categories scrollable pill list */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mufrodat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isMastered = masteredIds.has(item.id);
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-3xl p-5 border transition-all duration-200 bg-white dark:bg-slate-900 ${
                isMastered
                  ? 'border-emerald-500/40 shadow-sm bg-emerald-50/20 dark:bg-emerald-950/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Category & Badge */}
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5" />
                  <span>{item.category}</span>
                  {item.isCustom && (
                    <span className="text-amber-500 font-bold ml-1">• Guru</span>
                  )}
                </span>

                {/* Mark as mastered button */}
                <button
                  type="button"
                  onClick={() => onToggleMastered(item.id)}
                  className={`p-1.5 rounded-xl transition-all ${
                    isMastered
                      ? 'text-emerald-500 bg-emerald-500/10'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800'
                  }`}
                  title={isMastered ? 'Sudah Dihafal' : 'Tandai Hafal'}
                >
                  {isMastered ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>
              </div>

              {/* Main Arabic Text */}
              <div className="my-4 text-center">
                <p
                  className="font-arabic text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-relaxed tracking-wide select-all"
                  dir="rtl"
                >
                  {item.arabic}
                </p>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                  {item.transliteration}
                </p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{item.meaning}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
                {/* Audio Button */}
                <button
                  type="button"
                  onClick={() => playArabicAudio(item.audioText || item.arabic)}
                  className="py-1.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan</span>
                </button>

                {/* Expand Example */}
                {item.exampleArabic && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium flex items-center gap-1"
                  >
                    <span>Contoh Kalimat</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>

              {/* Expandable Example Section */}
              {isExpanded && item.exampleArabic && (
                <div className="mt-3 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Contoh Penggunaan
                    </span>
                    <button
                      onClick={() => playArabicAudio(item.exampleArabic || '')}
                      className="text-emerald-500 hover:text-emerald-400 p-1"
                      title="Dengarkan contoh"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-arabic text-lg font-bold text-slate-800 dark:text-slate-100 text-right" dir="rtl">
                    {item.exampleArabic}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                    "{item.exampleMeaning}"
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <BookMarked className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Tidak ada kosakata yang cocok</h3>
          <p className="text-xs text-slate-500 mt-1">Coba kata kunci pencarian lain atau pilih kategori Semua.</p>
        </div>
      )}
    </div>
  );
};
