import { useEffect, useState } from 'react';
import {getPosts} from '../api';
import { Home } from '../pages';
import { Loder } from './Loder';


function App() {
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
  },[])

 if(loading) {
   return <Loder/>
 }

  return (
    <div className="App">
      
      <Home posts={posts}/>
    </div>
  );
}

export default App;
