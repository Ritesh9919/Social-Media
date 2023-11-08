import { useEffect, useState } from 'react';
import styles from '../styles/settings.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserInfo, removeFriend } from '../api';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils';
import { Loader } from '../components';
import { useAuth } from '../hooks/useProvideAuth';
import {addFriend} from '../api';

function UserProfile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  console.log(auth.user);
  

  useEffect(() => {
    async function fetchUser() {
      const response = await fetchUserInfo(userId);
      if (response.success) {
        console.log(response.data.user);
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
    const friends = auth.user.friends;
    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };


  const handleAddFriend = async()=> {
    setRequestInProgress(true);
    const response = await addFriend(userId);
    if(response.success) {
      const {friendship} = response.data;
      auth.updateUserFriend(true, friendship);
      setRequestInProgress(false);
      toast.success('Friend added successfull', toastConfig);
    }else {
       toast.error(response.message, toastConfig);
    }

    setRequestInProgress(false);
    
  }

  const handleRemoveFriend = async()=> {
    setRequestInProgress(true);
     const response = await removeFriend(userId);
     if(response.success) {
      const friedship = auth.user.friends.filter((friend)=> friend.to_user._id == userId);
      auth.updateUserFriend(false, friedship[0]);
      
     toast.success('Friend removed successfull', toastConfig);
     }else {
      toast.error(response.message, toastConfig);
     }
     setRequestInProgress(false);
    
  }

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
          <button onClick={handleRemoveFriend} disabled={requestInProgress}>{requestInProgress ? "Removing friend...":"Remove Friend"}</button>
        ) : (
          <button onClick={handleAddFriend} disabled={requestInProgress}>{requestInProgress ? "Adding Friend...":"Add Friend"}</button>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
