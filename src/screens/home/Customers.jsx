import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Dimensions,
  Pressable,
} from "react-native";

import React, { useEffect, useLayoutEffect, useState } from "react";
import SearchTextinput from "../../components/general/SearchTextinput";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Customers = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  // #2389DA
  const [searchValue, setSearchValue] = useState();
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);

  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;

  useEffect(() => {
    return () => {
      setShowCustomerInfo(false);
    };
  }, []);

  return (
    <View className={Platform.OS === "android" ? "pt-5 flex-1" : "pt-0"}>
      <ScrollView className=" p-2">
        <View>
          <SearchTextinput value="Jose" setValue={setSearchValue} />
        </View>
        <View className="p-2 bg-white rounded-xl mt-3">
          <View className="flex-row justify-between items-center px-2">
            <Text className="text-gray-700 font-bold  ">Customers</Text>
            <Text className="text-gray-500 font-semibold text-[12px] ">
              Details
            </Text>
          </View>
          <View className="mt-4 flex-1 flex-col">
            {/* customers list */}
            {[1, 2, 3].map((item) => (
              <TouchableOpacity
                onPress={() => setShowCustomerInfo(!showCustomerInfo)}
                key={item}
                className="mt-1 flex-row items-center flex-1 border-b-[1px] border-b-gray-200 rounded-md"
              >
                <View className="flex-row p-2 ">
                  <View className="flex-row  items-center  w-[50px] h-[50px]  rounded-xl bg-gray-500 overflow-hidden">
                    <Image
                      source={{
                        uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
                      }}
                      className=" w-full h-full rounded-xl "
                    />
                  </View>
                  <View className="flex-col justify-around ml-3 flex-nowrap">
                    <Text className="font-bold text-gray-700">
                      Adam Marcaida Jr
                    </Text>
                    <View className="flex-row items-center ">
                      <Ionicons
                        name="md-location-sharp"
                        size={12}
                        color="#2389DA"
                      />
                      <Text className="ml-1 text-[12px] font-regular text-gray-500">
                        Mahogany St. bunsuran 1st
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <MatComIcon name="credit-card" size={12} color="red" />
                      <Text className="ml-1 text-[12px] font-bold text-gray-500">
                        - P 200.00
                      </Text>
                    </View>
                  </View>
                </View>
                <View>{/* some details sana */}</View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showCustomerInfo}
        onRequestClose={() => {
          setShowCustomerInfo(!showCustomerInfo);
        }}
      >
        <View className="flex-1 flex-col justify-between  ">
          {/*  touch to close */}
          <View className=" h-auto flex-1">
            <Pressable
              className="h-full"
              onPress={() => setShowCustomerInfo(!showCustomerInfo)}
            ></Pressable>
          </View>
          {/* informtaion */}
          <View className="flex-col bg-white  shadow-xl shadow-gray-500 ">
            <View className="flex-row justify-end p-2 rounded-lg">
              <Ionicons
                onPress={() => setShowCustomerInfo(!showCustomerInfo)}
                name="close"
                size={25}
              />
            </View>
            <View className="">
              <View className="bg-gray-800 p-2  flex-col items-center justify-between ">
                <View
                  style={{ height: deviceWidth / 3, width: deviceWidth / 3 }}
                  className="flex-row items-center justify-center rounded-full bg-gray-500 overflow-hidden border-[4px] border-blue-400"
                >
                  <Image
                    source={{
                      uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
                    }}
                    className=" w-full h-full rounded-xl "
                  />
                </View>
                <Text className="mt-3 font-bold text-[24px] text-gray-200">
                  Adam Marcaida Jr.
                </Text>
              </View>
              {/* number & address */}
              <View className="flex-col p-3 bg-gray-100">
                <View className="flex-row gap-2 items-center">
                  <View className="bg-gray-300 p-2 rounded-full">
                    <Ionicons name="call" size={12} color="gray" />
                  </View>
                  <Text className="font-bold text-gray-700">09121287281</Text>
                </View>
                <View className="flex-row gap-2 items-center mt-1">
                  <View className="bg-gray-300 p-2 rounded-full">
                    <Ionicons name="location" size={12} color="gray" />
                  </View>
                  <Text className="font-bold text-gray-700">
                    #521 Mahogany St. bunsuran 1st Pandi, Bulacan
                  </Text>
                </View>
              </View>
              {/* Cards */}
              <View className="flex-row flex-wrap p-2">
                <TouchableOpacity className="flex flex-grow w-1/2 border-[5px] border-white bg-gray-200 p-2 rounded-xl flex-col items-center justify-center">
                  <Text className="text-[24px] text-gray-700 font-bold text-center">
                    - P 750.00
                  </Text>
                  <Text className="text-gray-500 font-semibold">Balance</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("New", {
                      screen: "Deliver Order",
                      params: { user: "Adam Marcaida Jr." },
                    });
                    setShowCustomerInfo(false);
                  }}
                  className="flex flex-grow w-1/2 border-[5px] border-white bg-gray-200 p-2 rounded-xl flex-col items-center justify-center"
                >
                  <Text className="text-[24px] text-gray-700 font-bold text-center">
                    15
                  </Text>
                  <Text className="text-gray-500 font-semibold">Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("New", {
                      screen: "New Schedule",
                      params: { schedule: [] },
                    });
                    setShowCustomerInfo(false);
                  }}
                  className="flex flex-grow w-1/2 border-[5px] border-white bg-gray-200 p-2 rounded-xl flex-col items-center justify-center"
                >
                  <Text className="text-[24px] text-gray-700 font-bold text-center">
                    Oct. 10
                  </Text>
                  <Text className="text-gray-500 font-semibold">Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-grow w-1/2 border-[5px] border-white bg-gray-200 p-2 rounded-xl flex-col items-center justify-center">
                  <Text className="text-[24px] text-gray-700 font-bold text-center">
                    Retailer
                  </Text>
                  <Text className="text-gray-500 font-semibold">
                    Customer Type
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView className="p-2">
                <Text className="font-bold text-gray-700">Note:</Text>
                <Text>Short description about sa customer</Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Customers;
