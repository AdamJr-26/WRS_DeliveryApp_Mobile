import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axios } from "../../services/api/axios";
import * as SecureStore from "expo-secure-store";
import React from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, sestUserProfile] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const userToken = await SecureStore.getItemAsync("userToken");
        const res = await axios.get("/api/delivery-personel/profile");
        console.log(res.data);
        const data = res.data?.data;
        if (data) {
          sestUserProfile(data);
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          setIsLoggedIn(null);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoggedIn(null);
        setIsLoading(false);
      }
    })();
  }, []);
  const login = async (payload) => {
    try {
      const res = await axios.post("/auth/login/personel", payload);
      // if success true
      // store in secure store the token
      const userToken = JSON.stringify(res.data?.token);
      await SecureStore.setItemAsync("userToken", userToken);
      setIsLoggedIn(true);
      return { success: true };

      // should based with response, after login call navigation to
      //  home page if user=null then display modal with message "login failed"
    } catch (error) {
      return { error };
    }
  };
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken"); 
      const res = await axios.get("/auth/logout/personel");
      console.log(res.data);
      setIsLoggedIn(null);
      return { success: true };
    } catch (error) {
      console.log("error logging out", error);
      return { error };
    }
  };

  const signUp = async (payload) => {
    console.log(payload);
    try {
      const res = await axios.post("/auth/register/personel", payload);
      return { res };
    } catch (error) {
      return { error };
    }
  };
  const verifyPersonel = async (payload) => {
    try {
      const res = await axios.post("/auth/verify/personel", payload);
      return { res };
    } catch (error) {
      return { error };
    }
  };
  const value = {
    login,
    logout,
    isLoading,
    isLoggedIn,
    userProfile,
    signUp,
    verifyPersonel,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
