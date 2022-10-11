import {
  View,
  Text,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";


const OrderGallonInputCard = ({gallon}) => {
  return (
    <View
      key={gallon.id}
      className="mt-2 flex-col border-[1px] border-gray-300 rounded-xl "
    >
      <View className="p-2 flex-row items-center justify-between">
        <View className="flex-row">
          <View className="w-[50px] h-[50px] rounded-xl">
            <Image
              source={{
                uri: "https://picsum.photos/200",
              }}
              className=" w-full h-full rounded-xl "
            />
          </View>
          <View className="ml-2">
            <Text className="font-bold text-gray-600 ">{gallon.name}</Text>
            <Text className="text-gray-500">{gallon.volume} Liters</Text>
          </View>
        </View>
        <View>
          <Text className="text-gray-400 text-[12px] ">Price</Text>
          <Text className="text-gray-500 font-bold ">P 25</Text>
          <TextInput
            placeholder="0"
            className="font-bold text-red-500 flex-col items-center justify-center text-center border-b-[1px] border-b-gray-300"
            keyboardType="numeric"
            value={20}
          />
        </View>
      </View>
      {/* order detail */}
      <View className="flex-row">
        <View className="p-1 flex-grow flex-col justify-center items">
          <Text className="text-center text-[12px] font-semibold text-gray-500 ">
            Credited
          </Text>
          <TextInput
            placeholder="0"
            className="font-bold text-gray-800 text-[19px] flex-col items-center justify-center text-center border-b-[2px] mt-2 border-b-gray-300"
            keyboardType="numeric"
            value="15"
          />
        </View>
        <View className="p-1 flex-grow flex-col justify-center items ">
          <Text className="text-center text-[12px] font-semibold text-gray-500 ">
            Paid
          </Text>
          <TextInput
            placeholder="0"
            className="font-bold text-gray-800 text-[19px] flex-col items-center justify-center text-center border-b-[2px] mt-2 border-b-gray-300"
            keyboardType="numeric"
            value="0"
          />
        </View>
        <View className="p-1 flex-grow flex-col justify-center items">
          <Text className="text-center text-[12px] font-semibold text-gray-500 ">
            Borrowed GLN
          </Text>
          <TextInput
            placeholder="0"
            className="font-bold text-gray-800 text-[19px] flex-col items-center justify-center text-center border-b-[2px] mt-2 border-b-gray-300"
            keyboardType="numeric"
            value="15"
          />
        </View>
        <View className="p-1 flex-grow flex-col justify-center items">
          <Text className="text-center text-[12px] font-semibold text-gray-500 ">
            Returned GLN
          </Text>
          <TextInput
            placeholder="0"
            className="font-bold text-gray-800 text-[19px] flex-col items-center justify-center text-center border-b-[2px] mt-2 border-b-gray-300"
            keyboardType="numeric"
            value="15"
          />
        </View>
      </View>
      {/*  */}
    </View>
  );
};

export default OrderGallonInputCard;
