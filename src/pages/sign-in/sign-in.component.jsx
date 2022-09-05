import React, { useEffect } from 'react';
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/Firebase/Firebase.utils';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  const loginGooglePopup = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Signup page</h1>
      <button onClick={() => loginGooglePopup()}>Sign in with Google</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
