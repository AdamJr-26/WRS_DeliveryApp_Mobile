import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthLogin from "../screens/AuthLogin";
import AuthSignup from "../screens/AuthSignup";
import AuthSendOtp from "../screens/AuthSendOtp";
import AuthEnterOtp from "../screens/AuthEnterOtp";
import AuthNewPassword from "../screens/AuthNewPassword";

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
