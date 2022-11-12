import { createContext, useContext, useMemo, useState } from "react";
import { axios } from "../../services/api/axios";



const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const login = async (payload) => {
    try {
      const res = await axios.post("/auth/login/personel", payload);
      return { res };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (payload) => {
    console.log(payload)
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
  const user = false;
  const value = useMemo(
    () => ({ login, signUp, user, verifyPersonel }),
    ["async storage"]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
