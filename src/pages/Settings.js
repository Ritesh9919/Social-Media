import { useState } from 'react';
import { useAuth } from '../hooks/useProvideAuth';
import styles from '../styles/settings.module.css';

function Settings() {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={styles.settings}>
      <div className={styles.avtarImg}>
        <img src="https://tse1.mm.bing.net/th?id=OIP.nczpMSa69aDJWYGi0tKqggHaHa&pid=Api&P=0&h=180" />
      </div>
      <div className={styles.fields}>
        <div className={styles.fieldLebel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      {editMode ? (
        <div className={styles.fields}>
          <div className={styles.fieldLebel}>Name</div>
          <input type="text" placeholder="Name" />
        </div>
      ) : (
        <div className={styles.fields}>
          <div className={styles.fieldLebel}>Name</div>
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        </div>
      )}

      <div className={styles.fields}>
        <div className={styles.fieldLebel}>Password</div>
        <input type="password" placeholder="Password" />
      </div>

      <div className={styles.fields}>
        <div className={styles.fieldLebel}>Confirm Password</div>
        <input type="password" placeholder="Confirm Password" />
      </div>

      <div className={styles.fields}>
        {editMode ?(
          <div className={styles.btnGroup}>
          <button>Save</button>
          <button onClick={()=> setEditMode(false)}>Go Back</button>
          </div>
        ):(
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
        
      </div>
    </div>
  );
}

export default Settings;
