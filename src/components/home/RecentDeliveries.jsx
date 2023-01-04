import { View, Text } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
const RecentDeliveries = () => {
  return (
    <View
      className={`ml-2 h-[150px] w-[150px] p-2 rounded-xl bg-blue-50 justify-around`}
    >
      <View className="p-2 h-[32px] w-[32px] bg-white rounded-full">
        <MatIcons name="truck-delivery" size={16} color="#2389DA" />
      </View>
      <View className="relative overflow-hidden whitespace-nowrap">
        <Text className="text-[50px] font-bold text-[#2389DA] whitespace-nowrap">
          50
        </Text>
        <Text className="absolute bottom-2 right-0 text-[#2389DA] text-[10px] font-semibold p-1 bg-white rounded-full">
          GALLONS
        </Text>
      </View>
      <View className="flex-row ">
        <Text className="text-gray-700 font-semibold ">Profit</Text>
        <Text className="text-[#2389DA] ml-2 font-bold">P 1500</Text>
      </View>
    </View>
  );
};

export default RecentDeliveries;
