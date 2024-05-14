import React, { useState } from 'react';
import { auth } from '../bd/firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmailAndPassword = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('User signed in:', user);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signInWithEmailAndPassword}>Sign In</button>
    </div>
  );
}

export default Login;
