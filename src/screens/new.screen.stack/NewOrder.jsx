import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import RenderItems from "../../components/new-order/RenderItems";
const NewOrder = ({ route, navigation }) => {
  const { schedule } = route.params;
  console.log("schedule", schedule);
  const customer = schedule?.customer;
  const items = schedule?.items || [];
  return (
    <View
      className={Platform.OS === "android" ? "p-1 flex-1 bg-white" : "pt-0"}
    >
      <View className="border-[1px] justify-between border-gray-300 p-1 max-h-[300px] h-[250px] w-full flex-row rounded-xl">
        <View className=" w-[64%] border-[1px] p-2 border-gray-300 rounded-lg items-center justify-center">
          <View className="w-[70px] h-[70px] rounded-full bg-gray-100 border-[1px] border-gray-300">
            <Image
              source={{
                uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
              }}
              className="w-full h-full rounded-full"
            />
          </View>
          <Text className="font-bold text-[18px]">
            {customer?.firstname || ""} {customer?.lastname || ""}
          </Text>
          <Text className="text-center font-semibold ">
            {customer?.address.street || ""}, {customer?.address.barangay || ""}
            , {customer?.address.municipal_city || ""}
          </Text>
          <View className="flex-row p-1 items-center justify-between w-full">
            <View className="items-center justify-center border-[1px] border-gray-300 p-2 rounded-md w-[49%]">
              <Text className="text-[12px]">Balance</Text>
              <Text className="font-bold text-[16px] text-red-600">- P 250</Text>
            </View>
            <View className="items-center justify-center border-[1px] border-gray-300 p-2 rounded-md w-[49%]">
              <Text className="text-[12px]">Placeholder</Text>
              <Text className="font-bold text-[16px] ">Data</Text>
            </View>
          </View>
        </View>
        <View className="w-[35%] justify-between rounded-lg ">
          <View className="h-[49%] w-full border-[1px] border-gray-300 rounded-xl items-center justify-center">
            <Text className="text-[12px]">Discount by</Text>
            <Text className="font-bold text-[16px] ">Every 10</Text>
          </View>
          <View className="h-[49%] w-full border-[1px] border-gray-300 rounded-xl items-center justify-center">
            <Text className="text-[12px]">Pricing by</Text>
            <Text className="font-bold text-[16px] ">regular</Text>
          </View>
        </View>
      </View>
      <View className="mt-2 border-[1px] border-gray-300 rounded-lg">
        <View className="flex-row items-center justify-between p-2  bg-gray-100 rounded-lg">
          <Text className="font-bold">Odered Items</Text>
          <TouchableOpacity className="bg-[#2389DA] p-1 rounded-xl">
            <Ionicons name="add" color="white" size={32} />
          </TouchableOpacity>
        </View>
        <View className="mt-1 p-1">
          {items.map((item, i) => (
            <RenderItems item={item} key={i} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default NewOrder;
