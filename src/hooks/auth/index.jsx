import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosAPI from "../../services/api/axios";
import * as SecureStore from "expo-secure-store";
import React from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  const revalidateUser = async () => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");
      console.log("[REVALIDATE USER ] userToken", userToken);
      const res = await axiosAPI().get("/api/delivery-personel/profile");
      const data = res.data?.data;
      console.log("data", res.data);
      if (data) {
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(data);
      } else {
        await SecureStore.deleteItemAsync("userToken");
        setIsLoggedIn(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("errrr", JSON.stringify(error));
      await SecureStore.deleteItemAsync("userToken");
      setIsLoggedIn(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    revalidateUser();
  }, []);

  const login = async (payload) => {
    try {
      const res = await axiosAPI().post("/auth/login/personel", payload);
      // if success true
      // store in secure store the token
      const userToken = res.data?.data?.token;
      await SecureStore.setItemAsync("userToken", userToken);

      // // update header: authorizaton
      // axiosAPI().defaults.headers.common['Authorization'] = userToken;

      // revalidate the user as much as possible ahha
      revalidateUser();
      return { success: true };
    } catch (error) {
      return { error };
    }
  };
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      // const res = await axiosAPI().get("/auth/logout/personel");
      setIsLoggedIn(null);
      return { success: true };
    } catch (error) {
      console.log("error logging out", error);
      return { error };
    }
  };

  const signUp = async (payload) => {
    try {
      const res = await axiosAPI().post("/auth/register/personel", payload);
      return { res };
    } catch (error) {
      return { error };
    }
  };
  const verifyPersonel = async (payload) => {
    try {
      const res = await axiosAPI().post("/auth/verify/personel", payload);
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
    user,
    signUp,
    verifyPersonel,
    revalidateUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
