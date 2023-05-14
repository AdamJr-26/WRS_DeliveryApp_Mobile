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
  const {
    data: gallons,
    error: gallonsError,
    mutate: mutateGallon,
  } = useFetch({
    url: "/api/gallons/availables",
  });

  useEffect(() => {
    mutateGallon();
  }, [isShow]);
  const gallon_data = gallons?.data;

  const addGallons = (gallon) => {
    console.log("gallongallongallon", gallon);
    dispatchSelectedGallons({
      type: "add",
      data: {
        _id: gallon?._id,
        name: gallon?.name,
        liter: gallon?.liter,
        gallon_image: gallon?.gallon_image,
        price: gallon?.price,
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
              Choose gallon
            </Text>

            <TouchableOpacity
              onPress={() => setIsShow(!isShow)}
              className="bg-gray-600 items-center justify-center px-7 rounded-full"
            >
              <Text className="font-bold text-white">Close</Text>
            </TouchableOpacity>
          </View>
          {/* <Text className="text-[12px] font-medium text-gray-600">Before selecting gallons, ensure that your chosen vehicle is already loaded. </Text> */}

          <ScrollView
            className=""
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row gap-x-5">
              {gallon_data?.map((gallon) => (
                <TouchableOpacity
                  key={gallon?._id}
                  className={
                    checkIfExisting(selectedGallons, gallon)
                      ? "h-[200px] relative border-[3px] border-blue-500 w-[150px] overflow-hidden rounded-xl bg-white shadow-xl shadow-gray-500 py-2 "
                      : "h-[200px] relative border-[1px] border-gray-200 w-[150px] overflow-hidden rounded-xl bg-white shadow-xl shadow-gray-500 py-2 "
                  }
                >
                  {/* <Text className="p-2 bg-gray-200 absolute rounded-xl font-bold right-1 top-2 z-10 opacity-70">
                    {gallon?.total}
                  </Text> */}
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
    <View className="h-[50px] w-[50px] flex-1 items-center justify-center absolute top-[50%] left-[45%] p-2 bg-white shadow-lg shadow-gray-200">
      <ActivityIndicator size={60} color="#2389DA" />
    </View>
  );
};

export default ChooseGallonModal;
