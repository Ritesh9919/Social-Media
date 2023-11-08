import { useEffect, useState } from 'react';
import styles from '../styles/home.module.css';
import { createPost } from '../api';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils';

function CreatePost() {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);

  

  async function handleAddPostClick() {
    setAddingPost(true);
    const response = await createPost(post);
    if(response.success) {
        setPost('');
        return toast.success('Post created successfully!', toastConfig);
    }else {
        return toast.error(response.message, toastConfig);
    }

    setAddingPost(false);
  }

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>
      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding Pos...' : 'Add Post'}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
