import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import AuthLogin from "../screens/auth/login/AuthLogin";
import AuthSignup from "../screens/auth/signup/AuthSignup";
import AuthSendOtp from "../screens/auth/reset-password/AuthSendOtp";
import AuthEnterOtp from "../screens/auth/reset-password/AuthEnterOtp";
import AuthNewPassword from "../screens/auth/reset-password/AuthNewPassword";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={AuthLogin} />
      <Stack.Screen name="Signup" component={AuthSignup} />
      <Stack.Screen name="forgot password" component={AuthSendOtp} />
      <Stack.Screen name="enter otp" component={AuthEnterOtp} />
      <Stack.Screen name="new password" component={AuthNewPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
