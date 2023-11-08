import {useContext, useEffect, useState} from 'react';
import { getPosts } from '../api';
import { postsContext } from '../context/postContext';


export const usePosts = ()=> {
    return useContext(postsContext);
 }

export const useProvidePosts = ()=> {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    


    useEffect(()=> {
        const fetchPosts = async()=> {
            const response = await getPosts();
            if(response.success) {
              setPosts(response.data.posts);
              console.log("posts", posts);
        
            }
            setLoading(false);
          }
          fetchPosts();
    },[]);


    const addPostToState = ()=> {

    }

    
    return {
       posts,
       loading,
       addPostToState
    }


}


