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
        <View className="items-center justify-center">
          <Text className="text-[24px] font-bold text-[#2389DA] text-center">NEPTUNE</Text>
          <Text className="text-[16px] font-semibold text-gray-600 text-center mt-2">Water Refilling Station Management System</Text>
        </View>
        <ActivityIndicator size={60} color="#2389DA" />
      </View>
    );
  } else {
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
  }
};
export default ProtectRoutes;
