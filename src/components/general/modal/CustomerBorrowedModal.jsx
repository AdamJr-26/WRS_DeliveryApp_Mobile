import {
  Modal,
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import useFetch from "../../../hooks/api/swr/useFetch";
import { apiGet } from "../../../services/api/axios.method";
import ReturnGallonModal from "../MicroModal/ReturnGallonModal";
const CustomerBorrowedModal = ({
  isShow,
  setIsShow,
  customer,
  mutateBorrowed,
}) => {
  const [borrowed, setBorrowed] = useState();

  async function getBorrowed() {
    if (!customer || !isShow) return;
    const { data, error } = await apiGet(
      `/api/borrowed/gallons/${customer?._id}`
    );
    console.log("[DATAAAAAAAAAAA]", data);
    if (data?.data) {
      setBorrowed(data?.data);
    } else {
      console.log("ERRRRRRRRRRRRRROR", error);
    }
  }
  useEffect(() => {
    getBorrowed();
    if (mutateBorrowed) {
      mutateBorrowed();
    }
  }, [customer, isShow]);

  // return gallon modal
  // pay gallon by gallon
  const [isShowReturnGallon, setIsShowReturnGallon] = useState(false);
  const [selectBorrow, setSelectBorrow] = useState();
  const toggleReturnGallon = (borrow) => {
    setSelectBorrow(borrow);
    setIsShowReturnGallon(!isShowReturnGallon);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow);
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 h-full bg-[#F0F0F0]"
      >
        <ReturnGallonModal
          isShow={isShowReturnGallon}
          setIsShow={setIsShowReturnGallon}
          borrow={selectBorrow}
          get_borrowed={getBorrowed}
        />
        <View className="w-full h-full items-center bg-[#2389DA]">
          <View className="relative  h-[200px] w-full items-center justify-center">
            <TouchableOpacity
              onPress={() => setIsShow(!isShow)}
              className="absolute right-5 top-3"
            >
              <Ionicons name="close" size={42} color="white" />
            </TouchableOpacity>
            <View className="w-[70px] h-[70px] rounded-full bg-gray-200 border-[1px] border-gray-300">
              <Image
                source={{
                  uri: customer?.display_photo,
                }}
                className="w-full h-full rounded-full"
              />
            </View>
            <Text className="text-[19px] font-semibold text-gray-100">
              {customer?.firstname} {customer?.lastname}
            </Text>
            <Text className="text-[14px] text-gray-100 tracking-[1px]">
              {customer?.mobile_number}
            </Text>
          </View>
          <View className="w-full  h-full flex-1 rounded-t-2xl p-2 bg-[#F0F0F0]">
            <TouchableOpacity className="whitespace-nowrap">
              <Text className="font-bold py-2 text-[#2389DA] border-b-[4px] border-[#2389DA]  w-[80px]">
                Borrowed
              </Text>
            </TouchableOpacity>

            <View className="h-full flex-1 justify-between min-h-[340px]">
              <ScrollView className="mt-2">
                {borrowed?.map((borrow, i) => (
                  <TouchableOpacity
                    onPress={() => toggleReturnGallon(borrow)}
                    key={i}
                    className="mt-2 flex-row w-full justify-between rounded-xl h-[80px] items-center p-2 bg-white shadow-lg shadow-gray-100 "
                  >
                    <View className="flex-row  items-center">
                      <View className="w-[50px] h-[50px] rounded-xl bg-gray-200 border-[1px] border-gray-300 items-center justify-center">
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
                    <View className="flex-row mx-3">
                      <View className="ml-4">
                        <Text className="text-[#2389DA] font-bold text-[24px] text-center">
                          {borrow?.total}
                        </Text>
                        <Text className="font-semibold text-[12px] text-gray-500">
                          Quantity
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default React.memo(CustomerBorrowedModal);
