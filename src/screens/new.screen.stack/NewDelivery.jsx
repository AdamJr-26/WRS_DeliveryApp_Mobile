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

import SimpleIcons from "react-native-vector-icons/SimpleLineIcons";
import heroes from "../../../assets/hero";
import { SafeAreaView } from "react-native-safe-area-context";
import gallons from "../../../assets/gallon";
import ChooseVehicleModal from "../../components/new-delivery/ChooseVehicleModal";
import ChooseGallonModal from "../../components/new-delivery/ChooseGallonModal";


const ActionNewDelivery = ({ navigation }) => {
  const [selectVehicleModal, setSelectVehicleModal] = useState(false);
  const [selectGallonModal, setSelectGallonModal] = useState(false);
  const getVH = Dimensions.get("window").height;
  const getVW = Dimensions.get("window").width;

  useEffect(() => {
    navigation.setOptions({
      tabBar: {
        visible: false,
      },
    });
  }, []);

  return (
    <SafeAreaView className="m-1 bg-gray-50 p-2 flex-1 ">
      <ScrollView>
        {/* MODALS  */}
        <ChooseVehicleModal
          setIsShow={setSelectVehicleModal}
          isShow={selectVehicleModal}
        />
        <ChooseGallonModal
          isShow={selectGallonModal}
          setIsShow={setSelectGallonModal}
        />

        {/* gallons  */}
        <View className="flex-row items-center justify-around w-full ">
          <View className=" h-[140px] w-[100px]">
            <TouchableOpacity
              onPress={() => setSelectVehicleModal(!selectVehicleModal)}
              className="items-center justify-center border-[1px] border-gray-200 overflow-hidden shadow-xl shadow-gray-200 bg-white h-[100px] w-[100px] rounded-xl"
            >
              <MatComIcon name="truck-outline" size={50} color="#2389DA" />
              {/* <Image
                source={{
                  uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
                }}
                className=" w-full h-full rounded-xl "
              /> */}
            </TouchableOpacity>
            <Text className="text-center text-gray-600 text-[12px] mt-1 font-semibold">
              Select vehicle
            </Text>
          </View>
          <View className=" h-[140px] w-[100px]">
            <TouchableOpacity
              onPress={() => setSelectGallonModal(!selectGallonModal)}
              className="items-center justify-center border-[1px] border-gray-200 overflow-hidden shadow-xl shadow-gray-200 bg-white h-[100px] w-[100px] rounded-xl"
            >
              <View className="relative w-full h-full items-center justify-center">
                <Image
                  source={gallons?.slim_gallon}
                  className=" w-[60%] h-[60%] rounded-xl "
                />
                <View className="absolute">
                  <MatComIcon name="plus" size={32} color="white" />
                </View>
              </View>
            </TouchableOpacity>
            <Text className="text-center text-gray-600 text-[12px] mt-1 font-semibold">
              Select gallon
            </Text>
          </View>
        </View>

        <View className="mt-2 flex-row items-center">
          <Text className="text-gray-700 font-bold">Selected Gallons</Text>
        </View>
        <View className="">
          <View className="flex-col p-2 ">
            {[1, 2].map((item, i) => (
              <View
                key={i}
                className="relative bg-white shadow-lg shadow-gray-400 h-[80px] flex-row items-center justify-between border-[1px] border-gray-200 rounded-lg py-2 my-1"
              >
                <View className="absolute top-[-5px] right-[-5px] bg-gray-500 rounded-full"></View>
                <View className="flex-row items-center justify-center">
                  <View className="ml-2 w-[50px] h-[50px] p-1">
                    <Image
                      source={{
                        uri: "https://picsum.photos/200",
                      }}
                      className="h-full w-full rounded-lg "
                    />
                  </View>
                  <View className="flex-col justify-center ml-2">
                    <Text className="text-gray-700 font-semibold text-[19px]">
                      Imperial Gallon
                    </Text>
                    <Text>25 Liters</Text>
                  </View>
                </View>
                <View className=" h-full flex-col justify-center items-center px-3 absolute right-0 ">
                  {/* <Text className="text-[8px] font-semibold w-full ">PCS</Text> */}
                  <TextInput
                    className="bg-gray-200 rounded-lg text-center py-2 text-[24px] max-[70px] w-[70px] h-full"
                    keyboardType="numeric"
                    placeholder="0"
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity className="py-3 bg-blue-900 flex-row justify-center items-center rounded-xl">
        <Text className="text-center text-gray-50">Create</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ActionNewDelivery;
