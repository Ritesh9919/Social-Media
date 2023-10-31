import {createContext} from 'react';
import { useProvideAuth } from '../hooks/useProvideAuth';

const initialValue = {
    user:null,
    login:()=> {},
    logout:()=> {},
    signup:()=>{},
    loading:true
}
export const authContext = createContext(initialValue);




const AuthProvider = ({children}) => {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;