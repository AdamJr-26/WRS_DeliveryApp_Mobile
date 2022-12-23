import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const AppButton = ({ isLoading, text, ...props }) => {
  return (
    <TouchableOpacity {...props} className="h-[60px] bg-[#2389DA] rounded-xl flex items-center justify-center">
      {
        isLoading ? <ActivityIndicator /> :<Text className="text-white font-bold ">{text}</Text>
      }
      
    </TouchableOpacity>
  );
};

export default AppButton;
    