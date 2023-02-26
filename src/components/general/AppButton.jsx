import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const AppButton = ({ isLoading, text, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      className="flex-row  bg-[#2389DA] p-2 h-[50px]  items-center justify-center rounded-full"
    >
      {isLoading ? (
        <ActivityIndicator size={34} color="white" />
      ) : (
        <Text className="text-white font-bold ">{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
