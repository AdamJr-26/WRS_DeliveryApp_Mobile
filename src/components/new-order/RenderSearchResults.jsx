import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const RenderSearchResults = ({ name, address, imageLink }) => {
  return (
    <TouchableOpacity className="relative flex-row items-center p-2 bg-gray-100 mt-1 rounded-xl">
      <View className="w-[50px] h-[50px] rounded-md overflow-hidden">
        <Image
          source={{
            uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
          }}
          className=" w-full h-full "
        />
      </View>
      <View className="ml-2 overflow-hidden">
        <Text className="font-bold text-gray-600">{name}</Text>
        <Text className="flex-nowrap">{address}</Text>
      </View>
      <View className="absolute right-2">
        <Ionicons name="arrow-forward-circle" size={24} color="gray" />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(RenderSearchResults);
