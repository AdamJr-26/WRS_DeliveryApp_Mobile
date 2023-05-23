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
import useFetch from "../../hooks/api/swr/useFetch";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatComIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";

const StepSchedules = ({ handleSelectSchedule, selectedSchedules }) => {
  const {
    data: schedulesData,
    error: schedulesError,
    mutate: mutateShedules,
  } = useFetch({
    url: "/api/schedule-assigned/by-personel",
  });
  const [refreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);
    mutateShedules();
    setIsRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      className="gap-y-2 mb-[60px]"
    >
      {schedulesData?.data?.map((schedule, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handleSelectSchedule(schedule)}
          className="flex-row  gap-x-2"
        >
          <View className="items-center justify-center">
            <MatComIcons
              name={
                selectedSchedules.some(
                  (sched) => sched.scheduleId == schedule._id
                )
                  ? "checkbox-marked"
                  : "checkbox-blank-outline"
              }
              size={24}
              color="#2389DA"
            />
          </View>
          <View
            className={`gap-y-2 flex-1 mt-2 p-2 bg-white border-[1.5px] border-gray-200 rounded-xl`}
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
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default StepSchedules;
