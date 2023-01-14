import { View, Text } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
const RecentDeliveries = ({ data }) => {
  console.log("daaaaaaaaaada", data);
  return (
    <View
      className={`ml-2 h-[150px] w-[220px] p-2 rounded-xl bg-blue-50 justify-around border-[1px] border-blue-100`}
    >
      <View className="p-2 h-[32px] w-[32px] bg-white rounded-full">
        <MatIcons name="truck-delivery" size={16} color="#2389DA" />
      </View>
      <View className="relative overflow-hidden whitespace-nowrap">
        <Text className="text-[50px] font-bold text-[#2389DA] whitespace-nowrap">
          {data?.total_orders + data?.total_free || 0}
        </Text>
        <Text className="absolute bottom-2 right-0 text-[#2389DA] text-[12px] font-semibold p-1 bg-white rounded-full">
          Deliverd gallons
        </Text>
      </View>
      <View className="flex-row items-center ">
        <Text className="text-gray-600 text-[12px] font-semibold ">
          Payment received
        </Text>
        <Text className="text-[#2389DA] text-[16px] ml-2 font-bold">
          ₱ {data?.total_of_all_payment}
        </Text>
      </View>
    </View>
  );
};

export default RecentDeliveries;
