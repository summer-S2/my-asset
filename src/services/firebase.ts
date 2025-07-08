import { FirebaseError, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// 구글로그인
export const googleLogin = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error as FirebaseError;
  }
};

// 이메일 로그인
export const emailLogin = async (email: string, pw: string): Promise<User> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, pw);
    return result.user;
  } catch (error) {
    throw error as FirebaseError;
  }
};

// 로그아웃
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error as FirebaseError;
  }
};

// 사용자 상태 변경
export const onUserStateChange = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, (user) => callback(user));
};
