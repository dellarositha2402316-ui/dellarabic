import React, { useState } from 'react';
import { INITIAL_QUIZ } from '../data/arabicData';
import { QuizQuestion } from '../types';
import { playArabicAudio } from '../utils/audio';
import { generateDynamicQuiz } from '../services/api';
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  Sparkles,
  RotateCcw,
  Volume2,
  Award,
  ArrowRight,
  Loader2,
  Check,
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(INITIAL_QUIZ);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic generator state
  const [dynamicTopic, setDynamicTopic] = useState('Kosakata Makanan & Minuman');
  const [isGenerating, setIsGenerating] = useState(false);
  const [dynamicMsg, setDynamicMsg] = useState('');

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct += 1;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100),
    };
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
  };

  const handleGenerateAIQuiz = async () => {
    if (!dynamicTopic.trim() || isGenerating) return;
    setIsGenerating(true);
    setDynamicMsg('');

    try {
      const newQuestions = await generateDynamicQuiz(dynamicTopic.trim(), 'Pemula');
      if (newQuestions && newQuestions.length > 0) {
        setQuestions(newQuestions);
        setSelectedAnswers({});
        setIsSubmitted(false);
        setCurrentIndex(0);
        setDynamicMsg(`Berhasil membuat ${newQuestions.length} soal kuis bertema "${dynamicTopic}"!`);
      } else {
        setDynamicMsg('Gagal menghasilkan soal kuis baru. Pastikan koneksi atau kuota API aktif.');
      }
    } catch {
      setDynamicMsg('Terjadi kendala saat memproses kuis.');
    } finally {
      setIsGenerating(false);
    }
  };

  const scoreData = calculateScore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <HelpCircle className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Latihan Soal & Kuis Evaluasi (الاِخْتِبَارَاتُ)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Uji pemahaman kosakata, harakat, dan kaidah nahwu dengan soal interaktif dan pembahasan lengkap.
        </p>
      </div>

      {/* Generator Tool Bar */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-800/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-emerald-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Generator Kuis Cerdas (Bertenaga Gemini AI)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Buat paket soal kuis baru secara otomatis dengan topik pilihan Anda.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={dynamicTopic}
              onChange={(e) => setDynamicTopic(e.target.value)}
              placeholder="Topik kuis (misal: Kata Kerja, Dhomir)..."
              className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-48 sm:w-60"
            />
            <button
              onClick={handleGenerateAIQuiz}
              disabled={isGenerating}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shrink-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Membuat...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Buat Kuis AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {dynamicMsg && (
          <p className="text-xs text-emerald-400 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/40">
            {dynamicMsg}
          </p>
        )}
      </div>

      {/* Score Modal / Result Summary (When Submitted) */}
      {isSubmitted && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Hasil Kuis Selesai!
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              Skor: {scoreData.percentage}%
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Anda menjawab benar {scoreData.correct} dari {scoreData.total} soal.
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={handleResetQuiz}
              className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Question Card */}
      {currentQ && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Question Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Soal {currentIndex + 1} dari {totalQuestions}
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {currentQ.category || 'Bahasa Arab'}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {currentQ.question}
            </p>

            {currentQ.arabic && (
              <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between">
                <p
                  className="font-arabic text-3xl font-bold text-slate-900 dark:text-white flex-1 text-right"
                  dir="rtl"
                >
                  {currentQ.arabic}
                </p>
                <button
                  type="button"
                  onClick={() => playArabicAudio(currentQ.arabic || '')}
                  className="p-2 text-emerald-600 hover:text-emerald-500 transition-colors ml-4"
                  title="Dengarkan pengucapan"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              const isCorrectAnswer = isSubmitted && optIdx === currentQ.correctIndex;
              const isWrongSelected = isSubmitted && isSelected && optIdx !== currentQ.correctIndex;

              let style = 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50';

              if (isSelected && !isSubmitted) {
                style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
              } else if (isCorrectAnswer) {
                style = 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
              } else if (isWrongSelected) {
                style = 'bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300 font-bold';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  {isCorrectAnswer && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                  {isWrongSelected && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation (When Submitted) */}
          {isSubmitted && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 space-y-1">
              <strong className="block font-bold text-amber-600 dark:text-amber-400">Pembahasan:</strong>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Navigation & Submit Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Sebelumnya
            </button>

            <div className="flex gap-2">
              {!isSubmitted && (
                <button
                  type="button"
                  onClick={() => setIsSubmitted(true)}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Selesai & Kumpulkan
                </button>
              )}

              {currentIndex < totalQuestions - 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-sm"
                >
                  <span>Berikutnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
