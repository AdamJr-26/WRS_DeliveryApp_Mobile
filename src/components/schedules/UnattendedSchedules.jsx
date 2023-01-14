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
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDes from "react-native-vector-icons/AntDesign";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { apiGet } from "../../services/api/axios.method";
import RenderScheduleCard from "./CalendarAgenda/RenderScheduleCard";

const UnattendedSchedules = ({ isShow, setIsShow }) => {
  // fetch all uotdated schedules
  const [isLoading, setIsloading] = useState(false);
  const [schedules, setSchedules] = useState();
  async function outDatedSchedules() {
    if (!isShow) return;
    setIsloading(true);
    const { data, error } = await apiGet("/api/schedules/outdated");
    if (data && !error) {
      setIsloading(false);
      setSchedules(data.data);
    } else {
      setIsloading(false);
      ToastAndroid.show(
        "Failed to get all unattended schedules, please refresh.",
        ToastAndroid.LONG
      );
    }
  }
  useEffect(() => {
    outDatedSchedules();
  }, [isShow]);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow);
      }}
    >
      {isLoading ? (
        <View className="absolute items-center justify-center bg-opacity-20 right-0 top-0 left-0 bottom-0 h-full w-full z-10">
          <View className="p-2 bg-white rounded-full shadow-md items-center justify-center shadow-gray-400">
            <ActivityIndicator size={32} color="#2389DA" />
          </View>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="p-2 flex-1 h-full bg-slate-100"
        >
          <View className="relative  ">
            <TouchableOpacity
              onPress={() => setIsShow(!isShow)}
              className="z-10"
            >
              <Ionicons name="chevron-back" size={32} />
              {/* chevron-down-sharp */}
            </TouchableOpacity>
            <TouchableOpacity className="w-full absolute items-center justify-center">
              <Text className="font-bold text-[16px] top-1">
                Unattened Schedules
              </Text>
            </TouchableOpacity>
          </View>
          <View className="p-2 mt-2">
            <Text className="font-semibold text-gray-600">
              This page shows all unattended schedules for the past few days.
            </Text>
          </View>
          <View className="bg-white mt-4 rounded-lg p-2 shadow-sm flex ">
            {schedules ? (
              <View>
                {schedules?.map((schedule, i) => (
                  <RenderScheduleCard
                    key={i}
                    item={schedule}
                    getSchedules={outDatedSchedules}
                  />
                ))}
              </View>
            ) : (
              <View className="h-[100px] items-center justify-center">
                <Text className="text-[16px] font-bold">No Schedules</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Modal>
  );
};
// day={day} item={item} getSchedules={getSchedules}
export default UnattendedSchedules;
