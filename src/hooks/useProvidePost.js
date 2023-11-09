import { useContext, useEffect, useState } from 'react';
import { getPosts } from '../api';
import { postsContext } from '../context/postContext';

export const usePosts = () => {
  return useContext(postsContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const addPostToState = (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };


  const addComment = (comment, postId)=> {
    const newPost = posts.map((post)=> {
      if(post._id === postId) {
        return {...post, comments:[...post.comments, comment]}
      }
      return post;
    })
    setPosts(newPost);
  }

  return {
    data: posts,
    loading,
    addPostToState,
    addComment
  };
};
