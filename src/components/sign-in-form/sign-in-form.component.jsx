import React, { useState } from 'react';
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/Firebase/Firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in-form.styles.scss';

const defualtFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      setFormFields(defualtFormFields);
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          return alert('Incorrect email');
        case 'auth/user-not-found':
          return alert('No user associated with this email');
        default:
          return console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormInput
          label={'Email'}
          type={'email'}
          name='email'
          value={email}
          onChange={(e) => handleChange(e)}
          required
        />

        <FormInput
          label={'Password'}
          type={'password'}
          name='password'
          value={password}
          onChange={(e) => handleChange(e)}
          required
        />
        <div className='buttons-container'>
          <Button type={'submit'}>Sign In</Button>
          <Button
            type={'button'}
            onClick={() => signInWithGoogle()}
            buttonType='google'
          >
            Google Signin
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
