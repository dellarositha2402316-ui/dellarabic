import React, { useState } from 'react';
import { GRAMMAR_LESSONS } from '../data/arabicData';
import { GrammarLesson } from '../types';
import { playArabicAudio } from '../utils/audio';
import {
  BookOpen,
  Volume2,
  CheckCircle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  BookmarkCheck,
} from 'lucide-react';

export const QawaidView: React.FC = () => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(GRAMMAR_LESSONS[0].id);

  const currentLesson: GrammarLesson =
    GRAMMAR_LESSONS.find((l) => l.id === selectedLessonId) || GRAMMAR_LESSONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <BookOpen className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Qawa'id: Nahwu & Sharaf Ringkas (قَوَاعِدُ اللُّغَةِ)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Kaidah tata bahasa Arab dasar dengan penjelasan terstruktur, rumus praktis, dan contoh kalimat berharakat
          lengkap.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Lesson Navigator */}
        <div className="lg:col-span-4 space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            Daftar Modul Kaidah
          </h2>

          <div className="space-y-2">
            {GRAMMAR_LESSONS.map((lesson, idx) => {
              const isSelected = lesson.id === selectedLessonId;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-950/20'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-teal-500/50'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                      isSelected
                        ? 'bg-teal-700/80 text-teal-100'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold truncate">{lesson.title}</p>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                          isSelected
                            ? 'bg-teal-500/30 text-teal-100'
                            : 'bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400'
                        }`}
                      >
                        {lesson.category}
                      </span>
                    </div>
                    <p
                      className={`font-arabic text-sm mt-1 truncate ${
                        isSelected ? 'text-teal-100' : 'text-slate-400'
                      }`}
                      dir="rtl"
                    >
                      {lesson.arabicTitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Lesson Card */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header of lesson */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400">
                Kaidah {currentLesson.category}
              </span>
              <p className="font-arabic text-2xl font-bold text-teal-600 dark:text-teal-400" dir="rtl">
                {currentLesson.arabicTitle}
              </p>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
              {currentLesson.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {currentLesson.summary}
            </p>
          </div>

          {/* Explanation Points */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Penjelasan Kaidah</span>
            </h3>

            <div className="space-y-2.5">
              {currentLesson.explanation.map((para, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                >
                  {para}
                </div>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-500" />
              <span>Contoh Penerapan & Harakat</span>
            </h3>

            <div className="space-y-3">
              {currentLesson.examples.map((ex, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-teal-50/40 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <p
                      className="font-arabic text-2xl font-bold text-slate-900 dark:text-white leading-relaxed"
                      dir="rtl"
                    >
                      {ex.arabic}
                    </p>
                    <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                      {ex.transliteration}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                      "{ex.translation}"
                    </p>
                    {ex.note && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                        Catatan: {ex.note}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => playArabicAudio(ex.arabic)}
                    className="self-start sm:self-auto py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengarkan</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Key Rule Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 flex items-start gap-3">
            <BookmarkCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                Kaidah Emas (قَاعِدَةٌ ذَهَبِيَّةٌ):
              </p>
              <p className="text-xs sm:text-sm font-medium mt-1 leading-relaxed">
                {currentLesson.keyRule}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
