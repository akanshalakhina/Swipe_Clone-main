import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export const setupRecaptcha = (containerId) => {
  // Clear any existing reCAPTCHA verifier
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (e) {
      // ignore clear errors
    }
    window.recaptchaVerifier = null;
  }

  // Remove any leftover reCAPTCHA DOM elements
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
  }

  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    'callback': (response) => {
      console.log('reCAPTCHA solved successfully');
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expired');
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear() } catch(e) {}
        window.recaptchaVerifier = null;
      }
    }
  });

  return window.recaptchaVerifier;
};
