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
import useFetch from "../../hooks/api/swr/useFetch";

const ChooseVehicleModal = ({ setIsShow, isShow, setSelectedVehicle }) => {
  const { data, error } = useFetch({
    url: "/api/vehicles",
  });
  const vehicles = data?.data;

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
              Choose Vehicle
            </Text>
            <View className="flex-row gap-x-5">
              {vehicles?.map((vehicle) => (
                <TouchableOpacity
                  key={vehicle?._id}
                  className="h-[200px] relative border-[1px] border-gray-200 w-[150px] overflow-hidden rounded-xl bg-white shadow-2xl shadow-gray-500 "
                >
                  <Pressable onPress={() => setSelectedVehicle(vehicle)}>
                    <Image
                      source={{
                        uri: vehicle?.vehicle_image,
                      }}
                      className=" w-[100%] h-[70%]  "
                    />
                    <View>
                      <Text className="text-center py-1 w-full font-bold text-gray-800">
                        {vehicle?.vehicle_name}
                      </Text>
                      <Text className="text-center py-1 w-full font-bold text-gray-400 text-[16px]">
                        {vehicle?.vehicle_id}
                      </Text>
                    </View>
                  </Pressable>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ChooseVehicleModal;
