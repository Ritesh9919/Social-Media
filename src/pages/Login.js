import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import styles from '../styles/login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggingIn(true);
    if (!email || !password) {
      return toast.error('Please enter both email and password', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

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

      <div className={styles.field} aria-disabled={loggingIn}>
        <button>{loggingIn ? 'Logging In...' : 'Log In'}</button>
      </div>
    </form>
  );
}

export default Login;
