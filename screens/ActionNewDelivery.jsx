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
const ActionNewDelivery = ({ navigation }) => {
  const [selectVehicleModal, setSelectVehicleModal] = useState(false);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="font-bold text-gray-700">Select Vehicle</Text>
        <TouchableOpacity
          className="w-full p-3 border-[1px] border-gray-300 rounded-xl mt-2"
          onPress={() => setSelectVehicleModal(!selectVehicleModal)}
        >
          <Text className="font-regular">Tricycle #yfuy33</Text>
        </TouchableOpacity>

        {/* modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectVehicleModal}
          onRequestClose={() => {
            setSelectVehicleModal(!selectVehicleModal);
          }}
        >
          <View
            className="w-ful bg-gray-50 p-2 mt-20 shadow-gray-800 shadow-lg "
            style={{
              height: getVH,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 20,
            }}
          >
            <View className="w-full flex-row justify-end px-2">
              <Pressable
                className="bg-gray-200 rounded-full p-1"
                onPress={() => setSelectVehicleModal(!selectVehicleModal)}
              >
                <Ionicons name="close" size={30} />
              </Pressable>
            </View>
            <View className="p-2">
              <Text className="text-gray-700 font-semibold">
                Available Vehicle
              </Text>
            </View>
            <View>
              {[
                "Tricycle #k3ji2j3",
                "Tricycle #k3ji2j3",
                "Tricycle #k3ji2j3",
                "Tricycle #k3ji2j3",
                "Tricycle #k3ji2j3",
              ].map((item, i) => (
                <TouchableOpacity
                  key={i}
                  className="px-2 py-3 border-[1px] border-gray-200 bg-gray-100 m-1 rounded-md"
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        {/* gallons  */}
        <View className="mt-2 flex-row items-center">
          <Text className="text-gray-700 font-bold">Gallons</Text>
          <View className='bg-gray-200 rounded-full mr-3 ml-4'>
            <SimpleIcons name="plus" size={25} color="#2389DA" />
          </View>
        </View>

        <View className="">
          <View className="flex-col p-2 ">
            {[1, 2].map((item, i) => (
              <TouchableOpacity
                key={i}
                className="relative h-[80px] flex-row items-center justify-between border-[1px] border-gray-200 rounded-lg py-2 my-1"
              >
                <View className="absolute top-[-5px] right-[-5px] bg-red-500 rounded-full"  >
                  <Ionicons name="close" size={20} color="white" />
                </View>
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
              </TouchableOpacity>
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
