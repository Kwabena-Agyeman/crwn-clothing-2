import React, { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/Firebase/Firebase.utils';

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
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Display Name</label>
        <input
          type={'text'}
          name='displayName'
          value={displayName}
          onChange={(e) => handleChange(e)}
          required
        />

        <label>Email</label>
        <input
          type={'email'}
          name='email'
          value={email}
          onChange={(e) => handleChange(e)}
          required
        />

        <label>Password</label>
        <input
          type={'password'}
          name='password'
          value={password}
          onChange={(e) => handleChange(e)}
          required
        />

        <label>Confirm Password</label>
        <input
          type={'password'}
          name='confirmPassword'
          value={confirmPassword}
          onChange={(e) => handleChange(e)}
          required
        />

        <button type={'submit'}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
