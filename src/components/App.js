import { useEffect, useState } from 'react';
import {getPosts} from '../api';
import { Home } from '../pages';


function App() {
  const [posts, setPosts] = useState([]);
  useEffect(()=> {
    async function fetchPosts() {
     const response = await getPosts();
    setPosts(response.data.posts);
    }
    fetchPosts();
  },[])
  return (
    <div className="App">
      
      <Home posts={posts}/>
    </div>
  );
}

export default App;
