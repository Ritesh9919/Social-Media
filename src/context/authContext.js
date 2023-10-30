import {createContext} from 'react';

const initialValue = {
    user:null,
    login:()=> {},
    logout:()=> {},
    loading:true
}
export const authContext = createContext(initialValue);




const AuthProvider = ({children}) => {
    const auth = usePrivideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;