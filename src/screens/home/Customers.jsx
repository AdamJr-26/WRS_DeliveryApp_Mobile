import { View, Text } from 'react-native'
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const Customers = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  // #2389DA
  return (
    <View className={Platform.OS === "android" ? "pt-5" : "pt-0"}>
      <Text>Customers</Text>
    </View>
  )
}

export default Customers