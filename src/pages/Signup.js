import { useState } from 'react';
import { Navigate, redirect } from 'react-router-dom';
import styles from '../styles/login.module.css';
import { useAuth } from '../hooks/useProvideAuth';
import { ToastContainer, toast } from 'react-toastify';
import {toastConfig} from '../utils/index';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupIn, setSignupIn] = useState(false);
  

  const auth = useAuth();
  console.log(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupIn(true);
    if (!name || !email || !password || !confirmPassword) {
      return toast.error('Please enter all fields', toastConfig);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      redirect('/login');
      return toast.success('signup Successfully!', toastConfig);
    } else {
      return toast.error(response.message, toastConfig);
    }
    setSignupIn(false);
  };

  if(auth.user) {
    return <Navigate to={"/"}/>
   }
 

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Register</span>

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Conform Paasword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={signupIn}>
          {signupIn ? 'Signning In...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
}

export default Signup;
