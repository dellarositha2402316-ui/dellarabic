import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

// Konfigurasi resmi Firebase yang diberikan oleh pengguna
export const firebaseConfig = {
  apiKey: 'AIzaSyCvsVYwHyxZ6MAZYRgdiDI8fMQxvPFrW5Q',
  authDomain: 'dellarabic-da747.firebaseapp.com',
  projectId: 'dellarabic-da747',
  storageBucket: 'dellarabic-da747.firebasestorage.app',
  messagingSenderId: '953323992036',
  appId: '1:953323992036:web:f4ba38736bedc22cf30df1',
};

// Inisialisasi Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Provider Google Sign-in
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

/**
 * Menyimpan data profil pengguna ke Firestore /users/{userId}
 * Sesuai rules: Hanya user tersebut yang dapat menulis datanya sendiri.
 */
export async function syncUserProfileToFirestore(user: {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: string;
}) {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(
      userDocRef,
      {
        userId: user.uid,
        displayName: user.displayName || 'Santri Al-Arabiyyah',
        email: user.email,
        photoURL: user.photoURL,
        role: user.role,
        lastLogin: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.warn('Catatan Firestore: Sinkronisasi profil pengguna ke cloud:', error);
  }
}

/**
 * Menyimpan progres belajar santri (kosakata yang sudah dihafal) ke Firestore
 * Path: /user_progress/{userId}
 */
export async function saveProgressToFirestore(userId: string, masteredWordIds: string[]) {
  try {
    const progressDocRef = doc(db, 'user_progress', userId);
    await setDoc(
      progressDocRef,
      {
        userId,
        masteredWordIds,
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.warn('Catatan Firestore: Sinkronisasi progres ke cloud:', error);
  }
}

/**
 * Mengambil progres belajar santri dari Firestore
 * Path: /user_progress/{userId}
 */
export async function loadProgressFromFirestore(userId: string): Promise<string[] | null> {
  try {
    const progressDocRef = doc(db, 'user_progress', userId);
    const snap = await getDoc(progressDocRef);
    if (snap.exists()) {
      const data = snap.data();
      return Array.isArray(data.masteredWordIds) ? data.masteredWordIds : [];
    }
  } catch (error) {
    console.warn('Catatan Firestore: Pengambilan progres dari cloud:', error);
  }
  return null;
}
