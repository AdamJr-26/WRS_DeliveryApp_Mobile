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
import React, { useState, useEffect, useCallback } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const BeforeSubmit = ({
  setIsShow,
  isShow,
  handleSubmit,
  form,
  setPayment,
  orderToPay,
  customerBalance,
  isSubmitting,
  customer,
}) => {
  // get all totals
  const [total, setTotal] = useState();
  useEffect(() => {
    const t = {
      total_orders: "",
      returned: "",
      credited: "",
      ordered: "",
      borrowed: "",
      free: "",
      payable: "",
    };
    for (let i = 0; i < form.length; i++) {
      t.returned = Math.floor(Number(t.returned) + Number(form[i].return));
      t.borrowed = Math.floor(Number(t.borrowed) + Number(form[i].borrow));
      t.credited = Math.floor(Number(t.credited) + Number(form[i].credit));
      t.free = Math.floor(Number(t.free) + Number(form[i].free));
      t.total_orders = Math.floor(
        Number(t.total_orders) + Number(form[i].orders)
      );
      setTotal(t);
    }
  }, [form]);

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
        className="flex-1  h-full bg-white"
      >
        <View className="w-full items-center">
          <View className="relative bg-[#2389DA] h-[200px] w-full items-center justify-center">
            <TouchableOpacity
              onPress={() => setIsShow(!isShow)}
              className="absolute right-5 top-3"
            >
              <Ionicons name="close" size={42} color="white" />
            </TouchableOpacity>
            <View className="w-[70px] h-[70px] rounded-full bg-gray-100 border-[1px] border-gray-300">
              <Image
                source={{
                  uri: customer?.display_photo,
                }}
                className="w-full h-full rounded-full"
              />
            </View>
            <Text className="text-[24px] font-semibold text-gray-50">
              {customer?.firstname || ""} {customer?.lastname || ""}
            </Text>
            <Text className="text-[14px] text-gray-100 tracking-[1px]">
              {customer?.mobile_number || ""}
            </Text>
          </View>
          <View className="w-full ">
            <View className="flex-row py-3 px-2 items-center justify-between bg-[#EEEEEE] w-full ">
              <Text className="text-[16px] text-red-600">Balance to pay</Text>
              <Text className=" text-[19px] text-red-700 tracking-[1px] font-semibold">
                ₱ {customerBalance}
              </Text>
            </View>
          </View>
          <View className="w-full mt-2">
            <View className="flex-row py-5 px-2 items-center justify-between bg-[#EEEEEE] w-full ">
              <Text className="text-[16px] text-gray-600">Orders to pay</Text>
              <Text className=" text-[24px] text-gray-700 tracking-[1px] font-semibold">
                ₱ {orderToPay}
              </Text>
            </View>
          </View>
          <View className="w-full mt-2">
            <View className="flex-row py-2 px-2 items-center justify-between bg-[#EEEEEE] w-full ">
              <View className="w-[49%] items-center">
                <Text className="text-center text-[14px] text-gray-600 my-2">
                  Total account to settle
                </Text>
                <Text className="rounded-lg w-[150px] text-[24px] text-center">
                  ₱ {orderToPay + customerBalance}
                </Text>
              </View>
              <View className="w-[49%] items-center">
                <Text className="text-center text-[14px] text-gray-600 my-2">
                  Payment ₱
                </Text>
                <TextInput
                  className="bg-white rounded-lg h-[55px] w-[150px] text-[24px] text-center"
                  placeholder="₱"
                  keyboardType="numeric"
                  onChangeText={(value) => setPayment(value)}
                />
              </View>
            </View>
          </View>

          <View className="border-[1px] border-gray-200 p-4 bg-white  m-2 shadow-lg shadow-gray-400  w-full ">
            <Text className="text-[12px] font-normal">
              Note: If the customer wants to pay for today's orders, please
              enter
              <Text className="font-bold text-red-700"> {orderToPay} </Text>,
              but if the customer wants to settle all balances, including
              balances, please enter what is in "total acount to settle".
            </Text>
          </View>
          <View className="relative w-full mt-2 overflow-hidden  h-[450px] p-2 bg-[#EEEEEE] ">
            <Text className="font-semibold p-2 text-[16px]">Summary</Text>
            <View className="flex-row items-center justify-between p-3 mt-2 bg-white rounded-lg ">
              <Text className="text-[16px] ">Total of borrowed gallon(s)</Text>
              <Text className="text-[24px] font-bold text-gray-600">
                {total?.borrowed}
              </Text>
            </View>
            <View className="flex-row items-center justify-between p-3 mt-2 bg-white rounded-lg ">
              <Text className="text-[16px] ">Total of returned gallon(s)</Text>
              <Text className="text-[24px] font-bold text-gray-600">
                {total?.returned}
              </Text>
            </View>
            <View className="flex-row items-center justify-between p-3 mt-2 bg-white rounded-lg ">
              <Text className="text-[16px] ">Total of credited gallon(s)</Text>
              <Text className="text-[24px] font-bold text-gray-600">
                {total?.credited}
              </Text>
            </View>

            <View className="flex-row items-center justify-between p-3 mt-2 bg-white rounded-lg ">
              <Text className="text-[16px] ">Total of free gallon(s)</Text>
              <Text className="text-[24px] font-bold text-gray-600">
                {total?.free}
              </Text>
            </View>
            <View className="flex-row items-center justify-between p-3 mt-2 bg-white rounded-lg ">
              <Text className="text-[16px] ">Total of ordered gallon(s)</Text>
              <Text className="text-[24px] font-bold text-gray-600">
                {total?.total_orders}
              </Text>
            </View>
            <View className="absolute flex-row bottom-[-25px] left-0">
              <View className=" h-[50px] w-[50px] bg-white rotate-45 "></View>
              <View className=" h-[50px] w-[50px] bg-white rotate-45 "></View>
              <View className=" h-[50px] w-[50px] bg-white rotate-45 "></View>
              <View className=" h-[50px] w-[50px] bg-white rotate-45 "></View>
              <View className=" h-[50px] w-[50px] bg-white rotate-45 "></View>
              <View className=" h-[50px] w-[50px] bg-white rotate-45 "></View>
              <View className=" h-[50px] w-[50px] bg-white rotate-45 "></View>
              <View className=" h-[50px] w-[50px] bg-white rotate-45 "></View>
              <View className=" h-[50px] w-[50px] bg-white rotate-45 "></View>
            </View>
          </View>
          {/* 
          <View className="w-full p-2">
            <View className="flex-row">
              <View className="rounded-md border-[1px] h-[30px] w-[30px] justify-center items-center border-gray-300 ">
                <Ionicons name="checkmark" size={24} />
              </View>
              <Text className="ml-2">
                Do you want to include the uncovered items with the discounts
                for the next delivery?
              </Text>
            </View>
          </View> */}
          <View className="w-full p-3">
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#2389DA] flex-row h-[55px] rounded-xl items-center justify-center w-full"
            >
              {isSubmitting ? (
                <>
                  <ActivityIndicator size={34} color="white" />
                  <Text className="text-white font-semibold">
                    Submitting...
                  </Text>
                </>
              ) : (
                <Text className="ml-2 text-white font-semibold">Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default React.memo(BeforeSubmit);
