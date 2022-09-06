import React, { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/Firebase/Firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const SignUpForm = () => {
  const defualtFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [formFields, setFormFields] = useState(defualtFormFields);
  const { displayName, confirmPassword, email, password } = formFields;

  console.log(formFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      setFormFields(defualtFormFields);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use');
      }
      console.log('User creation encountered an error', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className='sign-up-container'>
      <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormInput
          label={'Display Name'}
          type={'text'}
          name='displayName'
          value={displayName}
          onChange={(e) => handleChange(e)}
          required
        />

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

        <FormInput
          label={'Confirm Password'}
          type={'password'}
          name='confirmPassword'
          value={confirmPassword}
          onChange={(e) => handleChange(e)}
          required
        />

        <Button type={'submit'}>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
