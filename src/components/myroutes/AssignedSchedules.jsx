import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicatory,
  Animated,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import useFetch from "../../hooks/api/swr/useFetch";
import { apiGet, apiPut } from "../../services/api/axios.method";

const AssignedSchedules = () => {
  // get all schedules that assigned to the current delivery.
  const navigation = useNavigation();
  const {
    data: schedules,
    error,
    mutate: mutateOndeliverySchedules,
  } = useFetch({
    url: "/api/schedule-assigned/by-personel",
  });

  //   HANDLE SCROLL
  const [scrollPositionY, setScrollPositionY] = useState(0);

  const handleScrollY = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    setScrollPositionY(y);
  };
  //   console.log("scrollPositionY", scrollPositionY);

  // REMOVE ASSIGEND SCHEDULE
  const handleAssignedSchedule = async (sched) => {
    const { data, error } = await apiPut({
      url: `/api/schedule/remove/assigned/${sched._id}`,
    });
    if (data && !error) {
      mutateOndeliverySchedules();
      ToastAndroid.show("An Assigned schedule was removed.", ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        "Failed to removed assigned schedule.",
        ToastAndroid.LONG
      );
    }
  };

  // COLOR BY PLACE
  const [places, setPlaces] = useState([]);
  function getAllPlaces() {
    for (let i = 0; i < schedules?.data?.length; i++) {
      const place = schedules?.data[i]?.customer?.address?.barangay;
      const placeIndex = places?.findIndex((plc) => plc?.place === place);
      if (placeIndex < 0) {
        setPlaces([...places, { place: place, occured: 1 }]);
      } else {
        // setPlaces((prevPlaces) => prevPlaces[placeIndex]["occured"] + 1);
      }
    }
  }
  getAllPlaces();
  const [markedPlace, setMarkplace] = useState(null);

  // HANDLE REFRESH
  // refresh control
  const [refreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);
    mutateOndeliverySchedules();
    getAllPlaces();
    setIsRefreshing(false);
  };
  return (
    <View
      onScroll={handleScrollY}
      showsVerticalScrollIndicator={false}
      className="relative"
    >
      <View className={`gap-y-2`}>
        <Text className="text-[16px] font-bold ">Assigned schedules</Text>
        <Text className="text-[12px]">
          Schedules that are assigned to you.
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="pt-4 gap-x-2 pb-2 min-h-[65px] sticky"
      >
        {/* [#2D3748] */}
        {places.map((place, i) => (
          <TouchableOpacity
            onPress={() =>
              setMarkplace((prev) => {
                if (prev === place.place) {
                  return null;
                } else {
                  return place.place;
                }
              })
            }
            key={i}
            className={`${
              markedPlace === place.place ? "bg-[#2389DA] " : "bg-gray-50 "
            } border-[2px] border-[#2389DA] px-6 py-2 rounded-full`}
          >
            <Text
              className={`font-semibold ${
                markedPlace === place.place
                  ? "text-white"
                  : "text-text-[#2389DA]"
              }`}
            >
              {place.place}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View className="w-screen float ml-[-20px] border-b-[2px] border-gray-200"></View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScrollY}
        showsVerticalScrollIndicator={false}
        className="mb-[300px]  rounded-xl bg-gray-50 "
      >
        {schedules?.data?.map((schedule, i) => (
          <View
            key={i}
            className={`gap-y-2 mt-2 p-2 bg-white border-[1.5px] ${
              schedule.customer?.address?.barangay === markedPlace
                ? "border-[#2389DA]"
                : "border-gray-200"
            } rounded-xl`}
          >
            <View className="flex-row justify-between ">
              <View className="flex-row gap-x-3 items-center">
                <View className="h-[40px] w-[40px] bg-gray-200 rounded-full">
                  <Image
                    source={{
                      uri: schedule.customer?.display_photo,
                    }}
                    className=" w-full h-full rounded-full "
                  />
                </View>
                <View className="">
                  <Text className="text-[14px] font-bold">
                    {schedule.customer.firstname +
                      " " +
                      schedule.customer.lastname}
                  </Text>
                  <Text className="text-[9px]">
                    {schedule.customer.mobile_number}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <TouchableOpacity className="bg-gray-100 p-4 rounded-full">
                  <Text>
                    <Ionicons name="call" size={16} />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="h-[2px] w-[100%] bg-gray-200"></View>
            <View className="border-[1.5px] border-gray-200 px-2 py-4 rounded-xl">
              <Text className="font-semibold text-[12px]">Address</Text>
              <Text className="text-[14px]">
                {schedule.customer?.address?.street},{" "}
                {schedule.customer?.address?.barangay},{" "}
                {schedule.customer?.address?.municipal_city}
              </Text>
            </View>
            <View className="border-[1.5px] border-gray-200 px-2 py-4 rounded-xl">
              <View className="flex-row justify-between">
                <Text className="font-semibold text-[12px]">Orders</Text>
                <Text className="font-semibold text-[12px]">May, 26, 2023</Text>
              </View>
              <View className="mt-4 ">
                {schedule.items.map((item, i) => (
                  <View
                    key={i}
                    className="flex-row mb-2 p-1 px-2 rounded-md justify-between bg-gray-100"
                  >
                    <View className="flex-row gap-x-2 items-center">
                      <Text className="text-gray-400">
                        <Octicons name="dot-fill" size={12} />
                      </Text>
                      <Text className="font-bold text-[14]">
                        {item.gallon.name}{" "}
                      </Text>
                    </View>
                    <View className="">
                      <Text className="font-bold">{item.total}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View className="px-2 py-4 flex-row justify-end gap-x-2">
              <TouchableOpacity
                onPress={() => handleAssignedSchedule(schedule)}
                className="bg-gray-50 border-[2px] border-[#2389DA] py-1.5 px-4 rounded-full"
              >
                <Text className="font-bold text-[#2389DA] ">remove</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity className="bg-[#2389DA] py-1.5 px-7 rounded-full">
                  <Text
                    onPress={() => {
                      navigation.navigate("New", {
                        screen: "Deliver Order",
                        initial: false,
                        params: { schedule: schedule },
                      });
                    }}
                    className="font-bold text-white"
                  >
                    deliver
                  </Text>
                </TouchableOpacity> */}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AssignedSchedules;
