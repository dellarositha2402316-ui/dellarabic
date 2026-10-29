import React, { useState } from 'react';
import { MufrodatItem } from '../types';
import { playArabicAudio } from '../utils/audio';
import {
  Layers,
  RotateCw,
  Volume2,
  CheckCircle2,
  XCircle,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface FlashcardViewProps {
  mufrodatList: MufrodatItem[];
  masteredIds: Set<string>;
  onToggleMastered: (id: string) => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  mufrodatList,
  masteredIds,
  onToggleMastered,
}) => {
  const [cards, setCards] = useState<MufrodatItem[]>(mufrodatList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex] || cards[0];
  const isMastered = currentCard ? masteredIds.has(currentCard.id) : false;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  if (!currentCard) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-slate-500">Tidak ada kartu kosakata yang tersedia.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Metode Cepat Menghafal</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Flashcard Kosakata (بِطَاقَاتُ الحِفْظِ)
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Klik kartu untuk membalik melihat arti & contoh kalimat.
        </p>
      </div>

      {/* Progress & Counter */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-2">
        <span>
          Kartu {currentIndex + 1} dari {cards.length}
        </span>
        <button
          onClick={handleShuffle}
          className="flex items-center gap-1 hover:text-violet-500 transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Acak Kartu</span>
        </button>
      </div>

      {/* Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-80 sm:h-96 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-violet-500/60 transition-all cursor-pointer shadow-xl relative overflow-hidden flex flex-col justify-between p-8 select-none"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {currentCard.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Klik untuk balik</span>
          </div>
        </div>

        {/* Center Content */}
        {!isFlipped ? (
          // Front Side: Arabic
          <div className="text-center my-auto space-y-3">
            <p
              className="font-arabic text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white leading-relaxed tracking-wide"
              dir="rtl"
            >
              {currentCard.arabic}
            </p>
            <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">
              {currentCard.transliteration}
            </p>
          </div>
        ) : (
          // Back Side: Meaning & Examples
          <div className="text-center my-auto space-y-3">
            <span className="text-xs uppercase font-bold text-slate-400">Terjemahan</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {currentCard.meaning}
            </p>
            {currentCard.exampleArabic && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <p className="font-arabic text-lg font-bold text-slate-800 dark:text-slate-200" dir="rtl">
                  {currentCard.exampleArabic}
                </p>
                <p className="italic mt-0.5">"{currentCard.exampleMeaning}"</p>
              </div>
            )}
          </div>
        )}

        {/* Bottom Card Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playArabicAudio(currentCard.arabic);
            }}
            className="p-2.5 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-600 dark:text-violet-400 transition-colors"
            title="Dengarkan pengucapan Arab"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMastered(currentCard.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isMastered
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isMastered ? 'Sudah Dihafal' : 'Tandai Hafal'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handlePrev}
          className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-500 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
        >
          <span>Berikutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
