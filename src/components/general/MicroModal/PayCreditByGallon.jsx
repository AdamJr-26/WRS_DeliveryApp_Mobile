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
import { useSWRConfig } from "swr";
const PayCreditByGallon = ({ isShow, setIsShow, credit, get_balance }) => {

  const [form, setForm] = useState();
  const [totalGallonToPay, setTotalGallonToPay] = useState(0);
  const [totalAmountToPay, setTotalAmountToPay] = useState(0);
  const [selectedGallon, setSelectedGallon] = useState(null);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (credit) {
      setTotalGallonToPay(credit?.total);
      setTotalAmountToPay(credit?.price * credit?.total);
      setSelectedGallon(credit?.gallon?._id);
    }
  }, [credit]);
  console.log("[selectedGallon]", selectedGallon);
  //   handle submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (isSubmitting || !totalGallonToPay || !totalAmountToPay) return;
    console.log("isSubmitting", isSubmitting);
    setIsSubmitting(true);
    const { data, error } = await apiPut({
      url: `api/credits/pay/${credit?._id}`,
      payload: {
        totalGallonToPay,
        totalAmountToPay,
        gallon_id: selectedGallon, // gallon id
      },
    });

    if (data && !error) {
      setIsSubmitting(false);
      setIsShow(false);
      ToastAndroid.show("Pay credit successfully", ToastAndroid.LONG);
      get_balance(); //re-fecth credit
    } else {
      ToastAndroid.show("Pay credit failed", ToastAndroid.LONG);
      get_balance();
      setIsSubmitting(false);
    }
  };
  //   on change text in total credited gallon.
  function onChangeTotalCreditGallon(value) {
    setTotalGallonToPay(value);
    setTotalAmountToPay(value * credit?.price);
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
            Credit Payment
          </Text>
        </View>
        <View className="flex-row mt-2">
          <View className="w-[50px] h-[50px] rounded-xl bg-gray-200 border-[1px] border-gray-300 items-center ">
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
        <View className="flex-row mt-2">
          <View className="w-[49%] mt-2">
            <Text className="font-semibold text-gray-600 text-center">
              Total Credited Gallon
            </Text>
            <TextInput
              value={`${totalGallonToPay}`}
              className="w-[100%] text-center font-bold mt-2 text-[16px] bg-gray-50 h-[60px] border-[1px] border-gray-300 rounded-md p-2 focus:border-[#2389DA] focus:border-[2px]"
              keyboardType="numeric"
              onChangeText={(value) => onChangeTotalCreditGallon(value)}
            />
          </View>
          <View className="w-[49%] mt-2">
            <Text className="font-semibold text-gray-600 text-center">
              Amount To Pay ₱{" "}
            </Text>
            <TextInput
              editable={false}
              value={`${totalAmountToPay}`}
              className="w-[100%] text-center font-bold mt-2 text-[16px] bg-gray-50 h-[60px] border-[1px] border-gray-300 rounded-md p-2 focus:border-[#2389DA] focus:border-[2px]"
              keyboardType="numeric"
              onChangeText={(value) => setTotalAmountToPay(value)}
            />
          </View>
        </View>
        <View className="p-2 mt-2 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => setIsShow(!isShow)}
            className="flex-row w-[49%] border-[1px] border-[#2389DA]  p-2 h-[50px]  items-center justify-center rounded-full"
          >
            <Text className="text-[#2389DA] font-bold ml-2">Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            className="flex-row w-[49%] bg-[#2389DA] p-2 h-[50px]  items-center justify-center rounded-full"
          >
            {isSubmitting ? (
              <ActivityIndicator size={34} color="white" />
            ) : (
              <Text className="text-white font-bold ml-2">Pay</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PayCreditByGallon;
