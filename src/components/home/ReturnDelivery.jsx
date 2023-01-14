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
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { apiGet, apiPut } from "../../services/api/axios.method";
import PromptModal from "../general/modal/PromptModal";
import { useSWRConfig } from "swr";

const ReturnDelivery = ({ isShow, setIsShow, delivery_id }) => {
  console.log("[delivery_iddelivery_id]", delivery_id);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const [summary, setSummary] = useState();
  const { mutate } = useSWRConfig();
  useEffect(() => {
    async function getSummary() {
      if (!delivery_id || !isShow) return;
      const { data, error } = await apiGet(
        `/api/delivery/summary/${delivery_id}`
      );
      if (data && !error) {
        console.log("data", data);
        setSummary(data?.data[0]);
      } else {
        console.log("error", error);
      }
    }
    getSummary();
  }, [isShow]);

  //   SUBMIT FINISH DELIVERY
  const [isSubmitting, setIsSubmitting] = useState(false);
  // PROMPT MODAL
  const [isShownPrompt, setIsShownPrompt] = useState(false);
  const togglePrompt = () => {
    setIsShownPrompt(!isShownPrompt);
  };

  const handleFinishDelivery = async () => {
    if (!delivery_id || isSubmitting || !isShownPrompt) return;
    setIsSubmitting(true);
    const { data, error } = await apiPut({
      url: `/api/delivery/finish/${delivery_id}`,
    });
    if (data && !error) {
      console.log("[data]", data);
      ToastAndroid.show(
        "You have successfully finished a delivery.",
        ToastAndroid.LONG
      );
      setIsSubmitting(false);
      setIsShownPrompt(!isShownPrompt);
      mutate("/api/delivery/by-personel");
      setIsShow(!isShow);
    } else {
      ToastAndroid.show(
        "Sorry something went wrong, please try again.",
        ToastAndroid.LONG
      );
      mutate("/api/delivery/by-personel");
      setIsSubmitting(false);
      setIsShownPrompt(!isShownPrompt);
      console.log("error", error);
    }
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
        className="flex-1 h-full bg-white rounded-2xl"
      >
        <PromptModal
          confirmText="Yes"
          confirmHandler={handleFinishDelivery}
          message="Do you really want to finish this delivery?"
          toggleModal={togglePrompt}
          isModalVisible={isShownPrompt}
          animationOutTiming={200}
        />
        <View
          style={{ height: windowHeight - 50 }}
          className="w-full flex-1 order-[1px] h-full bg-white mt-2 justify-between"
        >
          <View className="">
            <View className="items-center ">
              <Text className="text-center text-[24px] font-bold">
                Finish Delivery
              </Text>
              <Text className="font-semibold text-gray-500 text-center">
                You complete your delivery by creating a report. 
              </Text>
            </View>

            <View className="flex-row mt-10 gap-x-2 items-center justify-around p-2">
              <View className="rounded-lg border-[1px] border-gray-200 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[28px] text-[#2389DA]">
                  {summary?.total_orders + summary?.total_free || 0}
                </Text>
                <Text className="font-semibold text-gray-500">
                  Delivered Gallons
                </Text>
              </View>
              <View className="rounded-lg border-[1px] border-gray-200 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[28px] text-[#2389DA]">0</Text>
                <Text className="font-semibold text-gray-500">
                  Undelivered Gallons
                </Text>
              </View>
            </View>
            <View className="flex-row  gap-x-2 items-center justify-around p-2">
              <View className="rounded-lg border-[1px] border-gray-200 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[28px] text-[#2389DA]">
                  {summary?.total_borrowed_gallon || 0}
                </Text>
                <Text className="font-semibold text-gray-500">
                  Borrowed Gallons
                </Text>
              </View>
              <View className="rounded-lg border-[1px] border-gray-200 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[28px] text-[#2389DA]">
                  {summary?.total_returned_gallon || 0}
                </Text>
                <Text className="font-semibold text-gray-500">
                  Returned Gallons
                </Text>
              </View>
            </View>
            <View className="flex-row  gap-x-2 items-center justify-around p-2">
              <View className="rounded-lg border-[1px] border-gray-200 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[28px] text-[#2389DA]">
                  {summary?.total_credited_gallon || 0 || 0}
                </Text>
                <Text className="font-semibold text-gray-500">
                  Credited Gallons
                </Text>
              </View>
              <View className="rounded-lg border-[1px] border-gray-200 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[28px] text-[#2389DA]">
                  ₱ {summary?.total_of_all_debt_payment || 0 || 0}
                </Text>
                <Text className="font-semibold text-gray-500">
                  Debt Payments
                </Text>
              </View>
            </View>
            <View className="flex-row  gap-x-2 items-center justify-around p-2">
              <View className="rounded-lg border-[1px] border-gray-200 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[28px] text-[#2389DA]">
                  ₱ {summary?.total_of_all_order_to_pay || 0 || 0}
                </Text>
                <Text className="font-semibold text-gray-500">
                  Orders Payment
                </Text>
              </View>
              <View className="rounded-lg border-[1px] border-gray-200 p-4 w-[48%] shadow-lg shadow-gray-500 bg-white">
                <Text className="font-bold text-[28px] text-[#2389DA]">
                  ₱ {summary?.total_of_all_payment || 0 || 0}
                </Text>
                <Text className="font-semibold text-gray-500">
                  Cash Received
                </Text>
              </View>
            </View>
            <View className="mt-2 p-2">
              <Text className="font-semibold text-gray-500">
                This is all your progress so far in this delivery. Note that
                this is only from a delivery order. (edit this)
              </Text>
            </View>
          </View>
          <View className="p-2">
            <TouchableOpacity
              onPress={() => togglePrompt()}
              className="flex-row w-full bg-[#2389DA] p-2 h-[50px]  items-center justify-center rounded-full"
            >
              <Text className="text-white font-bold ml-2">Finish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsShow(!isShow)}
              className="flex-row w-full border-[1px] border-[#2389DA] mt-2 p-2 h-[50px]  items-center justify-center rounded-full"
            >
              <Text className="text-[#2389DA] font-bold ml-2">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ReturnDelivery;
