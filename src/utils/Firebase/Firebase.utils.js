import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAN8YwZY2r3k9pgIfENurO1sxUKnt-BrBA',
  authDomain: 'crwn-clothing-db-c0c94.firebaseapp.com',
  projectId: 'crwn-clothing-db-c0c94',
  storageBucket: 'crwn-clothing-db-c0c94.appspot.com',
  messagingSenderId: '707546973288',
  appId: '1:707546973288:web:458b4266a2f2773b35a7dd',
  measurementId: 'G-5EBHK05N8N',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google Auth
const Googleprovider = new GoogleAuthProvider();
Googleprovider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const db = getFirestore();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, Googleprovider);

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListenrer = (callback) =>
  onAuthStateChanged(auth, callback);
