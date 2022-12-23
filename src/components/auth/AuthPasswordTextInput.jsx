import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

const AuthPasswordTextInput = ({ errors,placeholder, label, ...props }) => {
  const [show, setShow] = React.useState(true);
  React.useEffect(() => {
    if (show) {
      setTimeout(() => setShow(!show), 3000);
    }
  }, [show]);
  return (
    <View className="flex-col gap-1 w-full">
      <Text className="font-bold text-gray-600">{label}</Text>
      <View
        className=" bg-gray-50 flex-row items-center content-between h-[60px] w-full border-[1px] border-gray-300 rounded-md
        focus:border-[#2389DA] focus:border-[2px] p-2"
      >
        <TextInput
          placeholder={placeholder}
          className="flex-1 "
          secureTextEntry={!show}
          {...props}
        />
        {show ? (
          <Ionicons
            onPress={() => setShow(!show)}
            name="eye"
            className="flex-1"
            size={24}
            color="gray"
          />
        ) : (
          <Ionicons
            onPress={() => setShow(!show)}
            name="eye-off"
            className="flex-1"
            size={24}
            color="gray"
          />
        )}
      </View>
      {errors && (
        <Text className="text-red-500 font-400 text-[10px] ">{errors}</Text>
      )}
    </View>
  );
};

export default AuthPasswordTextInput;
