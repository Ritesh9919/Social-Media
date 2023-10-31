import { useContext, useState, useEffect } from 'react';
import { authContext } from '../context/authContext';
import { login as userLogin } from '../api';
import { LOCALSTORAGE_TOKEN_KEY, getItemFromLocalStorage, removeItemFromLocalStorage, setItemInLocalStorage } from '../utils';
import {jwtDecode} from 'jwt-decode';

export const useAuth = () => {
  return useContext(authContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(()=> {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if(userToken) {
      const user = jwtDecode(userToken);
      setUser(user);
    }
    setLoading(false);
  },[]);

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };
  return {
    user,
    loading,
    login,
    logout,
  };
};
