import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthStack from "../stacks/AuthStack";
import BottomTabNavigator from "../stacks/BottomTabNavigator";

const Main = () => {
  const isAuthenticated = false;
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <BottomTabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Main;

