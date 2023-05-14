import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MatIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatcomIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NewExpenseModal from "./modal/NewExpenseModal";
import SellGallonModal from "./modal/SellGallonModal";
import { useNavigation } from "@react-navigation/native";
const OthersWrapper = () => {
  const [newExpenseShow, setnewExpenseShow] = useState(false);
  const [sellGallonShow, setSellGallonShow] = useState(false);
  const navigation = useNavigation();
  return (
    <View>
      {/* modals */}
      <NewExpenseModal isShow={newExpenseShow} setIsShow={setnewExpenseShow} />
      <SellGallonModal isShow={sellGallonShow} setIsShow={setSellGallonShow} />
      <TouchableOpacity
        onPress={() => setnewExpenseShow(!newExpenseShow)}
        className="flex-row items-center justify-between px-2 py-4"
      >
        <View className="flex-row items-center">
          <View className="items-center justify-center bg-gray-100 p-3 rounded-xl">
            <MatcomIcons name="cash-minus" size={24} color="gray" />
          </View>
          <Text className="ml-4 font-bold ">New expense</Text>
        </View>
        <View className="items-center justify-center">
          <Ionicons name="chevron-forward-outline" size={24} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSellGallonShow(!sellGallonShow)}
        className="flex-row items-center justify-between px-2 py-4"
      >
        <View className="flex-row items-center">
          <View className="items-center justify-center bg-gray-100 p-3 rounded-xl">
            <MatcomIcons name="cash-plus" size={24} color="gray" />
          </View>
          <Text className="ml-4 font-bold ">Sell gallon(s)</Text>
        </View>
        <View className="items-center justify-center">
          <Ionicons name="chevron-forward-outline" size={24} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Deliver Order", { walkIn: true })}
        className="flex-row items-center justify-between px-2 py-4"
      >
        <View className="flex-row items-center">
          <View className="items-center justify-center bg-gray-100 p-3 rounded-xl">
            <MatcomIcons name="walk" size={24} color="gray" />
          </View>
          <Text className="ml-4 font-bold ">Walk-in purchase</Text>
        </View>
        <View className="items-center justify-center">
          <Ionicons name="chevron-forward-outline" size={24} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OthersWrapper;
