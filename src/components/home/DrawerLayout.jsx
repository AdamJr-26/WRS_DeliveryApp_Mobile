import { View, Text } from "react-native";
import React from "react";

const DrawerLayout = () => {
  return (
    <View
      className={Platform.OS === "android" ? "pt-8  flex-1" : "pt-0 flex-1"}
    >
      <Text>DrawerLayout</Text>
    </View>
  );
};

export default DrawerLayout;
