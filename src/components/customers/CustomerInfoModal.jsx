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
  ActivityIndicator,
} from "react-native";

import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import useFetch from "../../hooks/api/swr/useFetch";
import CustomerBalanceModal from "../general/modal/CustomerBalanceModal";
import CustomerBorrowedModal from "../general/modal/CustomerBorrowedModal";

const CustomerInfoModal = ({ isShow, setIsShow, customer }) => {
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  const { data: customerBorrowed, error: customerBorrowedError } = useFetch({
    url: `/api/borrowed/total/gallon/${customer?._id}`,
  });

  const { data: customerBalance, error: customerBalanceError } = useFetch({
    url: `/api/credits/params/${customer?._id}`,
  });

  const { data: customerSchedule, error: customerScheduleError } = useFetch({
    url: `/api/schedule/customer/${customer?._id}`,
  });

  console.log("customerSchedule", customerSchedule);
  // modals state
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showBorrowedModal, setShowBorrowedModal] = useState(false);

  //
  const today = (date_string) => {
    console.log("date_stringdate_stringdate_string", date_string);
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(date_string);
    const sched_date = `${
      monthNames[date?.getMonth()]
    }, ${date?.getDate()}, ${date?.getFullYear().toLocaleString()}`;
    const day = weekdays[date?.getDay()];
    return { string_date: sched_date, day };
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow);
      }}
    >
      <CustomerBalanceModal
        setIsShow={setShowBalanceModal}
        isShow={showBalanceModal}
        customer={customer}
      />
      <CustomerBorrowedModal
        setIsShow={setShowBorrowedModal}
        isShow={showBorrowedModal}
        customer={customer}
      />
      <View className="flex-1 flex-col justify-between  ">
        {/*  touch to close */}
        <View className=" h-auto flex-1">
          <Pressable
            className="h-full"
            onPress={() => setIsShow(!isShow)}
          ></Pressable>
        </View>
        {/* informtaion */}
        <View className="flex-col bg-[#F0F0F0] rounded-t-xl  shadow-xl shadow-gray-500 ">
          <View className="flex-row justify-end p-2 rounded-lg">
            <Ionicons
              onPress={() => setIsShow(!isShow)}
              name="close"
              size={25}
            />
          </View>
          <View className="">
            <View className="bg-[#2389DA] p-2  flex-col items-center justify-between ">
              <View
                style={{ height: deviceWidth / 3, width: deviceWidth / 3 }}
                className="flex-row items-center justify-center rounded-full bg-gray-300 overflow-hidden border-[4px] border-blue-400"
              >
                <Image
                  source={{
                    uri: customer?.display_photo,
                  }}
                  className=" w-full h-full rounded-xl "
                />
              </View>
              <Text className="mt-3 font-bold text-[19px] text-gray-200">
                {customer?.firstname} {customer?.lastname}
              </Text>
            </View>
            {/* number & address */}
            <View className="flex-col p-3 bg-gray-100">
              <View className="flex-row gap-2 items-center">
                <View className="bg-gray-300 p-2 rounded-full">
                  <Ionicons name="call" size={12} color="gray" />
                </View>
                <Text className="font-bold text-gray-700">
                  {customer?.mobile_number}
                </Text>
              </View>
              <View className="flex-row gap-2 items-center mt-1">
                <View className="bg-gray-300 p-2 rounded-full">
                  <Ionicons name="location" size={12} color="gray" />
                </View>
                <Text className="font-bold text-gray-700">
                  {customer?.address?.street} {customer?.address?.barangay}{" "}
                  {customer?.address?.municipality}{" "}
                  {customer?.address?.province}{" "}
                </Text>
              </View>
            </View>
            {/* Cards */}
            <View className="flex-row flex-wrap p-2 ">
              <TouchableOpacity
                onPress={() => setShowBalanceModal(!showBalanceModal)}
                className="flex h-[80px] flex-grow border-[1px] bg-white mt-1 border-gray-200 w-[49%] p-2 rounded-lg shadow-lg shadow-gray-300 flex-col items-center justify-center"
              >
                {customerBalance && !customerBalanceError ? (
                  <Text className="font-bold text-[19px] text-gray-600">
                    ₱ {Math.floor(customerBalance?.data[0]?.total_debt) || 0}
                  </Text>
                ) : (
                  <ActivityIndicator size={16} color="#2389DA" />
                )}
                <Text className="text-gray-500 text-[12px] font-semibold">
                  Balance
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowBorrowedModal(!showBorrowedModal)}
                className="flex h-[80px] flex-grow border-[1px] bg-white mt-1 border-gray-200 w-[49%] p-2 rounded-lg shadow-lg shadow-gray-300 flex-col items-center justify-center"
              >
                {customerBorrowed && !customerBorrowedError ? (
                  <Text className="font-bold text-[19px] text-gray-600">
                    {" "}
                    {Math.floor(customerBorrowed?.data[0]?.total_borrowed) || 0}
                  </Text>
                ) : (
                  <ActivityIndicator size={16} color="#2389DA" />
                )}
                <Text className="text-gray-500 text-[12px] font-semibold">
                  Borrowed Gallon
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("New", {
                    screen: "Deliver Order",
                    initial: false,
                    params: { user: "Adam Marcaida Jr." },
                  });
                  setIsShow(false);
                }}
                className="flex h-[80px] flex-grow border-[1px] bg-white mt-1 border-gray-200 w-[49%] p-2 rounded-lg shadow-lg shadow-gray-300 flex-col items-center justify-center"
              >
                <Text className="text-[19px] text-gray-700 font-bold text-center">
                  Jan, 15, 2023
                </Text>
                <Text className="text-gray-500 text-[12px] font-semibold">
                  Last delivery
                </Text>
              </TouchableOpacity>

              {customerSchedule?.data?.length ? (
                <View className="flex px-2 h-[80px] flex-grow border-[1px] bg-white mt-1 border-gray-200 w-[49%] rounded-lg shadow-lg shadow-gray-300 flex-col items-center justify-center">
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {customerSchedule?.data?.map((schedule, i) => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("New", {
                            screen: "Deliver Order",
                            initial: false,
                            params: {
                              schedule: { customer, schedule: schedule?.items },
                            },
                          });
                          setIsShow(false);
                        }}
                        key={i}
                        className="p-1 flex h-[70px] flex-grow border-[1px] bg-white mt-1 border-gray-200 w-[49%] rounded-lg shadow-lg shadow-gray-300 flex-col items-center justify-center"
                      >
                        <View>
                          <Text className="text-[19px] text-gray-700 font-bold text-center">
                            {today(schedule?.schedule?.utc_date).string_date}
                          </Text>
                          <Text className="text-gray-500 text-[12px] font-semibold text-center">
                            Schedule
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ) : (
                <View className="flex px-2 h-[80px] flex-grow border-[1px] bg-white mt-1 border-gray-200 w-[49%] rounded-lg shadow-lg shadow-gray-300 flex-col items-center justify-center">
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("New", {
                        screen: "New Schedule",
                        initial: false,
                        params: {
                          customer: customer,
                        },
                      });
                    }}
                    className="p-1 flex h-[70px] flex-grow  bg-white rounded-lg shadow-lg shadow-gray-300 flex-col items-center justify-center"
                  >
                    <Text className="text-gray-500 text-[12px] font-semibold text-center">
                      Create schedule
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <ScrollView className="p-2">
              <Text className="font-bold text-gray-700">Note:</Text>
              <Text>Short description about sa customer</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomerInfoModal;
