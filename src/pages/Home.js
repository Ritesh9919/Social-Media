import propTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getPosts } from '../api';
import styles from '../styles/home.module.css';
import Comment from '../components/Comment';
import { Loader } from '../components/Loader';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    async function fetchPosts() {
     const response = await getPosts();
     if(response.success) {
      setPosts(response.data.posts);
     }
      setLoading(false);
    }
    fetchPosts();
  },[]);


  if(loading) {
    return <Loader/>
  }

  return (
    <div className={styles.postsList}>
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
                  <span className={styles.postAuthor}>{post.user.name}</span>
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
                  <span>5</span>
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
  );
}

Home.propTypes = {
  posts:propTypes.array.isRequired
}

export default Home;
