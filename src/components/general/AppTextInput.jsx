import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

const AppTextInput = ({ errors, label, placeholder, ...props }) => {
  return (
    <View className="flex-col gap-1 mt-2">
      <Text className="font-bold text-gray-600">{label}</Text>
      <TextInput
        autoCapitalize="none"
        className="w-[100%] bg-gray-50 h-[60px] border-[1px] border-gray-300 rounded-md p-2 focus:border-[#2389DA] focus:border-[2px]"
        placeholder={placeholder}
        // keyboardType="default"
        {...props}
      />
      {errors && (
        <Text className="text-red-500 font-400 text-[10px] ">{errors}</Text>
      )}
    </View>
  );
};

export default AppTextInput;
