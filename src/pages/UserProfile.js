import styles from '../styles/settings.module.css';
import {useLocation} from 'react-router-dom';

function UserProfile() {
    const location = useLocation();
    console.log(location);
    const {user = {}} = location.state;


  return (
    <div className={styles.settings}>
      <div className={styles.avtarImg}>
        <img src="https://tse1.mm.bing.net/th?id=OIP.nczpMSa69aDJWYGi0tKqggHaHa&pid=Api&P=0&h=180" />
      </div>
      <div className={styles.fields}>
        <div className={styles.fieldLebel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>
       <div className={styles.fields}>
       <div className={styles.fieldLebel}>Name</div>
       <div className={styles.fieldValue}>{user?.name}</div>
       </div>
     

      <div className={styles.btnGroup}>
        <button>Add Friend</button>
        <button>Remove Friend</button>
      </div>
    </div>
  );
}

export default UserProfile;
