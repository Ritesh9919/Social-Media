import { useContext, useState, useEffect } from 'react';
import { authContext } from '../context/authContext';
import { login as userLogin, signup as userSignup, editProfile, fetchUserFriends } from '../api';
import { LOCALSTORAGE_TOKEN_KEY, getItemFromLocalStorage, removeItemFromLocalStorage, setItemInLocalStorage } from '../utils';
import {jwtDecode} from 'jwt-decode';
import {toast} from 'react-toastify';
import {toastConfig} from '../utils/index';


export const useAuth = () => {
  return useContext(authContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  


  useEffect(()=> {
    const getUser = async()=> {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if(userToken) {
      const user = jwtDecode(userToken);
      const response = await fetchUserFriends();
      let friends = [];
      if(response.success) {
        console.log(response.data.friends)
        friends = response.data.friends;
      }
      setUser({
        ...user,
        friends
      });
    }
    setLoading(false);
  }
  getUser()
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


  const signup = async(name, email, password, confirmPassword)=> {
    const response = await userSignup(name, email, password, confirmPassword);
    if(response.success) {
      return {
        success:true
      }
    }else {
      return {
        success:false,
        message:response.message
      }
    }
  }


  const updateUser = async(userId, name, password, confirmPassword)=> {
     const response = await editProfile(userId, name, password, confirmPassword);
     console.log("hook", response);
     if(response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token:null)

      return {
        success:true
      }
     }else {
      return {
        success:false,
        message:response.message
      }
     }
  }

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    return toast.success('Logout successfully!', toastConfig);
    

  };

  const updateUserFriend = (addFriend, friend)=> {
    if(addFriend) {
      setUser({
        ...user,
        friend:[...user.friends, friend]
      })
    }
    const newFriend = user.friends.filter((f)=> f.to_user._id !== friend.to_user._id);
    setUser({
      ...user,
      friends:newFriend
    })
  }

  return {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    updateUserFriend
  };
};
