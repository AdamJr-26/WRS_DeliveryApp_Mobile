import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { TextInput } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";

const RenderSortTableView = ({ schedule, index, marked_place }) => {
  const navigation = useNavigation();
  const customer = schedule?.customer;
  return (
    <View className="flex-col mt-2 p-3  bg-white rounded-xl shadow-xl ">
      <TouchableOpacity
        className={
          customer?.address?.barangay === marked_place?.place
            ? "flex-row h-[75px] items-center  relative bg-blue-200 w-full rounded-lg"
            : "flex-row h-[75px] items-center  relative w-full"
        }
      >
        <View className="ml-2 w-[50px] bg-gray-200 h-[50px] rounded-full ">
          <Image
            source={{
              uri: customer?.display_photo,
            }}
            className=" w-full h-full rounded-full "
          />
        </View>
        <View className="ml-2">
          <Text className="text-[19px] font-bold text-gray-700 ">
            {customer.firstname || " "} {customer?.lastname || " "}
          </Text>
          <Text className="text-[12px] font-semibold text-gray-600">
            {customer.address.street}, {customer.address.barangay},{" "}
            {customer.address.municipal_city}
          </Text>
          {/* <Text className="text-[12px] font-semibold text-gray-600">{item.}</Text> */}
        </View>
        {/* <View className="absolute right-2">
          <Ionicons name="arrow-down-circle-sharp" size={25} color="gray" />
        </View> */}
      </TouchableOpacity>
      <View className="h-[2px] bg-gray-200 w-full mt-2"></View>
      {/* expandable */}
      <View className="p-3">
        <View className="flex-row items-center  ">
          <View className="p-2 bg-gray-200 rounded-full  ">
            <Ionicons name="call" size={16} />
          </View>
          <Text className="font-bold ml-2">{customer.mobile_number} </Text>
        </View>
        <View className="flex-col">
          <Text className="font-bold mt-3">Orders</Text>
          {schedule?.items?.map((item, i) => (
            <View
              key={i}
              className="flex-row justify-between p-2 mt-1 items-center rounded-md bg-gray-100"
            >
              <Text className="font-semibold">{item?.gallon?.name}</Text>
              <Text className="font-bold text-[16px]">{item?.total}</Text>
            </View>
          ))}
        </View>
        <View className="flex-row mt-2 w-full">
          <Pressable className="bg-gray-200 px-4 py-2 rounded-full w-50">
            <Text className="text-gray-800 font-semibold ">Remove</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("New", {
                screen: "New Order",
                params: { schedule: schedule },
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
  );
};

export default RenderSortTableView;
