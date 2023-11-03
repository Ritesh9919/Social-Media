import styles from '../styles/settings.module.css';

function Settings() {
 return (
    <div className={styles.settings}>
        <div className={styles.avtarImg}>
            <img src="https://tse1.mm.bing.net/th?id=OIP.nczpMSa69aDJWYGi0tKqggHaHa&pid=Api&P=0&h=180"/>
        </div>
      <div className={styles.fields}>
        <div className={styles.fieldLebel}>Email</div>
        <div className={styles.fieldValue}>Email</div>
      </div>

      <div className={styles.fields}>
        <div className={styles.fieldLebel}>Name</div>
        <div className={styles.fieldValue}>Ritesh</div>
      </div>

      <div className={styles.fields}>
        <div className={styles.fieldLebel}>Password</div>
        <input type="password" placeholder='Password'/>
      </div>

      <div className={styles.fields}>
        <div className={styles.fieldLebel}>Confirm Password</div>
        <input type="password" placeholder='Confirm Password'/> 
      </div>

      <div className={styles.fields}>
        <button>Edit Profile</button>
      </div>
    </div>
 )
}


export default Settings;