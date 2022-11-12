import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const AppButton = ({ text, ...props }) => {
  return (
    <TouchableOpacity {...props} className="h-[50px] bg-[#2389DA] rounded-xl flex items-center justify-center">
      <Text className="text-white font-bold ">{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
    