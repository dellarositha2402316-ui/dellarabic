import { MufrodatItem, GrammarLesson, HiwarDialogue, QuizQuestion } from '../types';

export const INITIAL_MUFRODAT: MufrodatItem[] = [
  // Kategori: Angka
  {
    id: 'num-1',
    arabic: 'وَاحِدٌ',
    transliteration: 'Wāḥid',
    meaning: 'Satu (1)',
    category: 'Angka',
    exampleArabic: 'قَلَمٌ وَاحِدٌ',
    exampleMeaning: 'Satu buah pulpen',
    level: 'Dasar',
  },
  {
    id: 'num-2',
    arabic: 'اِثْنَانِ',
    transliteration: 'Ithnān',
    meaning: 'Dua (2)',
    category: 'Angka',
    exampleArabic: 'كِتَابَانِ اثْنَانِ',
    exampleMeaning: 'Dua buah buku',
    level: 'Dasar',
  },
  {
    id: 'num-3',
    arabic: 'ثَلَاثَةٌ',
    transliteration: 'Thalāthah',
    meaning: 'Tiga (3)',
    category: 'Angka',
    exampleArabic: 'ثَلَاثَةُ أَيَّامٍ',
    exampleMeaning: 'Tiga hari',
    level: 'Dasar',
  },
  {
    id: 'num-4',
    arabic: 'أَرْبَعَةٌ',
    transliteration: 'Arba\'ah',
    meaning: 'Empat (4)',
    category: 'Angka',
    exampleArabic: 'أَرْبَعَةُ فُصُولٍ',
    exampleMeaning: 'Empat musim',
    level: 'Dasar',
  },
  {
    id: 'num-5',
    arabic: 'خَمْسَةٌ',
    transliteration: 'Khamsah',
    meaning: 'Lima (5)',
    category: 'Angka',
    exampleArabic: 'خَمْسُ صَلَوَاتٍ',
    exampleMeaning: 'Lima waktu shalat',
    level: 'Dasar',
  },
  {
    id: 'num-10',
    arabic: 'عَشَرَةٌ',
    transliteration: '\'Asyarah',
    meaning: 'Sepuluh (10)',
    category: 'Angka',
    exampleArabic: 'عَشَرَةُ طُلَّابٍ',
    exampleMeaning: 'Sepuluh murid',
    level: 'Dasar',
  },

  // Kategori: Keluarga
  {
    id: 'fam-1',
    arabic: 'أَبٌ / وَالِدٌ',
    transliteration: 'Abun / Wālid',
    meaning: 'Ayah / Bapak',
    category: 'Keluarga',
    exampleArabic: 'أَبِي رَجُلٌ طَيِّبٌ',
    exampleMeaning: 'Ayahku adalah pria yang baik',
    level: 'Dasar',
  },
  {
    id: 'fam-2',
    arabic: 'أُمٌّ / وَالِدَةٌ',
    transliteration: 'Ummun / Wālidah',
    meaning: 'Ibu',
    category: 'Keluarga',
    exampleArabic: 'الجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ',
    exampleMeaning: 'Surga berada di bawah telapak kaki ibu',
    level: 'Dasar',
  },
  {
    id: 'fam-3',
    arabic: 'أَخٌ كَبِيرٌ',
    transliteration: 'Akhun Kabīr',
    meaning: 'Kakak Laki-laki',
    category: 'Keluarga',
    exampleArabic: 'أَخِي الكَبِيرُ يَدْرُسُ فِي الجَامِعَةِ',
    exampleMeaning: 'Kakak laki-lakiku belajar di universitas',
    level: 'Dasar',
  },
  {
    id: 'fam-4',
    arabic: 'أُخْتٌ',
    transliteration: 'Ukhtun',
    meaning: 'Saudari Perempuan',
    category: 'Keluarga',
    exampleArabic: 'أُخْتِي الصَّغِيرَةُ ذَكِيَّةٌ',
    exampleMeaning: 'Adik perempuanku sangat cerdas',
    level: 'Dasar',
  },
  {
    id: 'fam-5',
    arabic: 'جَدٌّ',
    transliteration: 'Jaddun',
    meaning: 'Kakek',
    category: 'Keluarga',
    exampleArabic: 'جَدِّي يُحِبُّ قِرَاءَةَ القُرْآنِ',
    exampleMeaning: 'Kakekku suka membaca Al-Qur\'an',
    level: 'Dasar',
  },
  {
    id: 'fam-6',
    arabic: 'جَدَّةٌ',
    transliteration: 'Jaddah',
    meaning: 'Nenek',
    category: 'Keluarga',
    exampleArabic: 'تَجْلِسُ جَدَّتِي فِي غُرْفَةِ الجُلُوسِ',
    exampleMeaning: 'Nenekku duduk di ruang tamu',
    level: 'Dasar',
  },

  // Kategori: Di Sekolah
  {
    id: 'sch-1',
    arabic: 'مَدْرَسَةٌ',
    transliteration: 'Madrasah',
    meaning: 'Sekolah',
    category: 'Sekolah',
    exampleArabic: 'أَذْهَبُ إِلَى المَدْرَسَةِ صَبَاحًا',
    exampleMeaning: 'Saya pergi ke sekolah di pagi hari',
    level: 'Dasar',
  },
  {
    id: 'sch-2',
    arabic: 'فَصْلٌ',
    transliteration: 'Fashlun',
    meaning: 'Ruang Kelas',
    category: 'Sekolah',
    exampleArabic: 'الفَصْلُ نَظِيفٌ وَوَاسِعٌ',
    exampleMeaning: 'Ruang kelas itu bersih dan luas',
    level: 'Dasar',
  },
  {
    id: 'sch-3',
    arabic: 'كِتَابٌ',
    transliteration: 'Kitābun',
    meaning: 'Buku',
    category: 'Sekolah',
    exampleArabic: 'هَذَا كِتَابُ اللُّغَةِ العَرَبِيَّةِ',
    exampleMeaning: 'Ini adalah buku bahasa Arab',
    level: 'Dasar',
  },
  {
    id: 'sch-4',
    arabic: 'قَلَمٌ',
    transliteration: 'Qalamun',
    meaning: 'Pena / Pulpen',
    category: 'Sekolah',
    exampleArabic: 'أَكْتُبُ الدَّرْسَ بِالقَلَمِ',
    exampleMeaning: 'Saya menulis pelajaran menggunakan pena',
    level: 'Dasar',
  },
  {
    id: 'sch-5',
    arabic: 'أُسْتَاذٌ / مُعَلِّمٌ',
    transliteration: 'Ustādhun / Mu\'allim',
    meaning: 'Guru / Pengajar (Laki-laki)',
    category: 'Sekolah',
    exampleArabic: 'الأُسْتَاذُ يَشْرَحُ القَوَاعِدَ',
    exampleMeaning: 'Pak guru menjelaskan kaidah tata bahasa',
    level: 'Dasar',
  },
  {
    id: 'sch-6',
    arabic: 'مَكْتَبَةٌ',
    transliteration: 'Maktabah',
    meaning: 'Perpustakaan',
    category: 'Sekolah',
    exampleArabic: 'نَقْرَأُ الكُتُبَ فِي المَكْتَبَةِ',
    exampleMeaning: 'Kami membaca buku di perpustakaan',
    level: 'Dasar',
  },

  // Kategori: Percakapan & Sapaan
  {
    id: 'greet-1',
    arabic: 'السَّلَامُ عَلَيْكُمْ',
    transliteration: 'As-salāmu \'alaikum',
    meaning: 'Semoga keselamatan tercurah kepadamu',
    category: 'Sapaan',
    exampleArabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
    exampleMeaning: 'Salam lengkap pembuka pembicaraan',
    level: 'Dasar',
  },
  {
    id: 'greet-2',
    arabic: 'صَبَاحَ الخَيْرِ',
    transliteration: 'Shabāḥal khair',
    meaning: 'Selamat Pagi',
    category: 'Sapaan',
    exampleArabic: 'صَبَاحَ النُّورِ يَا أَخِي',
    exampleMeaning: 'Jawaban: Selamat pagi juga wahai saudaraku',
    level: 'Dasar',
  },
  {
    id: 'greet-3',
    arabic: 'كَيْفَ حَالُكَ؟',
    transliteration: 'Kaifa ḥāluka?',
    meaning: 'Bagaimana kabarmu? (untuk laki-laki)',
    category: 'Sapaan',
    exampleArabic: 'أَنَا بِخَيْرٍ وَالحَمْدُ لِلَّهِ',
    exampleMeaning: 'Saya baik-baik saja, alhamdulillah',
    level: 'Dasar',
  },
  {
    id: 'greet-4',
    arabic: 'شُكْرًا جَزِيلًا',
    transliteration: 'Syukran jazīlan',
    meaning: 'Terima kasih banyak',
    category: 'Sapaan',
    exampleArabic: 'عَفْوًا / لَا شُكْرَ عَلَى وَاجِبٍ',
    exampleMeaning: 'Sama-sama (jawaban terima kasih)',
    level: 'Dasar',
  },
  {
    id: 'greet-5',
    arabic: 'أَهْلًا وَسَهْلًا',
    transliteration: 'Ahlan wa sahlan',
    meaning: 'Selamat datang',
    category: 'Sapaan',
    exampleArabic: 'أَهْلًا بِكَ فِي فُرْصَتِنَا المُبَارَكَةِ',
    exampleMeaning: 'Selamat datang dalam kesempatan berkah ini',
    level: 'Dasar',
  },

  // Kategori: Kata Kerja (Fi'il)
  {
    id: 'vrb-1',
    arabic: 'قَرَأَ - يَقْرَأُ',
    transliteration: 'Qara\'a - Yaqra\'u',
    meaning: 'Membaca (Telah - Sedang)',
    category: 'Kata Kerja',
    exampleArabic: 'قَرَأَ الطَّالِبُ الدَّرْسَ',
    exampleMeaning: 'Murid itu telah membaca pelajaran',
    level: 'Dasar',
  },
  {
    id: 'vrb-2',
    arabic: 'كَتَبَ - يَكْتُبُ',
    transliteration: 'Kataba - Yaktubu',
    meaning: 'Menulis (Telah - Sedang)',
    category: 'Kata Kerja',
    exampleArabic: 'يَكْتُبُ مُحَمَّدٌ الرِّسَالَةَ',
    exampleMeaning: 'Muhammad sedang menulis surat',
    level: 'Dasar',
  },
  {
    id: 'vrb-3',
    arabic: 'ذَهَبَ - يَذْهَبُ',
    transliteration: 'Dhahaba - Yadh-habu',
    meaning: 'Pergi (Telah - Sedang)',
    category: 'Kata Kerja',
    exampleArabic: 'ذَهَبَ عَلِيٌّ إِلَى المَسْجِدِ',
    exampleMeaning: 'Ali telah pergi ke masjid',
    level: 'Dasar',
  },
  {
    id: 'vrb-4',
    arabic: 'تَعَلَّمَ - يَتَعَلَّمُ',
    transliteration: 'Ta\'allama - Yata\'allamu',
    meaning: 'Belajar (Telah - Sedang)',
    category: 'Kata Kerja',
    exampleArabic: 'نَتَعَلَّمُ اللُّغَةَ العَرَبِيَّةَ بِحَمَاسَةٍ',
    exampleMeaning: 'Kami belajar bahasa Arab dengan penuh semangat',
    level: 'Dasar',
  },
  {
    id: 'vrb-5',
    arabic: 'أَكَلَ - يَأْكُلُ',
    transliteration: 'Akala - Ya\'kulu',
    meaning: 'Makan (Telah - Sedang)',
    category: 'Kata Kerja',
    exampleArabic: 'أَكَلْتُ الرُّزَّ فِي المَطْعَمِ',
    exampleMeaning: 'Saya telah memakan nasi di kantin/restoran',
    level: 'Dasar',
  },

  // Kategori: Makanan & Minuman
  {
    id: 'food-1',
    arabic: 'مَاءٌ',
    transliteration: 'Mā\'un',
    meaning: 'Air',
    category: 'Makanan',
    exampleArabic: 'أَشْرَبُ مَاءً عَذْبًا',
    exampleMeaning: 'Saya minum air segar',
    level: 'Dasar',
  },
  {
    id: 'food-2',
    arabic: 'خُبْزٌ',
    transliteration: 'Khubzun',
    meaning: 'Roti',
    category: 'Makanan',
    exampleArabic: 'هَذَا خُبْزٌ لَذِيذٌ',
    exampleMeaning: 'Ini roti yang sangat lezat',
    level: 'Dasar',
  },
  {
    id: 'food-3',
    arabic: 'رُزٌّ',
    transliteration: 'Ruzzun',
    meaning: 'Nasi / Beras',
    category: 'Makanan',
    exampleArabic: 'نَأْكُلُ الرُّزَّ فِي الغَدَاءِ',
    exampleMeaning: 'Kami makan nasi saat makan siang',
    level: 'Dasar',
  },
  {
    id: 'food-4',
    arabic: 'شَايٌ',
    transliteration: 'Syāyun',
    meaning: 'Teh',
    category: 'Makanan',
    exampleArabic: 'هَلْ تُحِبُّ الشَّايَ أَمِ القَهْوَةَ؟',
    exampleMeaning: 'Apakah kamu suka teh atau kopi?',
    level: 'Dasar',
  },

  // Kategori: Rumah
  {
    id: 'hse-1',
    arabic: 'بَيْتٌ',
    transliteration: 'Baitun',
    meaning: 'Rumah',
    category: 'Rumah',
    exampleArabic: 'بَيْتِي جَمِيلٌ وَنَظِيفٌ',
    exampleMeaning: 'Rumahku indah dan bersih',
    level: 'Dasar',
  },
  {
    id: 'hse-2',
    arabic: 'بَابٌ',
    transliteration: 'Bābun',
    meaning: 'Pintu',
    category: 'Rumah',
    exampleArabic: 'اِفْتَحِ البَابَ يَا أَحْمَدُ',
    exampleMeaning: 'Bukalah pintu itu wahai Ahmad',
    level: 'Dasar',
  },
  {
    id: 'hse-3',
    arabic: 'نَافِذَةٌ',
    transliteration: 'Nāfidhah',
    meaning: 'Jendela',
    category: 'Rumah',
    exampleArabic: 'هَذِهِ نَافِذَةٌ كَبِيرَةٌ',
    exampleMeaning: 'Ini adalah jendela yang besar',
    level: 'Dasar',
  },
  {
    id: 'hse-4',
    arabic: 'مَسْجِدٌ',
    transliteration: 'Masjidun',
    meaning: 'Masjid',
    category: 'Rumah',
    exampleArabic: 'نُصَلِّي فِي المَسْجِدِ جَمَاعَةً',
    exampleMeaning: 'Kami shalat di masjid secara berjamaah',
    level: 'Dasar',
  },
];

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'gram-1',
    title: 'Pembagian Kalimah (Kata)',
    arabicTitle: 'أَقْسَامُ الكَلَامِ',
    category: 'Nahwu',
    summary: 'Dalam bahasa Arab, seluruh kata dibagi menjadi 3 jenis: Isim, Fi\'il, dan Huruf.',
    explanation: [
      '1. Isim (اِسْمٌ): Kata yang menunjukkan nama orang, benda, hewan, tumbuhan, tempat, atau sifat tanpa terikat waktu. Contoh: كِتَابٌ (Buku), مَدْرَسَةٌ (Sekolah). Ciri isim: bertanwin, diawali Alif Lam (الـ), atau diawali huruf jar.',
      '2. Fi\'il (فِعْلٌ): Kata kerja yang menunjukkan suatu peristiwa dan terikat oleh waktu (lampau/madhi, sekarang/mudhari\', atau perintah/amr). Contoh: كَتَبَ (Telah menulis), يَقْرَأُ (Sedang membaca).',
      '3. Huruf (حَرْفٌ): Kata penghubung yang belum bermakna sempurna kecuali jika digabung dengan kata lain. Contoh: فِي (Di dalam), مِنْ (Dari), عَلَى (Di atas).'
    ],
    examples: [
      {
        arabic: 'قَرَأَ التِّلْمِيذُ الكِتَابَ فِي الفَصْلِ',
        transliteration: 'Qara\'at-tilmīdhu al-kitāba fīl-fashli',
        translation: 'Murid itu telah membaca buku di dalam kelas',
        note: 'Qara\'a (Fi\'il), At-Tilmīdhu & Al-Kitāb (Isim), Fī (Huruf).'
      }
    ],
    keyRule: 'Rumus dasar: Kalimat bahasa Arab selalu tersusun dari perpaduan Isim, Fi\'il, dan Huruf.'
  },
  {
    id: 'gram-2',
    title: 'Mudzakkar & Muannats (Gender Kata)',
    arabicTitle: 'المُذَكَّرُ وَالمُؤَنَّثُ',
    category: 'Nahwu',
    summary: 'Setiap kata benda dalam bahasa Arab memiliki jenis maskulin (Mudzakkar) atau feminin (Muannats).',
    explanation: [
      '1. Mudzakkar (مُذَكَّرٌ): Menunjukkan laki-laki atau benda yang dianggap maskulin. Tidak berakhiran Ta Marbuthah (ة). Contoh: مُسْلِمٌ (Muslim pria), قَلَمٌ (Pena), بَابٌ (Pintu).',
      '2. Muannats (مُؤَنَّثٌ): Menunjukkan perempuan atau kata yang diakhiri huruf Ta Marbuthah (ة/ـة). Contoh: مُسْلِمَةٌ (Muslimah), مَدْرَسَةٌ (Sekolah), سَيَّارَةٌ (Mobil).',
      'Catatan penting: Anggota tubuh yang berpasangan (mata, telinga, tangan, kaki) digolongkan sebagai Muannats secara simā\'i (kebiasaan lisan Arab).'
    ],
    examples: [
      {
        arabic: 'هَذَا مُدَرِّسٌ جَدِيدٌ',
        transliteration: 'Hādhā mudarrisun jadīd',
        translation: 'Ini adalah guru laki-laki yang baru (Mudzakkar)'
      },
      {
        arabic: 'هَذِهِ مُدَرِّسَةٌ جَدِيدَةٌ',
        transliteration: 'Hādhihi mudarrisatun jadīdah',
        translation: 'Ini adalah guru wanita yang baru (Muannats)'
      }
    ],
    keyRule: 'Sifat mengikuti yang disifati: jika Isimnya muannats (ada ta marbuthah), maka kata sifatnya wajib berakhiran ta marbuthah juga!'
  },
  {
    id: 'gram-3',
    title: 'Kata Tunjuk (Isim Isyarah)',
    arabicTitle: 'أَسْمَاءُ الإِشَارَةِ',
    category: 'Kaidah',
    summary: 'Kata yang digunakan untuk menunjuk sesuatu yang dekat (Ini) atau jauh (Itu).',
    explanation: [
      '1. Jarak Dekat (قَرِيبٌ - Ini):',
      '   - هَذَا (Hādhā): untuk Isim Mudzakkar tunggal. Contoh: هَذَا كِتَابٌ (Ini buku).',
      '   - هَذِهِ (Hādhihi): untuk Isim Muannats tunggal atau jamak taksir benda tak berakal. Contoh: هَذِهِ مَدْرَسَةٌ (Ini sekolah).',
      '2. Jarak Jauh (بَعِيدٌ - Itu):',
      '   - ذَلِكَ (Dhālika): untuk Isim Mudzakkar tunggal. Contoh: ذَلِكَ مَسْجِدٌ (Itu masjid).',
      '   - تِلْكَ (Tilka): untuk Isim Muannats tunggal. Contoh: تِلْكَ حَدِيقَةٌ (Itu kebun/taman).'
    ],
    examples: [
      {
        arabic: 'هَذَا قَلَمِي وَذَلِكَ كِتَابُكَ',
        transliteration: 'Hādhā qalamī wa dhālika kitābuka',
        translation: 'Ini adalah penaku dan itu adalah bukumu'
      }
    ],
    keyRule: 'Ingat pasangan emas: هَذَا / ذَلِكَ untuk Mudzakkar; هَذِهِ / تِلْكَ untuk Muannats.'
  },
  {
    id: 'gram-4',
    title: 'Kata Ganti (Dhomir Munfashil)',
    arabicTitle: 'الضَّمَائِرُ المُنْفَصِلَةُ',
    category: 'Sharaf',
    summary: 'Kata ganti orang yang berdiri sendiri (Subjek) dalam percakapan dan tulisan.',
    explanation: [
      '• هُوَ (Huwa) = Dia (1 laki-laki)',
      '• هِيَ (Hiya) = Dia (1 perempuan)',
      '• أَنْتَ (Anta) = Kamu (1 laki-laki)',
      '• أَنْتِ (Anti) = Kamu (1 perempuan)',
      '• أَنَا (Anā) = Saya / Aku (bisa mudzakkar & muannats)',
      '• نَحْنُ (Naḥnu) = Kami / Kita (jamak)'
    ],
    examples: [
      {
        arabic: 'أَنَا طَالِبٌ فِي المَدْرَسَةِ',
        transliteration: 'Anā thālibun fīl-madrasah',
        translation: 'Saya seorang murid di sekolah'
      },
      {
        arabic: 'هُوَ مُهَنْدِسٌ نَاجِحٌ',
        transliteration: 'Huwa muhandisun nājiḥ',
        translation: 'Dia (laki-laki) adalah seorang insinyur yang sukses'
      }
    ],
    keyRule: 'Dhomir berfungsi sebagai Mubtada\' (pokok kalimat) dalam Jumlah Ismiyyah.'
  },
  {
    id: 'gram-5',
    title: 'Jumlah Ismiyyah & Fi\'liyyah',
    arabicTitle: 'الجُمْلَةُ الاسْمِيَّةُ وَالفِعْلِيَّةُ',
    category: 'Nahwu',
    summary: 'Dua bentuk dasar susunan kalimat sempurna (Jumlah Mufīdah) dalam bahasa Arab.',
    explanation: [
      '1. Jumlah Ismiyyah (الجُمْلَةُ الاسْمِيَّةُ): Kalimat yang diawali dengan Isim. Terdiri dari Mubtada\' (pokok/subjek) dan Khobar (penjelas/predikat). Keduanya umumnya berharakat akhir Dhommah (Marfu\'). Contoh: اللهُ رَبُّنَا (Allah adalah Tuhan kita).',
      '2. Jumlah Fi\'liyyah (الجُمْلَةُ الفِعْلِيَّةُ): Kalimat yang diawali dengan kata kerja (Fi\'il). Terdiri dari Fi\'il (kata kerja) dan Fa\'il (pelaku/subjek yang marfu\'). Contoh: ذَهَبَ أَحْمَدُ (Ahmad telah pergi).'
    ],
    examples: [
      {
        arabic: 'العِلْمُ نُورٌ',
        transliteration: 'Al-\'Ilmu nūrun',
        translation: 'Ilmu itu adalah cahaya (Jumlah Ismiyyah: Mubtada\' + Khobar)'
      },
      {
        arabic: 'يَجْلِسُ الطَّالِبُ عَلَى الكُرْسِيِّ',
        transliteration: 'Yajlisut-thālibu \'alal-kursiyyi',
        translation: 'Murid itu duduk di atas kursi (Jumlah Fi\'liyyah: Fi\'il + Fa\'il + Jar Majrur)'
      }
    ],
    keyRule: 'Jika diawali isim -> Ismiyyah; jika diawali fi\'il -> Fi\'liyyah.'
  },
  {
    id: 'gram-6',
    title: 'Huruf Jar & Pengaruhnya',
    arabicTitle: 'حُرُوفُ الجَرِّ وَعَمَلُهَا',
    category: 'Nahwu',
    summary: 'Huruf yang menyebabkan isim setelahnya berharakat Kasrah (Majrūr).',
    explanation: [
      'Huruf jar yang paling sering digunakan:',
      '• مِنْ (Min) = dari',
      '• إِلَى (Ilā) = ke / kepada',
      '• عَنْ (\'An) = tentang / dari',
      '• عَلَى (\'Alā) = di atas',
      '• فِي (Fī) = di dalam',
      '• بِـ (Bi) = dengan',
      '• لِـ (Li) = untuk / milik',
      'Hukum Nahwu: Setiap isim yang jatuh tepat setelah huruf jar WAJIB berharakat kasrah (majrur).'
    ],
    examples: [
      {
        arabic: 'خَرَجَ المُدَرِّسُ مِنَ الفَصْلِ',
        transliteration: 'Kharajal-mudarrisu minal-fashli',
        translation: 'Guru itu keluar dari kelas (الفَصْلِ berharakat kasrah karena ada مِنْ)'
      }
    ],
    keyRule: 'Huruf Jar + Isim = Isim Majrūr (berharakat kasrah).'
  }
];

export const HIWAR_DIALOGUES: HiwarDialogue[] = [
  {
    id: 'hiwar-1',
    title: 'Perkenalan Diri (التَّعَارُفُ)',
    arabicTitle: 'التَّعَارُفُ بَيْنَ طَالِبَيْنِ',
    theme: 'Perkenalan awal antara dua santri baru di sekolah',
    exchanges: [
      {
        speaker: 'Ahmad',
        arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ',
        transliteration: 'As-salāmu \'alaikum wa raḥmatullāh',
        translation: 'Semoga keselamatan dan rahmat Allah tercurah kepadamu'
      },
      {
        speaker: 'Zaid',
        arabic: 'وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
        transliteration: 'Wa \'alaikumus-salām wa raḥmatullāhi wa barakātuh',
        translation: 'Dan kepadamu juga semoga keselamatan, rahmat Allah dan berkah-Nya'
      },
      {
        speaker: 'Ahmad',
        arabic: 'اِسْمِي أَحْمَدُ، مَا اسْمُكَ يَا أَخِي؟',
        transliteration: 'Ismī Aḥmad, masmuka yā akhī?',
        translation: 'Namaku Ahmad, siapa namamu wahai saudaraku?'
      },
      {
        speaker: 'Zaid',
        arabic: 'اِسْمِي زَيْدٌ. فُرْصَةٌ سَعِيدَةٌ يَا أَحْمَدُ!',
        transliteration: 'Ismī Zaid. Furṣatun sa\'īdatun yā Aḥmad!',
        translation: 'Namaku Zaid. Senang berkenalan denganmu wahai Ahmad!'
      },
      {
        speaker: 'Ahmad',
        arabic: 'أَنَا أَسْعَدُ! مِنْ أَيْنَ أَنْتَ؟',
        transliteration: 'Anā as\'ad! Min aina anta?',
        translation: 'Saya lebih senang! Dari mana asalmu?'
      },
      {
        speaker: 'Zaid',
        arabic: 'أَنَا مِنْ مَدِينَةِ سُورَابَايَا، وَأَنْتَ؟',
        transliteration: 'Anā min madīnati Sūrābāyā, wa anta?',
        translation: 'Saya dari kota Surabaya, dan kamu?'
      },
      {
        speaker: 'Ahmad',
        arabic: 'أَنَا مِنْ مَالَانْج. أَهْلًا وَسَهْلًا بِكَ هُنَا!',
        transliteration: 'Anā min Mālānji. Ahlan wa sahlan bika hunā!',
        translation: 'Saya dari Malang. Selamat datang bersamaku di sini!'
      }
    ]
  },
  {
    id: 'hiwar-2',
    title: 'Di Perpustakaan (فِي المَكْتَبَةِ)',
    arabicTitle: 'فِي مَكْتَبَةِ المَدْرَسَةِ',
    theme: 'Mencari buku dan berdiskusi di perpustakaan',
    exchanges: [
      {
        speaker: 'Fatimah',
        arabic: 'صَبَاحَ الخَيْرِ يَا عَائِشَةُ!',
        transliteration: 'Shabāḥal-khair yā \'Ā\'isyah!',
        translation: 'Selamat pagi wahai Aisyah!'
      },
      {
        speaker: 'Aisyah',
        arabic: 'صَبَاحَ النُّورِ وَالسُّرُورِ! مَاذَا تَقْرَئِينَ؟',
        transliteration: 'Shabāḥan-nūri was-surūr! Mādhā taqra\'īna?',
        translation: 'Selamat pagi penuh kebahagiaan! Apa yang sedang kamu baca?'
      },
      {
        speaker: 'Fatimah',
        arabic: 'أَقْرَأُ كِتَابَ قَوَاعِدِ اللُّغَةِ العَرَبِيَّةِ',
        transliteration: 'Aqra\'u kitāba qawā\'idil-lughatil-\'arabiyyah',
        translation: 'Saya sedang membaca buku tata bahasa Arab'
      },
      {
        speaker: 'Aisyah',
        arabic: 'مُمْتَازٌ! هَلِ اللُّغَةُ العَرَبِيَّةُ صَعْبَةٌ؟',
        transliteration: 'Mumtāz! Halil-lughatul-\'arabiyyatu sha\'bah?',
        translation: 'Luar biasa! Apakah bahasa Arab itu sulit?'
      },
      {
        speaker: 'Fatimah',
        arabic: 'لَا، بَلْ هِيَ سَهْلَةٌ وَمُمْتِعَةٌ لِمَنْ يَتَعَلَّمُهَا بِجِدٍّ',
        transliteration: 'Lā, bal hiya sahlatun wa mumti\'atun liman yata\'allamuhā bijiddin',
        translation: 'Tidak, bahkan bahasa Arab itu mudah dan mengasyikkan bagi yang mempelajarinya dengan sungguh-sungguh'
      }
    ]
  }
];

export const INITIAL_QUIZ: QuizQuestion[] = [
  {
    id: 'quiz-1',
    question: 'Apa arti kata bahasa Arab berikut ini?',
    arabic: 'مَدْرَسَةٌ',
    options: ['Rumah sakit', 'Sekolah', 'Perpustakaan', 'Masjid'],
    correctIndex: 1,
    explanation: 'Madrasatun (مَدْرَسَةٌ) artinya adalah Sekolah, tempat menuntut ilmu.',
    category: 'Mufrodat'
  },
  {
    id: 'quiz-2',
    question: 'Pilihlah Isim Isyarah yang tepat untuk melengkapi kalimat berikut:',
    arabic: '... نَافِذَةٌ كَبِيرَةٌ',
    options: ['هَذَا', 'ذَلِكَ', 'هَذِهِ', 'هُوَ'],
    correctIndex: 2,
    explanation: 'Karena "نَافِذَةٌ" diakhiri ta marbuthah (muannats), maka kata tunjuk dekat yang tepat adalah "هَذِهِ".',
    category: 'Nahwu'
  },
  {
    id: 'quiz-3',
    question: 'Manakah di bawah ini yang merupakan contoh Fi\'il (Kata Kerja)?',
    arabic: 'أَيٌّ مِمَّا يَلِي فِعْلٌ؟',
    options: ['كِتَابٌ', 'ذَهَبَ', 'فِي', 'قَلَمٌ'],
    correctIndex: 1,
    explanation: 'Dhahaba (ذَهَبَ) bermakna "telah pergi", yang merupakan kata kerja (Fi\'il Madhi). Sedangkan Kitabun dan Qalamun adalah Isim, dan Fī adalah Huruf.',
    category: 'Nahwu'
  },
  {
    id: 'quiz-4',
    question: 'Apa terjemahan dari angka berikut ini?',
    arabic: 'خَمْسَةٌ',
    options: ['Tiga (3)', 'Empat (4)', 'Lima (5)', 'Tujuh (7)'],
    correctIndex: 2,
    explanation: 'Khamsah (خَمْسَةٌ) berarti angka Lima (5).',
    category: 'Mufrodat'
  },
  {
    id: 'quiz-5',
    question: 'Jika seseorang menyapa dengan "صَبَاحَ الخَيْرِ", apa jawaban yang paling tepat?',
    arabic: 'مَا جَوَابُ "صَبَاحَ الخَيْرِ"؟',
    options: ['مَسَاءَ الخَيْرِ', 'صَبَاحَ النُّورِ', 'شُكْرًا', 'مَعَ السَّلَامَةِ'],
    correctIndex: 1,
    explanation: 'Jawaban yang lazim dan santun untuk Shabāḥal khair (Selamat pagi) adalah Shabāḥan nūr (Selamat pagi juga).',
    category: 'Sapaan'
  },
  {
    id: 'quiz-6',
    question: 'Setelah huruf jar (seperti فِي atau مِنْ), harakat isim di belakangnya menjadi apa?',
    arabic: 'حَرَكَةُ الاسْمِ بَعْدَ حَرْفِ الجَرِّ:',
    options: ['Fathah (Manshub)', 'Kasrah (Majrur)', 'Dhommah (Marfu\')', 'Sukun (Majzum)'],
    correctIndex: 1,
    explanation: 'Huruf jar mewajibkan isim sesudahnya menjadi majrur dengan tanda pokok harakat Kasrah (misal: فِي البَيْتِ).',
    category: 'Nahwu'
  },
  {
    id: 'quiz-7',
    question: 'Apa arti dari mufrodat berikut?',
    arabic: 'أَبٌ وَأُمٌّ',
    options: ['Kakak dan adik', 'Kakek dan nenek', 'Ayah dan ibu', 'Guru dan murid'],
    correctIndex: 2,
    explanation: 'Abun wa ummun bermakna ayah dan ibu.',
    category: 'Mufrodat'
  },
  {
    id: 'quiz-8',
    question: 'Kata ganti "Kami / Kita" dalam bahasa Arab fushah adalah:',
    arabic: 'الضَّمِيرُ لِـ (KITA / KAMI):',
    options: ['أَنَا', 'أَنْتُمْ', 'نَحْنُ', 'هُمْ'],
    correctIndex: 2,
    explanation: 'Nahnu (نَحْنُ) adalah dhomir munfashil untuk pembicara jamak (kami atau kita).',
    category: 'Sharaf'
  }
];

export const DAILY_QUOTES = [
  {
    arabic: 'طَلَبُ العِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
    transliteration: 'Thalabul \'ilmi farīḍatun \'alā kulli muslim',
    translation: 'Menuntut ilmu itu wajib atas setiap muslim. (HR. Ibnu Majah)'
  },
  {
    arabic: 'تَعَلَّمُوا العَرَبِيَّةَ فَإِنَّهَا تُثَبِّتُ العَقْلَ وَتَزِيدُ فِي المُرُوءَةِ',
    transliteration: 'Ta\'allamūl-\'arabiyyata fa-innahā tuthabbitul-\'aqla wa tazīdu fīl-murū\'ah',
    translation: 'Pelajarilah bahasa Arab, sesungguhnya ia memantapkan akal dan menambah kepribadian mulia.'
  },
  {
    arabic: 'مَنْ جَدَّ وَجَدَ',
    transliteration: 'Man jadda wajada',
    translation: 'Barangsiapa bersungguh-sungguh, maka ia pasti akan berhasil.'
  }
];
