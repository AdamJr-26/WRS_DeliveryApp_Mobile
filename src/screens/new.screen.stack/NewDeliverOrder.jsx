import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Button,
  Pressable,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleIcons from "react-native-vector-icons/SimpleLineIcons";

import { SafeAreaView } from "react-native-safe-area-context";

const NewDeliverOrder = ({ navigation }) => {
  const getVH = Dimensions.get("window").height;
  const getVW = Dimensions.get("window").width;

  return (
    <View className="flex-1 p-2 overflow-hidden ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="rounded-lg overflow-hidden relative"
      >
        <View className="border-[1px] border-gray-300 bg-white p-2 flex-row items-center rounded-xl overflow-hidden shadow-2xl shadow-gray-400 mt-2">
          <View className="flex-row items-center justify-center w-[50px] h-[50px] ">
            <Image
              source={{
                uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
              }}
              className=" w-full h-full rounded-xl "
            />
          </View>
          {/*  */}
          <View className="flex-col gap-1 ml-2">
            <Text className="font-bold text-gray-600 text-[19px]">
              Juan Dela Cruz
            </Text>
            <Text className="text-gray-500 font-semibold ">
              #434 Mahogany st. Bunsuran 1st
            </Text>
            <View className="bg-yellow-600 rounded-full overflow-hidden">
              <Text className=" w-auto text-center text-gray-50 font-semibold text-[12px]">
                regular
              </Text>
            </View>
          </View>
        </View>
        {/*  */}
        <View className="border-[1px] border-gray-300 bg-white w-full mt-1 rounded-xl shadow-sm shadow-gray-900">
          <View className=" right-2  flex-col justify-center items-center p-2  rounded-lg">
            <Text className="font-bold text-gray-500 text-[10px]">Balance</Text>
            <Text className="font-bold mt-1 ">-P 200.00</Text>
          </View>
        </View>

        {/*  */}

        <View className="mt-2 rounded-xl shadow-xlr shadow-gray-900 p-2 bg-white overflow-hidden">
          <Text className="font-bold text-gray-600 ">Orders</Text>
          {/* items */}

          {[1, 2, 3].map((item) => (
            <View
              key={item}
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
                    <Text className="font-bold text-gray-600 ">
                      Imperial Gallon
                    </Text>
                    <Text className="text-gray-500">25 liters</Text>
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
          ))}
        </View>
        {/* total */}
        <View className="bg-white p-2 mt-2 rounded-xl flex-row justify-between">
          <View className="flex-col items-center justify-center ">
            <Text className="text-[12px]  font-bold text-gray-500 ">Total Items</Text>
            <Text className="font-bold ">45</Text>
          </View>
          <View className="flex-col items-center justify-center ">
            <Text className="text-[12px]  font-bold text-gray-500">Total to pay</Text>
            <Text className="font-bold  text-red-600 ">-P 200.00</Text>
            <Text  className="font-bold text-[19px] text-blue-700">P 1, 125</Text>
          </View>
        </View>
        <View className="bg-white p-2 rounded-xl mt-2">
            <Pressable className="flex-row items-center justify-center bg-blue-800 h-[50px] rounded-xl">
                <Text className="text-white font-bold">Submit</Text>
            </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewDeliverOrder;
