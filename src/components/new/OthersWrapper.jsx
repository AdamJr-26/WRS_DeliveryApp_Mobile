import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MatIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatcomIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NewExpenseModal from "./modal/NewExpenseModal";
const OthersWrapper = () => {
  const [newExpenseShow, setnewExpenseShow] = useState(false);
  return (
    <View>
      {/* modals */}
      <NewExpenseModal isShow={newExpenseShow} setIsShow={setnewExpenseShow} />
      <TouchableOpacity
        onPress={() => setnewExpenseShow(!newExpenseShow)}
        className="flex-row items-center justify-between px-2 py-4"
      >
        <View className="flex-row items-center">
          <View className="items-center justify-center bg-gray-100 p-3 rounded-xl">
            <MatcomIcons name="cash-minus" size={19} color="gray" />
          </View>
          <Text className="ml-4 font-bold ">New expense</Text>
        </View>
        <View className="items-center justify-center">
          <Ionicons name="chevron-forward-outline" size={24} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OthersWrapper;
