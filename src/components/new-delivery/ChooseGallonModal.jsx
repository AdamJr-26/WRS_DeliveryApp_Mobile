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
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
// swr
import useGallons from "../../hooks/api/swr/useGallons";
import useSWR, { useSWRConfig } from "swr";
import * as SecureStore from "expo-secure-store";


const ChooseGallonModal = ({ setIsShow, isShow }) => {

  const { gallons, gallonsError } = useGallons({
    url: "/api/gallons",});
  const { mutate } = useSWRConfig();
  useEffect(() => {
    mutate("/api/gallons");
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow);
      }}
    >
      <ScrollView
        className=""
        horizontal={true}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 flex-col justify-between ">
          <View className=" h-auto flex-1">
            <Pressable
              className="h-full"
              onPress={() => setIsShow(!isShow)}
            ></Pressable>
          </View>
          <View className=" bg-white h-200 p-5 flex gap-y-2">
            <Text className="font-bold text-gray-700 text-[24px]">
              Choose vehicle
            </Text>
            <View className="flex-row gap-x-5">
              {[1, 2, 3, 4].map((item) => (
                <TouchableOpacity
                  key={item}
                  className="h-[200px] relative border-[1px] border-gray-200 w-[150px] overflow-hidden rounded-xl bg-white shadow-2xl shadow-gray-500 "
                >
                  <Image
                    source={{
                      uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
                    }}
                    className=" w-[100%] h-[70%]  "
                  />
                  <View>
                    <Text className="text-center py-1 w-full font-bold text-gray-800">
                      GALLON 1
                    </Text>
                    <Text className="text-center py-1 w-full font-bold text-gray-400 text-[16px]">
                      25 liter(s)
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ChooseGallonModal;
