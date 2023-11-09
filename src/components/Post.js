import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import {Comment} from '../components';
import { usePosts } from '../hooks/useProvidePost';
import { createComment } from '../api';
import { useState } from 'react';
import {toast} from 'react-toastify';
import { toastConfig } from '../utils';



function Post({post}) {
    const posts = usePosts();
    const [comment, setComment] = useState('');
    const [creatingComment, setCreatingComment] = useState(false);

      console.log("********", post.comments);
     const handleAddComment = async(e)=> {
       
        if(e.key === 'Enter') {
            setCreatingComment(true);
            const response = await createComment(comment, post._id);
            if(response.success) {
                setComment('');
                posts.addComment(response.data.comment, post._id);
                toast.success('Comment created successfully!', toastConfig);
            }else {
                toast.error(response.message, toastConfig);
            }
        }
        setCreatingComment(false);
     }

  return (
    <div className={styles.postWrapper} key={`Post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.nczpMSa69aDJWYGi0tKqggHaHa&pid=Api&P=0&h=180"
            alt="user-pic"
          />
          <div>
            <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>
              {post.user.name}
            </Link>
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
          <input 
          placeholder="Start typing a comment"
          value={comment}
          onChange={(e)=> setComment(e.target.value)}
          onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment)=> {
            return <Comment comment={comment} key={`post-comment-${comment._id}`}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
