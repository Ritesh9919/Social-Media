import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {getPosts} from '../api';
import { Home, Login } from '../pages';
import { Loader } from './Loader';
import Navbar from './Navbar';






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
   return <Loader/>
 }

  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home posts={posts} />}/>
        <Route path="/login" element={<Login />}/>
        

      </Routes>
      </Router>

      
    </div>
  );
}

export default App;
