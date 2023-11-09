import styles from '../styles/home.module.css';
import { useAuth } from '../hooks/useProvideAuth';
import { Link } from 'react-router-dom';

function FriendsList() {
  const auth = useAuth();
  const { friends = [] } = auth.user;
  console.log("****f", friends);
  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>
      {friends && friends.length == 0 && (
        <div className={styles.noFriends}>No friend found</div>
      )}
      {friends &&
        friends.map((friend) => {
          return (
            <div key={`friend-${friend._id}`}>
              <Link className={styles.friendsItem} to={`/user/${friend.to_user._id}`}>
                <div className={styles.friendsImg}>
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.nczpMSa69aDJWYGi0tKqggHaHa&pid=Api&P=0&h=180"
                    alt=""
                  />
                </div>
                <div className={styles.friendsName}>{friend.to_user.email}</div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default FriendsList;
