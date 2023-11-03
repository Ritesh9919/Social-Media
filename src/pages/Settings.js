import { useState } from 'react';
import { useAuth } from '../hooks/useProvideAuth';
import styles from '../styles/settings.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { toastConfig } from '../utils/index';

function Settings() {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);

  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const updateProfile = async () => {
    setSavingForm(true);
    if (!name || !password || !confirmPassword) {
      return toast.error('Please provide all the fields', toastConfig);
    }

    if (password !== confirmPassword) {
      return toast.error(
        'Password and Confirm password does not match',
        toastConfig
      );
    }

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );
    console.log('setting', response);
    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearForm();
      return toast.success('User updated successfull!', toastConfig);
    } else {
      return toast.error(response.message, toastConfig);
    }

    setSavingForm(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.avtarImg}>
        <img src="https://tse1.mm.bing.net/th?id=OIP.nczpMSa69aDJWYGi0tKqggHaHa&pid=Api&P=0&h=180" />
      </div>
      <div className={styles.fields}>
        <div className={styles.fieldLebel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.fields}>
        <div className={styles.fieldLebel}>Name</div>
        {editMode ? (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.fields}>
            <div className={styles.fieldLebel}>Password</div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.fields}>
            <div className={styles.fieldLebel}>Confirm Password</div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.fields}>
        {editMode ? (
          <div className={styles.btnGroup}>
            <button onClick={updateProfile}>
              {savingForm ? 'Saving Profile...' : 'Save Profile'}
            </button>
            <button onClick={() => setEditMode(false)}>Go Back</button>
          </div>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
}

export default Settings;
