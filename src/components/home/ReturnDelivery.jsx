import {
  Modal,
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

const ReturnDelivery = ({ isShow, setIsShow, delivery_id }) => {
  console.log("[delivery_iddelivery_id]", delivery_id);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow);
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 h-full bg-white rounded-2xl"
      >
        <View
          style={{ height: windowHeight - 50 }}
          className="w-full flex-1 order-[1px] h-full bg-white mt-2 justify-between"
        >
          <View className="">
            <View className="items-center ">
              <Text className="text-center text-[24px] font-bold">
                Finish Delivery
              </Text>
              <Text className="font-semibold text-gray-500 text-center">
                You complete your delivery by creating a report. 
              </Text>
            </View>
            <View className="mt-10 p-2">
              <Text className="font-semibold">
                This is all your progress so far in this delivery.
              </Text>
            </View>
            <View className="flex-row  gap-x-2 items-center justify-around p-2">
              <View className="rounded-lg border-[1px] border-gray-300 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[32px] text-[#2389DA]">25</Text>
                <Text className="font-semibold text-gray-500">
                  Delivered Gallons
                </Text>
              </View>
              <View className="rounded-lg border-[1px] border-gray-300 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[32px] text-[#2389DA]">25</Text>
                <Text className="font-semibold text-gray-500">
                  Delivered schedules
                </Text>
              </View>
            </View>
            <View className="flex-row  gap-x-2 items-center justify-around p-2">
              <View className="rounded-lg border-[1px] border-gray-300 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[32px] text-[#2389DA]">25</Text>
                <Text className="font-semibold text-gray-500">
                  Borrowed Gallons
                </Text>
              </View>
              <View className="rounded-lg border-[1px] border-gray-300 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[32px] text-[#2389DA]">25</Text>
                <Text className="font-semibold text-gray-500">
                  Returned Gallons
                </Text>
              </View>
            </View>
            <View className="flex-row  gap-x-2 items-center justify-around p-2">
              <View className="rounded-lg border-[1px] border-gray-300 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[32px] text-[#2389DA]">25</Text>
                <Text className="font-semibold text-gray-500">
                  Total Debt payments
                </Text>
              </View>
              <View className="rounded-lg border-[1px] border-gray-300 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[32px] text-[#2389DA]">25</Text>
                <Text className="font-semibold text-gray-500">
                  Total Credited
                </Text>
              </View>
            </View>
          </View>
          <View className="p-2">
            <TouchableOpacity className="flex-row w-full bg-[#2389DA] p-2 h-[50px]  items-center justify-center rounded-full">
              <Text className="text-white font-bold ml-2">Finish</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row w-full border-[1px] border-[#2389DA] mt-2 p-2 h-[50px]  items-center justify-center rounded-full">
              <Text className="text-[#2389DA] font-bold ml-2">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ReturnDelivery;
