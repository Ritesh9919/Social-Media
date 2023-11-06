import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import styles from '../styles/login.module.css';
import { useAuth } from '../hooks/useProvideAuth';
import {redirect,Navigate} from 'react-router-dom';
import { toastConfig } from '../utils/index';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    if (!email || !password) {
      return toast.error('Please enter both email and password', toastConfig);
    }

    const response = await auth.login(email, password);
    console.log(response);
    if (response.success) {
      redirect('/');
      return toast.success('Login Successfully!', toastConfig);
    } else {
      return toast.error(response.message, toastConfig);
    }
    setLoggingIn(false);
  };

  if(auth.user) {
   return <Navigate to={'/'}/>
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

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
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging In...' : 'Log In'}
        </button>
      </div>
    </form>
  );
}

export default Login;
