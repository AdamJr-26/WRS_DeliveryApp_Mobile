import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Dimensions,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";

import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const WrsInfo = ({ isShow, setIsShow, wrs_info }) => {
  console.log("wrs_info_rendering..", wrs_info);
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow);
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="p-2 flex-1 h-full bg-slate-50"
      >
        <View className="relative ">
          <TouchableOpacity onPress={() => setIsShow(!isShow)}>
            <Ionicons name="chevron-back" size={32} />
            {/* chevron-down-sharp */}
          </TouchableOpacity>
          <TouchableOpacity className="absolute left-[45%] ">
            <Text className="font-bold text-[16px] top-1">WRS Info</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row bg-white p-2  rounded-2xl items-center ">
          <View className=" w-[100px] h-[100px] bg-gray-200 items-center justify-ceter rounded-full border-[2px] border-gray-200 overflow-hidden">
            <Image
              source={{ uri: wrs_info?.display_photo }}
              className="h-full w-full  "
            />
          </View>
          <View className="ml-2">
            <Text className="text-[24px] font-bold text-gray-700">
              {wrs_info?.wrs_name}
            </Text>
            <Text className="font-semibold text-[16px] text-gray-600">
              {`${wrs_info?.address?.street_building || ""} ${
                wrs_info?.address?.barangay || ""
              } ${wrs_info?.address?.city || ""} ${
                wrs_info?.address?.province || ""
              }`}
            </Text>
          </View>
        </View>
        <View className="p-2 rounded-xl bg-white flex-row gap-x-2">
          <TouchableOpacity className="bg-gray-200 rounded-lg items-center p-3">
            <Text className="font-semibold text-gray-700">Switch WRS</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#2389DA]  rounded-lg items-center p-3">
            <Text className="font-semibold text-white">Notify</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default React.memo(WrsInfo);
