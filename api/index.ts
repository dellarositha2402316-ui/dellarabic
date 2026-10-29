import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Google GenAI client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory data store for custom mufrodat and announcements (shared during server lifecycle)
let serverCustomMufrodat = [
  {
    id: 'custom-1',
    arabic: 'جَامِعَةٌ',
    transliteration: 'Jāmi\'ah',
    meaning: 'Universitas / Perguruan Tinggi',
    category: 'Pendidikan',
    exampleArabic: 'أَنَا أَدْرُسُ فِي الجَامِعَةِ',
    exampleMeaning: 'Saya belajar di universitas',
    createdBy: 'rosithadmin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'custom-2',
    arabic: 'مُسْتَقْبَلٌ مُشْرِقٌ',
    transliteration: 'Mustaqbalun Musyriq',
    meaning: 'Masa depan yang cerah',
    category: 'Motivasi',
    exampleArabic: 'نَبْنِي مُسْتَقْبَلًا مُشْرِقًا بِالعِلْمِ',
    exampleMeaning: 'Kita membangun masa depan cerah dengan ilmu',
    createdBy: 'rosithadmin',
    createdAt: new Date().toISOString(),
  }
];

let serverAnnouncements = [
  {
    id: 'ann-1',
    title: 'Selamat Datang di Portal Bahasa Arab Al-Arabiyyah!',
    content: 'Silakan pelajari materi Huruf Hijaiyah, Mufrodat harian, dan manfaatkan fitur Ustadz AI untuk melatih percakapan fushah.',
    author: 'rosithadmin (Admin Pembelajaran)',
    date: '2026-10-29',
    badge: 'Pemberitahuan',
  },
  {
    id: 'ann-2',
    title: 'Kuis Evaluasi Pekanan Telah Dibuka',
    content: 'Santri dan siswa dapat mengerjakan kuis interaktif di tab Latihan Soal untuk menguji pemahaman kosakata dan kaidah Nahwu.',
    author: 'rosithadmin',
    date: '2026-10-29',
    badge: 'Tugas',
  }
];

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Al-Arabiyyah Arabic Learning API',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// AI Arabic Tutor Chat endpoint
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Pesan (message) wajib diisi.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY belum dikonfigurasi di server environment.',
        reply: 'Afwan, layanan AI Ustadz sedang offline karena kunci API belum diset. Namun Anda tetap dapat menggunakan seluruh materi mufrodat, nahwu, audio, dan kuis lokal!',
      });
    }

    const systemInstruction = `
Kamu adalah "Ustadz Mansur / Mudarris AI", seorang guru dan pembimbing bahasa Arab yang sangat ramah, sabar, berwawasan luas, dan fasih dalam bahasa Arab Fushah (Modern Standard Arabic) serta bahasa Indonesia.
Tugas utamamu adalah:
1. Membantu murid belajar bahasa Arab dari tingkat pemula hingga mahir.
2. Setiap kali menuliskan teks bahasa Arab, SELALU sertakan HARAKAT LENGKAP (Fathah, Kasrah, Dhommah, Sukun, Tasydid) agar mudah dibaca pemula.
3. Selalu berikan terjemahan bahasa Indonesia dan transliterasi latin jika mengenalkan kosakata atau ungkapan baru.
4. Jika murid bertanya tentang tata bahasa (Nahwu / Sharaf), jelaskan dengan analogi sederhana yang mudah dipahami, sertakan contoh aplikatif.
5. Jika murid mengajak percakapan bahasa Arab (Hiwar), jawablah dalam bahasa Arab berharakat, lalu berikan terjemahan dan koreksi yang mendidik jika ada kesalahan struktur/harakat dari murid.
6. Berikan apresiasi dan motivasi islami (seperti: "Mumtāz! أَحْسَنْتَ", "Bārakallāhu fīk", "Terus semangat thalabul 'ilmi!").
Jawab dengan format rapi dan terstruktur menggunakan Markdown.
    `.trim();

    // Prepare contents with history if provided
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        if (item.role === 'user' || item.role === 'model') {
          contents.push({
            role: item.role,
            parts: [{ text: String(item.text) }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Maaf, tidak dapat menghasilkan jawaban saat ini.';
    return res.json({ reply });
  } catch (err: any) {
    console.error('Error in /api/gemini/chat:', err);
    return res.status(500).json({
      error: 'Terjadi kendala saat menghubungi AI tutor.',
      details: err?.message || String(err),
    });
  }
});

// Explain Arabic sentence / phrase (Nahwu, Sharaf & Vocabulary breakdown)
app.post('/api/gemini/explain', async (req: Request, res: Response) => {
  try {
    const { sentence } = req.body;
    if (!sentence || typeof sentence !== 'string') {
      return res.status(400).json({ error: 'Kalimat bahasa Arab wajib diisi.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY belum dikonfigurasi.',
      });
    }

    const prompt = `
Bedahlah kalimat bahasa Arab berikut ini secara mendalam untuk pembelajaran siswa:
Kalimat: "${sentence}"

Berikan analisis terstruktur dalam format JSON dengan skema persis:
{
  "arabicWithHarakat": "Kalimat dengan harakat lengkap",
  "transliteration": "Transliterasi Latin",
  "translation": "Terjemahan Bahasa Indonesia",
  "sentenceType": "Jumlah Ismiyyah atau Jumlah Fi'liyyah beserta penjelasannya",
  "wordBreakdown": [
    {
      "word": "kata berharakat",
      "type": "Isim / Fi'il / Huruf",
      "meaning": "arti kata",
      "grammarRole": "peran tata bahasa (misal: Mubtada', Khobar, Fa'il, Maf'ul bih, Jar-Majrur)"
    }
  ],
  "studyNotes": "Catatan kaidah penting yang bisa dipelajari dari kalimat ini"
}
Kembalikan HANYA JSON murni tanpa markdown triple backticks.
    `.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    let data;
    try {
      data = JSON.parse(response.text?.trim() || '{}');
    } catch {
      data = { rawText: response.text };
    }

    return res.json({ success: true, data });
  } catch (err: any) {
    console.error('Error in /api/gemini/explain:', err);
    return res.status(500).json({
      error: 'Gagal membedah kalimat Arab.',
      details: err?.message || String(err),
    });
  }
});

// Generate dynamic Arabic quiz via Gemini
app.post('/api/gemini/quiz', async (req: Request, res: Response) => {
  try {
    const { topic = 'Mufrodat Sehari-hari', level = 'Pemula' } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY belum dikonfigurasi.',
      });
    }

    const prompt = `
Buatkan 4 soal kuis pilihan ganda pembelajaran Bahasa Arab bertema: "${topic}" untuk tingkat: "${level}".
Setiap soal harus memiliki:
- Teks soal (pertanyaan dalam bahasa Indonesia atau kalimat Arab berharakat)
- 4 pilihan jawaban (A, B, C, D)
- Indeks jawaban benar (0, 1, 2, atau 3)
- Penjelasan singkat edukatif mengapa jawaban tersebut benar

Kembalikan format JSON murni:
{
  "topic": "${topic}",
  "questions": [
    {
      "question": "Apa arti dari مَدْرَسَةٌ ?",
      "arabic": "مَدْرَسَةٌ",
      "options": ["Rumah", "Sekolah", "Masjid", "Pasar"],
      "correctIndex": 1,
      "explanation": "Madrasatun (مَدْرَسَةٌ) bermakna sekolah, tempat belajar mengajar."
    }
  ]
}
    `.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{"questions": []}');
    return res.json({ success: true, ...parsed });
  } catch (err: any) {
    console.error('Error in /api/gemini/quiz:', err);
    return res.status(500).json({
      error: 'Gagal membuat kuis dinamis.',
      details: err?.message || String(err),
    });
  }
});

// Admin routes: Custom Mufrodat
app.get('/api/admin/custom-mufrodat', (_req: Request, res: Response) => {
  res.json({ success: true, mufrodat: serverCustomMufrodat });
});

app.post('/api/admin/custom-mufrodat', (req: Request, res: Response) => {
  const { arabic, transliteration, meaning, category, exampleArabic, exampleMeaning, createdBy } = req.body;
  if (!arabic || !meaning) {
    return res.status(400).json({ error: 'Teks Arab dan arti wajib diisi.' });
  }

  const newItem = {
    id: 'custom-' + Date.now(),
    arabic,
    transliteration: transliteration || '',
    meaning,
    category: category || 'Umum',
    exampleArabic: exampleArabic || '',
    exampleMeaning: exampleMeaning || '',
    createdBy: createdBy || 'rosithadmin',
    createdAt: new Date().toISOString(),
  };

  serverCustomMufrodat.unshift(newItem);
  res.status(201).json({ success: true, item: newItem });
});

app.delete('/api/admin/custom-mufrodat/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  serverCustomMufrodat = serverCustomMufrodat.filter(item => item.id !== id);
  res.json({ success: true, message: 'Mufrodat berhasil dihapus.' });
});

// Admin routes: Announcements
app.get('/api/admin/announcements', (_req: Request, res: Response) => {
  res.json({ success: true, announcements: serverAnnouncements });
});

app.post('/api/admin/announcements', (req: Request, res: Response) => {
  const { title, content, author, badge } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Judul dan konten pengumuman wajib diisi.' });
  }

  const newAnn = {
    id: 'ann-' + Date.now(),
    title,
    content,
    author: author || 'rosithadmin',
    date: new Date().toISOString().split('T')[0],
    badge: badge || 'Pemberitahuan',
  };

  serverAnnouncements.unshift(newAnn);
  res.status(201).json({ success: true, announcement: newAnn });
});

app.delete('/api/admin/announcements/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  serverAnnouncements = serverAnnouncements.filter(item => item.id !== id);
  res.json({ success: true, message: 'Pengumuman berhasil dihapus.' });
});

// EXPORT DEFAULT APP TANPA APP.LISTEN (Sesuai instruksi Vercel serverless)
export default app;
