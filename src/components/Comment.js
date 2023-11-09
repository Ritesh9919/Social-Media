import PropsTypes from 'prop-types';
import styles from '../styles/home.module.css';


function Comment({comment}) {
  
  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>{comment.createdAt}</span>
        <span className={styles.postCommentLikes}>{comment.likes.length}</span>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
}

Comment.prototype = {
  comment:PropsTypes.object.isRequired
}

export default Comment;
