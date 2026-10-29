export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  role: UserRole;
  avatarUrl?: string;
  provider: 'google' | 'credentials';
  createdAt: string;
}

export interface MufrodatItem {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  category: string;
  exampleArabic?: string;
  exampleMeaning?: string;
  audioText?: string;
  level?: 'Dasar' | 'Menengah' | 'Lanjutan';
  isCustom?: boolean;
  createdBy?: string;
  createdAt?: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  arabicTitle: string;
  category: 'Nahwu' | 'Sharaf' | 'Kaidah';
  summary: string;
  explanation: string[];
  examples: Array<{
    arabic: string;
    transliteration: string;
    translation: string;
    note?: string;
  }>;
  keyRule: string;
}

export interface HiwarDialogue {
  id: string;
  title: string;
  arabicTitle: string;
  theme: string;
  exchanges: Array<{
    speaker: string;
    arabic: string;
    transliteration: string;
    translation: string;
  }>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  arabic?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  badge?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface SentenceAnalysis {
  arabicWithHarakat: string;
  transliteration: string;
  translation: string;
  sentenceType: string;
  wordBreakdown: Array<{
    word: string;
    type: string;
    meaning: string;
    grammarRole: string;
  }>;
  studyNotes: string;
}
