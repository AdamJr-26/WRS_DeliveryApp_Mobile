import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

const AppTextInput = ({ label, value, setValue, placeholder, type }) => {
  return (
    <View className="bg-gray-100 relative px-2 border-b-gray-300 focus:border-b-blue-900 border-b-[1px] my-1 rounded-sm ">
      <Text className="absolute text-[12px] top-1 left-2 text-gray-600 font-semibold ">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        keyboardType={type}
        className="mt-5 font-bold h-[30px] text-gray-800"
        placeholder={placeholder}
      />
    </View>
  );
};

export default AppTextInput;
