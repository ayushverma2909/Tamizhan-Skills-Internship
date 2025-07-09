import { useState } from 'react';
import supabase from '../../supabaseClient';
import styles from '../assets/Signup.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async e => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { email, password, username } = formData;

    
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const user = data.user;

    
    if (user) {
      const { error: dbError } = await supabase
        .from('users')
        .insert([{ id: user.id, username }]);

      if (dbError) {
        setError('Signup succeeded but failed to save username: ' + dbError.message);
      } else {
        setMessage('Signup successful! Please verify your email.');
      }
    } else {
      setError('Signup successful, but user object not returned.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className={styles.form}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Signup;
