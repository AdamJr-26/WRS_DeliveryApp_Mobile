import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect, useState } from "react";
const StepVehicle = ({ vehiclesData, selectedVehicle, setSelectedVehicle }) => {
  return (
    <ScrollView className="py-2 gap-y-2 " showsVerticalScrollIndicator={false}>
      {vehiclesData?.data?.map((vehicle, i) => (
        <TouchableOpacity
          onPress={() =>
            setSelectedVehicle((prev) => {
              if (prev?._id === vehicle._id) {
                return null;
              } else return vehicle;
            })
          }
          key={i}
          className={`flex-row rounded-xl border-[2px] ${
            selectedVehicle?._id === vehicle?._id
              ? "border-[#2389DA]"
              : "border-gray-200"
          } overflow-hidden`}
        >
          <View className="bg-gray-200 flex items-center justify-center h-[120px] w-[120px]">
            <Image
              source={{
                uri: vehicle?.vehicle_image,
              }}
              className=" w-[100%] h-[100%]  "
            />
          </View>
          <View className="p-2 justify-around flex-1">
            <Text className="font-semibold text-[16px]">
              {vehicle?.vehicle_name}
            </Text>
            <View className="gap-y-1">
              <View className="flex-row justify-between">
                <Text className="text-[12px] text-gray-500">Plate number:</Text>
                <Text className="text-[12px] font-bold">
                  {" "}
                  {vehicle?.vehicle_id}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-[12px]  text-gray-500">Load limit:</Text>
                <Text className="text-[12px] font-bold">
                  {vehicle?.loadLimit}kg
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default StepVehicle;
