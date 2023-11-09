
import styles from '../styles/home.module.css';

import { Loader,FriendsList, CreatePost, Post} from '../components';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useProvideAuth';
import { usePosts } from '../hooks/useProvidePost';

function Home() {
  const posts = usePosts();
  const auth = useAuth();
  

  

  if(posts.loading) {
    return <Loader/>
  }

  return (
    <div className={styles.home}>
    <div className={styles.postsList}>
    <CreatePost/>
      {posts.data.map((post)=> 
      <Post post={post} key={`post-${post._id}`}/>
    
      )}
        
    </div>
    {auth.user && <FriendsList/>}
    </div>

  );
}



export default Home;
