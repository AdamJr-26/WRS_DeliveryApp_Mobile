import {
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { apiPut } from "../../../services/api/axios.method";

const ReturnGallonModal = ({ isShow, setIsShow, borrow, get_borrowed }) => {
  console.log("gallon", borrow);

  const [gallonToReturn, setGallonToReturn] = useState(0);
  useEffect(() => {
    setGallonToReturn(borrow?.total);
  }, [borrow]);

  //   handle submition of return
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  async function handleReturnGallon() {
    if (isSubmitting || !gallonToReturn) return;
    setIsSubmitting(true);
    const { data, error } = await apiPut({
      url: `/api/borrow/return/${borrow?._id}`,
      payload: {
        gallonToReturn,
      },
    });
    if (data && !error) {
      setIsShow(false);
      ToastAndroid.show("Return gallon successfully", ToastAndroid.LONG);
      get_borrowed();
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      get_borrowed();
      ToastAndroid.show(
        "Return gallon failed, please try again.",
        ToastAndroid.LONG
      );
    }
  }
  return (
    <Modal
      isVisible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow);
      }}
    >
      <View className="bg-slate-100 rounded-lg p-2 shadow-sm flex ">
        <View className="my-2 items-center ">
          <Text className="text-[24px] text-center font-semibold text-gray-600">
            Return Gallon
          </Text>
        </View>
        <View className="flex-row mt-2">
          <View className="w-[50px] h-[50px] rounded-xl bg-gray-200 border-[1px] border-gray-300 items-center ">
            <Image
              source={{
                uri: borrow?.gallon?.gallon_image,
              }}
              className="w-full h-full rounded-full"
            />
          </View>
          <View className="ml-4">
            <Text className="text-[16px] font-bold text-gray-700">
              {borrow?.gallon?.name}
            </Text>
            <Text className="text-gray-500 font-semibold">
              Liter(s) {borrow?.gallon?.liter}
            </Text>
          </View>
        </View>
        <View className="flex-row mt-2 w-full">
          <View className=" mt-2 w-full">
            <Text className="font-semibold text-gray-600">Returned gallon</Text>
            <TextInput
              value={`${gallonToReturn}`}
              className="w-[100%] text-center font-bold mt-2 text-[16px] bg-gray-50 h-[60px] border-[1px] border-gray-300 rounded-md p-2 focus:border-[#2389DA] focus:border-[2px]"
              keyboardType="numeric"
              onChangeText={(value) => setGallonToReturn(value)}
            />
          </View>
        </View>
        <View className="p-2 mt-2 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => setIsShow(false)}
            className="flex-row w-[49%] border-[1px] border-[#2389DA]  p-2 h-[50px]  items-center justify-center rounded-full"
          >
            <Text className="text-[#2389DA] font-bold ml-2">Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleReturnGallon()}
            className="flex-row w-[49%] bg-[#2389DA] p-2 h-[50px]  items-center justify-center rounded-full"
          >
            {isSubmitting ? (
              <ActivityIndicator size={34} color="white" />
            ) : (
              <Text className="text-white font-bold ml-2">Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReturnGallonModal;
