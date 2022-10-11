

import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { TextInput } from 'react-native-gesture-handler';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";

const RenderSortTableView = ({item, index}) => {
    const navigation = useNavigation();
  return (
    <View className="flex-col mt-2 p-3  bg-white rounded-xl shadow-xl ">
    <TouchableOpacity className="flex-row items-center  gap-3 relative ">
      <View className="w-[50px] h-[50px] rounded-full">
        <Image
          source={{
            uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
          }}
          className=" w-full h-full rounded-full "
        />
      </View>
      <View>
        <Text className="text-[19px] font-bold text-gray-700">
          {item.name}
        </Text>
        <Text className="text-[12px] font-semibold text-gray-600">
          {item.address}
        </Text>
        {/* <Text className="text-[12px] font-semibold text-gray-600">{item.}</Text> */}
      </View>
      <View className="absolute right-2">
        <Ionicons name="arrow-down-circle-sharp" size={25} color="gray" />
      </View>
    </TouchableOpacity>
    <View className="h-[2px] bg-gray-200 w-full mt-2"></View>
    {/* expandable */}
    <View className="p-3">
      <View className="flex-row items-center  ">
        <View className="p-2 bg-gray-200 rounded-full  ">
          <Ionicons name="call" size={16} />
        </View>
        <Text className="font-bold ml-2">{item.contact_number} </Text>
      </View>
      <View className="flex-col">
        <Text className="font-bold mt-3">Orders</Text>
        <View>
          <Text>Item 1</Text>
          <Text>Item 2</Text>
          <Text>Item 3</Text>
        </View>
      </View>
      <View className="flex-row mt-2 w-full">
        <Pressable className="bg-gray-200 px-4 py-2 rounded-full w-50">
          <Text className="text-gray-800 font-semibold ">Remove</Text>
        </Pressable>
        <Pressable
         onPress={() => {
            navigation.navigate("New", {
              screen: "Deliver Order",
              params: { user: "Adam Marcaida Jr." },
            });
          }}
          className="bg-[#2389DA] px-4 py-2 ml-2 rounded-full w-50"
        >
          <Text className="text-gray-100 font-semibold ">Deliver</Text>
        </Pressable>
        {/* <Button className="rounded-xl " title="Remove" />
        <Button className="rounded-xl " title="Deliver" /> */}
      </View>
    </View>
  </View>
  )
}

export default RenderSortTableView