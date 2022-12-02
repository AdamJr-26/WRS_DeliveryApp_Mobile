import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/index";
import AuthStack from "../../stacks/AuthStack";
import HomeStack from "../../stacks/HomeStack";

import { View, Text, ActivityIndicator } from "react-native";
import GetstartedStack from "../../stacks/GetstartedStack";
const ProtectRoutes = () => {
  const { isLoading, isLoggedIn, user } = useAuth();
  if (isLoading && !isLoggedIn) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={60} color="#2389DA" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isLoggedIn === null ? (
          <AuthStack />
        ) : user?.admin ? (
          <HomeStack />
        ) : (
          <GetstartedStack />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default ProtectRoutes;
