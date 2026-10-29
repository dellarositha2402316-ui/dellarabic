/**
 * Web Speech API helper for Arabic pronunciation
 */
export function playArabicAudio(text: string): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    // Clean any non-speech punctuation while keeping Arabic diacritics
    const cleanedText = text.replace(/[/\\#,+()$~%.'":*?<>{}]/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.82; // slightly slower for educational clarity
    utterance.pitch = 1.0;

    // Pick Arabic voice if installed
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(
      (v) => v.lang.startsWith('ar') || v.lang.includes('ar-')
    );
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Audio playback error:', err);
    return false;
  }
}
