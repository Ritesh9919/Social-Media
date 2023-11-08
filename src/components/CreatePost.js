import { useState } from 'react';
import styles from '../styles/home.module.css';
import { func } from 'prop-types';

function CreatePost() {
    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);

    function handleAddPostClick() {

    }

  return (
    <div className={styles.createPost}>
      <textarea className={styles.addPost} value={post} onChange={(e)=> setPost(e.target.value)}></textarea>
      <div>
        <button className={styles.addPostBtn} onClick={handleAddPostClick} disabled={addingPost}>{addingPost ? "Adding Pos...":"Add Post"}</button>
      </div>
    </div>
  );
}

export default CreatePost;
