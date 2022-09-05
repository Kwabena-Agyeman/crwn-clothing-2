import React from 'react';
import {
  signInWithGooglePopup,
  createUserDocumnetFromAuth,
} from '../../utils/Firebase/Firebase.utils';

const SignIn = () => {
  const loginGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumnetFromAuth(user);
  };

  return (
    <div>
      <h1>Signup page</h1>
      <button onClick={() => loginGoogleUser()}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
