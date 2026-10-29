import React, { useState, useRef, useEffect } from 'react';
import { HIWAR_DIALOGUES } from '../data/arabicData';
import { HiwarDialogue, ChatMessage, SentenceAnalysis } from '../types';
import { playArabicAudio } from '../utils/audio';
import { askUstadzAI, explainArabicSentence } from '../services/api';
import {
  MessageSquare,
  Sparkles,
  Volume2,
  Send,
  User,
  Bot,
  Search,
  BookOpen,
  ArrowRight,
  Loader2,
  RefreshCw,
  Compass,
} from 'lucide-react';

export const HiwarView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai_tutor' | 'dialogue' | 'analyzer'>('ai_tutor');

  // Dialogue state
  const [selectedDialogue, setSelectedDialogue] = useState<HiwarDialogue>(HIWAR_DIALOGUES[0]);

  // AI Tutor chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'model',
      text: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ! Selamat datang! Saya adalah Ustadz AI pembimbing bahasa Arab Anda. Anda dapat bertanya tentang arti kosakata, kaidah Nahwu/Sharaf, minta koreksi kalimat Arab, atau latihan percakapan. Apa yang ingin Anda pelajari hari ini?',
      timestamp: 'Baru saja',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Analyzer state
  const [analyzeInput, setAnalyzeInput] = useState('قَرَأَ التِّلْمِيذُ الكِتَابَ فِي المَدْرَسَةِ');
  const [analysisResult, setAnalysisResult] = useState<SentenceAnalysis | null>(null);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || chatInput).trim();
    if (!text || chatLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    try {
      const history = chatMessages.map((m) => ({ role: m.role, text: m.text }));
      const reply = await askUstadzAI(text, history);

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'model',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, botMsg]);
    } catch {
      const botErr: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'model',
        text: 'Afwan, terjadi gangguan koneksi ke server Ustadz AI. Silakan coba lagi.',
        timestamp: 'Error',
      };
      setChatMessages((prev) => [...prev, botErr]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleAnalyzeSentence = async () => {
    if (!analyzeInput.trim() || analyzeLoading) return;
    setAnalyzeLoading(true);
    try {
      const result = await explainArabicSentence(analyzeInput.trim());
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzeLoading(false);
    }
  };

  const promptSuggestions = [
    'Bagaimana cara menyapa teman di pagi hari dalam bahasa Arab fushah?',
    'Tolong koreksi kalimat ini: "هَذَا مَدْرَسَةٌ كَبِيرٌ"',
    'Apa perbedaan mendasar antara Jumlah Ismiyyah dan Jumlah Fi\'liyyah?',
    'Berikan 5 mufrodat penting terkait perlengkapan sekolah beserta contohnya',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Hiwar & Ustadz AI (الحِوَارُ وَالمُعَلِّمُ الذَّكِيُّ)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Latihan percakapan tematik, konsultasi interaktif dengan Ustadz AI (Gemini 3.8 Flash), dan alat bedah
          struktur kalimat nahwu/sharaf otomatis.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl max-w-lg border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('ai_tutor')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'ai_tutor'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tutor Ustadz AI</span>
        </button>

        <button
          onClick={() => setActiveTab('dialogue')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'dialogue'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Hiwar Tematik</span>
        </button>

        <button
          onClick={() => setActiveTab('analyzer')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'analyzer'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Bedah Kalimat</span>
        </button>
      </div>

      {/* Tab 1: AI Tutor Chat */}
      {activeTab === 'ai_tutor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chat Window */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col h-[600px] shadow-sm overflow-hidden">
            {/* Chat Header */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-950/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Ustadz Mansur (Mudarris AI)</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Bertenaga Gemini 3.8 Flash • Ahli Bahasa Arab & Fushah
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setChatMessages([
                    {
                      id: 'res-' + Date.now(),
                      role: 'model',
                      text: 'Percakapan direset. Silakan tanyakan materi bahasa Arab atau mufrodat yang ingin Anda diskusikan!',
                      timestamp: 'Baru saja',
                    },
                  ])
                }
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800"
                title="Bersihkan riwayat chat"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Chat</span>
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isUser
                          ? 'bg-emerald-600 text-white'
                          : 'bg-teal-700 text-white'
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-3xl p-4 text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-emerald-600 text-white rounded-tr-none'
                          : 'bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-tl-none'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      <div
                        className={`mt-2 flex items-center justify-between text-[10px] ${
                          isUser ? 'text-emerald-100' : 'text-slate-400'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {!isUser && (
                          <button
                            type="button"
                            onClick={() => playArabicAudio(msg.text)}
                            className="hover:text-emerald-500 flex items-center gap-1 transition-colors"
                            title="Dengarkan teks Arab dalam jawaban"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Audio</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {chatLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-400 italic py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                  <span>Ustadz AI sedang menyusun penjelasan berharakat...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Tulis pertanyaan bahasa Arab (misal: apa arti مَكْتَبَةٌ dan bagaimana contoh kalimatnya?)..."
                  className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-900 dark:text-white"
                  disabled={chatLoading}
                />
                <button
                  type="submit"
                  disabled={chatLoading || !chatInput.trim()}
                  className="p-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-2xl shadow-md transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Prompt Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-500" />
                <span>Ide Pertanyaan Populer</span>
              </h3>
              <div className="space-y-2">
                {promptSuggestions.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    className="w-full text-left p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 text-xs text-slate-700 dark:text-slate-300 transition-all flex items-start gap-2 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-3xl p-5 text-xs text-emerald-300 space-y-2">
              <p className="font-bold text-emerald-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Tips Belajar dengan Ustadz AI</span>
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>Ustadz AI selalu menyertakan harakat lengkap untuk mempermudah bacaan.</li>
                <li>Anda dapat mengetik huruf Arab atau bahasa Indonesia.</li>
                <li>Gunakan tombol speaker 🔊 untuk melatih makhraj dan intonasi lisan.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Hiwar Tematik (Curated Dialogues) */}
      {activeTab === 'dialogue' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Dialogue Selectors */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Pilih Percakapan Tematik
            </h3>
            {HIWAR_DIALOGUES.map((dialogue) => {
              const isSelected = dialogue.id === selectedDialogue.id;
              return (
                <button
                  key={dialogue.id}
                  onClick={() => setSelectedDialogue(dialogue)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/20'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
                  }`}
                >
                  <p className="text-xs font-bold">{dialogue.title}</p>
                  <p
                    className={`font-arabic text-sm mt-1 ${
                      isSelected ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                    dir="rtl"
                  >
                    {dialogue.arabicTitle}
                  </p>
                  <p
                    className={`text-[11px] mt-2 line-clamp-1 ${
                      isSelected ? 'text-emerald-100' : 'text-slate-500'
                    }`}
                  >
                    {dialogue.theme}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Dialogue Lines Display */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Hiwar Praktek
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {selectedDialogue.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{selectedDialogue.theme}</p>
            </div>

            <div className="space-y-4">
              {selectedDialogue.exchanges.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border ${
                      isEven
                        ? 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {item.speaker}:
                      </span>
                      <button
                        type="button"
                        onClick={() => playArabicAudio(item.arabic)}
                        className="py-1 px-2.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Dengarkan</span>
                      </button>
                    </div>

                    <p
                      className="font-arabic text-2xl font-bold text-slate-900 dark:text-white text-right leading-relaxed"
                      dir="rtl"
                    >
                      {item.arabic}
                    </p>
                    <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-1">
                      {item.transliteration}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 italic">
                      "{item.translation}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Bedah Kalimat (Sentence Grammar Analyzer) */}
      {activeTab === 'analyzer' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Bedah Nahwu & Sharaf Otomatis (إِعْرَابُ الجُمَلِ)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Ketikkan kalimat bahasa Arab berharakat atau tanpa harakat untuk menganalisis pembagian kata (Isim,
              Fi'il, Huruf) serta kedudukan tata bahasanya.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={analyzeInput}
              onChange={(e) => setAnalyzeInput(e.target.value)}
              placeholder="Contoh: ذَهَبَ أَحْمَدُ إِلَى المَسْجِدِ"
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-arabic text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              dir="rtl"
            />
            <button
              onClick={handleAnalyzeSentence}
              disabled={analyzeLoading || !analyzeInput.trim()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
            >
              {analyzeLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Membedah...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Bedah Kalimat</span>
                </>
              )}
            </button>
          </div>

          {analysisResult && (
            <div className="mt-6 space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              {/* Highlight summary card */}
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="font-arabic text-3xl font-bold text-slate-900 dark:text-white" dir="rtl">
                    {analysisResult.arabicWithHarakat}
                  </p>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    {analysisResult.transliteration}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                    "{analysisResult.translation}"
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => playArabicAudio(analysisResult.arabicWithHarakat)}
                  className="py-2 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 self-start md:self-auto shrink-0 shadow-sm"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Dengarkan</span>
                </button>
              </div>

              {/* Word breakdown table */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Rincian Kata & Kedudukan Nahwu
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <thead className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 uppercase font-semibold text-[11px]">
                      <tr>
                        <th className="p-3">Kata (اللَّفْظُ)</th>
                        <th className="p-3">Jenis Kata</th>
                        <th className="p-3">Arti Kata</th>
                        <th className="p-3">Kedudukan / I'rob</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                      {analysisResult.wordBreakdown.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-arabic text-xl font-bold text-slate-900 dark:text-white" dir="rtl">
                            {row.word}
                          </td>
                          <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">
                            {row.type}
                          </td>
                          <td className="p-3 text-slate-700 dark:text-slate-300">{row.meaning}</td>
                          <td className="p-3 font-medium text-slate-800 dark:text-slate-200">
                            {row.grammarRole}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Study Notes */}
              {analysisResult.studyNotes && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">
                    Catatan Pembelajaran:
                  </strong>
                  {analysisResult.studyNotes}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
