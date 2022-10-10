import { View, Text, TextInput } from "react-native";
import React from "react";
import MatIcons from "react-native-vector-icons/MaterialIcons";
import MatComIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AuthTextInput = ({
  label,
  iconName,
  placeholder,
  value,
  setValue,
  type,
  isSecure,
}) => {
  return (
    <View className="relative flex-row items-center justify-between  py-3 w-full  ">
      <View classNam="bg-gray-200 py-2">
        <MatComIcons name={iconName} color="gray" size={25} />
      </View>
      <TextInput
        secureTextEntry={isSecure}
        value={value}
        onChangeText={setValue}
        keyboardType={type}
        className="ml-3 py-3 border-b-[1px] border-b-gray-300 font-bold w-full  h-full text-gray-800"
        placeholder={placeholder}
      />
      {isSecure & type==="password" ? (
        <View classNam="bg-gray-200 py-2 right-[4px] absolute ">
          <MatComIcons name="eye-outline" color="gray" size={25} />
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

export default AuthTextInput;
