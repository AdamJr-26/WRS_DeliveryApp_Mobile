import { View, Text, TextInput } from "react-native";
import React from "react";

const AuthEmailTextInput = ({ errors, label,placeholder, ...props }) => {
  return (
    <View className="flex-col gap-1 ">
      <Text className="font-bold text-gray-600">{label}</Text>
      <TextInput
        className="w-[100%] h-[60px] bg-gray-50 border-[1px] border-gray-300 rounded-md p-2 focus:border-[#2389DA] focus:border-[2px]"
        placeholder={placeholder}
        keyboardType="email-address"
        {...props}
      />
      {errors && <Text className="text-red-500 font-400 text-[10px] " >{errors}</Text>}
    </View>
  );
};

export default AuthEmailTextInput;
