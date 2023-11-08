import propTypes from 'prop-types';
import styles from '../styles/home.module.css';
import Comment from '../components/Comment';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useProvideAuth';
import { FriendsList, CreatePost } from '../components';
import { usePosts } from '../hooks/useProvidePost';

function Home() {
  const post = usePosts();
  const {posts, loading} = post.posts;
  const auth = useAuth();

  

  if(loading) {
    return <Loader/>
  }

  return (
    <div className={styles.home}>
    <div className={styles.postsList}>
    <CreatePost/>
      {posts.map((post) => {
        return (
          <div className={styles.postWrapper} key={`Post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.nczpMSa69aDJWYGi0tKqggHaHa&pid=Api&P=0&h=180"
                  alt="user-pic"
                />
                <div>
                  <Link to={`/user/${post.user._id}`} state={{user:post.user}} className={styles.postAuthor}>{post.user.name}</Link>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>
              <div className={styles.postContent}>{post.content}</div>

              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src="https://tse4.mm.bing.net/th?id=OIP.zTVUIBtLwKLi0dr0P9R72QHaEK&pid=Api&P=0&h=180"
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.oipJb6VjlZMUUUoppZucBwHaHa&pid=Api&P=0&h=180"
                    alt="comments-icon"
                  />
                  <span>2</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>

              <div className={styles.postCommentsList}>
                {post.comments.map((comment)=> {
                  <Comment comment={comment}/>
                })}
                
              </div>
            </div>
          </div>
        );
      })}
    </div>
    {auth.user && <FriendsList/>}
    </div>

  );
}

Home.propTypes = {
  posts:propTypes.array.isRequired
}

export default Home;
