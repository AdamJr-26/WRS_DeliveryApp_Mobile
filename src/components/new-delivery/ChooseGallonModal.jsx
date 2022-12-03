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
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
// swr

import useSWR, { useSWRConfig } from "swr";
import useFetch from "../../hooks/api/swr/useFetch";
const ChooseGallonModal = ({
  setIsShow,
  isShow,
  selectedGallons,
  dispatchSelectedGallons,
}) => {
  const { data: gallons, error: gallonsError } = useFetch({
    url: "/api/gallons",
  });
  const { mutate } = useSWRConfig();
  const gallon_data = gallons?.data;

  const addGallons = (gallon) => {
    dispatchSelectedGallons({
      type: "add",
      data: {
        id: gallon?._id,
        gallon_name: gallon?.name,
        liter: gallon?.liter,
        gallon_image: gallon?.gallon_image,
      },
    });
  };
  const checkIfExisting = (selectedGallons, gallon) => {
    for (let i = 0; i < selectedGallons.length; i++) {
      if (selectedGallons[i]?.id === gallon?._id) {
        return true;
      } else {
        return false;
      }
    }
  };

  return gallons && !gallonsError ? (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow);
      }}
    >
      <View className="flex-1 flex-col justify-between ">
        <View className=" h-auto flex-1">
          <Pressable
            className="h-full"
            onPress={() => setIsShow(!isShow)}
          ></Pressable>
        </View>
        <View className=" bg-white h-200 p-5 flex gap-y-2">
          <View className="flex-row justify-between">
            <Text className="font-bold text-gray-700 text-[24px]">
              Choose vehicle
            </Text>
            <TouchableOpacity className="bg-[#2389DA] items-center justify-center px-7 rounded-full">
              <Pressable>
                <Text className="font-bold text-white">Use</Text>
              </Pressable>
            </TouchableOpacity>
          </View>
          <ScrollView
            className=""
            horizontal={true}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-row gap-x-5">
              {gallon_data?.map((gallon) => (
                <TouchableOpacity
                  key={gallon?._id}
                  className={
                    checkIfExisting(selectedGallons, gallon)
                      ? "h-[200px] relative border-[3px] border-blue-500 w-[150px] overflow-hidden rounded-xl bg-white shadow-2xl shadow-gray-500 py-2 "
                      : "h-[200px] relative border-[1px] border-gray-200 w-[150px] overflow-hidden rounded-xl bg-white shadow-2xl shadow-gray-500 py-2 "
                  }
                >
                  <Pressable
                    onPress={() => {
                      addGallons(gallon);
                    }}
                  >
                    <Image
                      source={{
                        uri: gallon?.gallon_image,
                      }}
                      className=" w-[100%] h-[70%]  "
                    />
                    <View>
                      <Text className="whitespace-nowrap text-center py-1 w-full font-bold text-gray-800 overflow-hidden">
                        {gallon?.name}
                      </Text>
                      <Text className="text-center py-1 w-full font-semibold text-gray-500 text-[14px]">
                        {gallon?.liter} liter(s)
                      </Text>
                    </View>
                  </Pressable>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  ) : (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={60} color="#2389DA" />
    </View>
  );
};

export default ChooseGallonModal;
