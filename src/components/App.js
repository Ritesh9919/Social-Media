import { useEffect, useState } from 'react';
import {getPosts} from '../api';
import { Home } from '../pages';


function App() {
  const [posts, setPosts] = useState([]);
  useEffect(()=> {
    async function fetchPosts() {
     const response = await getPosts();
     const data = response.data.posts;
    setPosts(data);
    }
    fetchPosts();
  },[])
  return (
    <div className="App">
      
      <Home/>
    </div>
  );
}

export default App;
