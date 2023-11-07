import { useEffect, useState } from 'react';
import styles from '../styles/settings.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../api';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils';
import { Loader } from '../components';
import { useAuth } from '../hooks/useProvideAuth';

function UserProfile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  console.log(auth);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetchUserInfo(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.message, toastConfig);
        return navigate('/');
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  const checkIsUserIsFriend = () => {
    const friends = auth.user.friendships;
    const friendIds = friends.map((friend) => friend.to_user._id == userId);
    const index = friendIds.indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  if (loading) {
    return <Loader />;
  }

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
        {checkIsUserIsFriend() ? (
          <button>Remove Friend</button>
        ) : (
          <button>Add Friend</button>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
