import { Announcement, MufrodatItem, SentenceAnalysis, QuizQuestion } from '../types';

export async function checkServerHealth(): Promise<{ status: string; geminiConfigured: boolean }> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend server not reachable yet or offline:', err);
    return { status: 'offline', geminiConfigured: false };
  }
}

export async function askUstadzAI(
  message: string,
  history: Array<{ role: 'user' | 'model'; text: string }> = []
): Promise<string> {
  try {
    const res = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });

    const data = await res.json();
    if (!res.ok) {
      if (data.reply) return data.reply;
      throw new Error(data.error || 'Gagal menghubungi Ustadz AI');
    }
    return data.reply;
  } catch (err: any) {
    console.error('Error asking Ustadz AI:', err);
    return (
      'Afwan, koneksi ke Ustadz AI mengalami kendala (' +
      (err.message || 'Server offline') +
      '). Anda tetap dapat mempelajari kaidah Nahwu, Sharaf, dan kosakata di modul pembelajaran lainnya.'
    );
  }
}

export async function explainArabicSentence(sentence: string): Promise<SentenceAnalysis> {
  try {
    const res = await fetch('/api/gemini/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sentence }),
    });

    const result = await res.json();
    if (!res.ok || !result.data) {
      throw new Error(result.error || 'Gagal membedah kalimat');
    }
    return result.data;
  } catch (err: any) {
    console.error('Error explaining sentence:', err);
    // Fallback analytical structure
    return {
      arabicWithHarakat: sentence,
      transliteration: 'Transliterasi otomatis lokal',
      translation: 'Kalimat bahasa Arab',
      sentenceType: 'Analisis offline',
      wordBreakdown: sentence.split(' ').map((w) => ({
        word: w,
        type: 'Isim / Fi\'il / Huruf',
        meaning: 'Kosakata',
        grammarRole: 'Komponen kalimat',
      })),
      studyNotes: 'Aktifkan GEMINI_API_KEY di server untuk bedah Nahwu & I\'rob otomatis tingkat lanjut.',
    };
  }
}

export async function generateDynamicQuiz(
  topic: string,
  level: string = 'Pemula'
): Promise<QuizQuestion[]> {
  try {
    const res = await fetch('/api/gemini/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, level }),
    });

    const result = await res.json();
    if (res.ok && Array.isArray(result.questions) && result.questions.length > 0) {
      return result.questions.map((q: any, idx: number) => ({
        id: `dyn-${Date.now()}-${idx}`,
        question: q.question,
        arabic: q.arabic,
        options: q.options || [],
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: q.explanation || 'Pembahasan dari Ustadz AI',
        category: topic,
      }));
    }
    throw new Error('No questions returned');
  } catch (err) {
    console.error('Dynamic quiz generation error:', err);
    return [];
  }
}

export async function fetchCustomMufrodat(): Promise<MufrodatItem[]> {
  try {
    const res = await fetch('/api/admin/custom-mufrodat');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.mufrodat || [];
  } catch {
    return [];
  }
}

export async function createCustomMufrodat(item: Partial<MufrodatItem>): Promise<MufrodatItem | null> {
  try {
    const res = await fetch('/api/admin/custom-mufrodat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    return data.item || null;
  } catch {
    return null;
  }
}

export async function deleteCustomMufrodat(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/admin/custom-mufrodat/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  try {
    const res = await fetch('/api/admin/announcements');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.announcements || [];
  } catch {
    return [
      {
        id: 'fallback-ann',
        title: 'Selamat Datang di Al-Arabiyyah!',
        content: 'Platform pembelajaran bahasa Arab terpadu dengan materi mufrodat, kaidah nahwu-sharaf, dan Ustadz AI.',
        author: 'rosithadmin',
        date: new Date().toISOString().split('T')[0],
        badge: 'Pengumuman',
      },
    ];
  }
}

export async function createAnnouncement(ann: Partial<Announcement>): Promise<Announcement | null> {
  try {
    const res = await fetch('/api/admin/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ann),
    });
    const data = await res.json();
    return data.announcement || null;
  } catch {
    return null;
  }
}

export async function deleteAnnouncement(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/admin/announcements/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch {
    return false;
  }
}
