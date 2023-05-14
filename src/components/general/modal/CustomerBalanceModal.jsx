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
import PayCreditByGallon from "../MicroModal/PayCreditByGallon";

const CustomerBalanceModal = ({
  isShow,
  setIsShow,
  customer,
  mutateBalance,
}) => {
  const [totalBalance, setTotalBalance] = useState();
  const [balance, setBalance] = useState();

  async function getBalance() {
    if (!customer || !isShow) return;
    // console.log("customerrrrrrrrrrrrrr", customer?._id);
    const { data, error } = await apiGet(`/api/all/credits/${customer?._id}`);
    if (data?.data) {
      console.log("data.data", data?.data);
      setBalance(data?.data);
      let total = 0;
      for (let i = 0; i < data?.data?.length; i++) {
        const per_gallon = data?.data[i]?.price * data?.data[i]?.total;
        total = total + per_gallon;
      }
      setTotalBalance(total);
    } else {
      console.log("error-------------", error);
    }
  }
  useEffect(() => {
    getBalance();
    if (mutateBalance()) {
      mutateBalance();
    }
  }, [customer, isShow]);

  // pay credit by gallon
  const [isShowPayCredit, setIsShowPayCredit] = useState(false);
  const [selectCredit, setSelectCredit] = useState();
  const togglePayCredit = (credit) => {
    setSelectCredit(credit);
    setIsShowPayCredit(!isShowPayCredit);
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
        {/* MODAL */}
        <PayCreditByGallon
          isShow={isShowPayCredit}
          setIsShow={setIsShowPayCredit}
          credit={selectCredit}
          get_balance={getBalance}
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
                Credits
              </Text>
            </TouchableOpacity>

            <View className="h-full flex-1 justify-between min-h-[340px]">
              <ScrollView className="mt-2">
                {balance?.map((credit, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => togglePayCredit(credit)}
                    className="mt-2 flex-row w-full justify-between rounded-xl h-[80px] items-center p-2 bg-white shadow-lg shadow-gray-100 "
                  >
                    <View className="flex-row  items-center">
                      <View className="w-[50px] h-[50px] rounded-xl bg-gray-200 border-[1px] border-gray-300 items-center justify-center">
                        <Image
                          source={{
                            uri: credit?.gallon?.gallon_image,
                          }}
                          className="w-full h-full rounded-full"
                        />
                      </View>
                      <View className="ml-4">
                        <Text className="text-[16px] font-bold text-gray-700">
                          {credit?.gallon?.name}
                        </Text>
                        <Text className="text-gray-500 font-semibold">
                          Liter(s) {credit?.gallon?.liter}
                        </Text>
                      </View>
                    </View>
                    <View className="flex flex-row ">
                      <View className="ml-4">
                        <Text className="text-[#2389DA] font-bold text-[24px] text-center">
                          {credit?.total}
                        </Text>
                        <Text className="font-semibold text-[12px] text-gray-500">
                          Quantity
                        </Text>
                      </View>
                      <View className="ml-4">
                        <Text className="text-[#2389DA] font-bold text-[24px] text-center">
                          {credit?.price}
                        </Text>
                        <Text className="font-semibold text-[12px] text-gray-500">
                          Price
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {/* <View className="border-[1px] border-gray-200 flex-row justify-between items-center h-[60px] bg-gray-50  rounded-xl ">
                <Text className="font-semibold text-[16px] p-2">
                  Total To pay
                </Text>
                <Text className="bg-gray-600 h-full text-center w-[100px] p-5 rounded-2xl text-white font-bold">
                  ₱ {totalBalance}
                </Text>
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default React.memo(CustomerBalanceModal);
