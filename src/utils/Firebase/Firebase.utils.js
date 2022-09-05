import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumnetFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;
};
