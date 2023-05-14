import {
  Modal,
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import useFetch from "../../../hooks/api/swr/useFetch";
import Ionicons from "react-native-vector-icons/Ionicons";

const SelectDiscount = ({ setIsShow, isShow, selectCustomer }) => {
  const {
    data,
    error,
    mutate: mutateDiscount,
  } = useFetch({ url: "/api/discounts/get-free" });
  const windowHeight = Dimensions.get("screen").height;
  useEffect(() => {
    mutateDiscount();
  }, [isShow]);
  return (
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

        <View
          style={{ height: windowHeight / 1.5 }}
          className="bg-white h-[200px] p-5 gap-y-2 rounded-t-3xl border-[1px] border-gray-300 shadow-xl shadow-gray-600"
        >
          <View className="relative">
            <Text className="font-bold  text-center">Choose a discount</Text>
            <TouchableOpacity
              onPress={() => setIsShow(!isShow)}
              className="absolute right-2"
            >
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View className="mt-2 flex-wrap flex-row">
              {data?.data.map((discount, i) => (
                <TouchableOpacity
                  onPress={() => {
                    setIsShow(!isShow);
                    selectCustomer(discount);
                  }}
                  key={i}
                  className="rounded-xl p-2 m-1 shadow-lg shadow-gray-400 bg-white "
                >
                  <View className="">
                    <Text className="text-[10px]">Discount type</Text>
                    <Text className="text-[16px] font-semibold">
                      Buy {discount?.get_free.buy} get {discount?.get_free.get}
                    </Text>
                  </View>
                  <View className="">
                    <Text className="text-[10px]">Discription</Text>
                    <Text className="">
                      For every {discount?.get_free.buy} gallons purchased,
                      customer will receive {discount?.get_free.get} free
                      gallon(s).
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(SelectDiscount);
