import {createContext} from 'react';
import { useProvidePosts } from '../hooks/useProvidePost';

const initialState = {
    posts:[],
    loading:true,
    addPostToState:()=> {},
    addComment:()=> {}
}

export const postsContext = createContext(initialState);




const PostsProvider = ({children}) => {
    const posts = useProvidePosts();
    return (
        <postsContext.Provider value={posts}>
          {children}
        </postsContext.Provider>
    )
}

export default PostsProvider;