import {
  Modal,
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";

import React, { useState } from "react";
import DateTimePicker from "../../general/DateTimePicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { apiDelete, apiPost } from "../../../services/api/axios.method";
import { useNavigation } from "@react-navigation/native";
const Reschedule = ({ setIsShow, isShow, schedule_id, form }) => {
  const navigation = useNavigation();
  const [date, setDate] = useState();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleReSchedule = async () => {
    if (!date || isSubmitting) return;

    const payload = {
      schedule_id,
      schedule: {
        unix_timestamp: Math.floor(date.valueOf() / 1000),
        utc_date: date,
      },
    };
    setIsSubmitting(true);
    const { data, error } = await apiPost({
      url: "/api/re-schedule",
      payload,
    });
    if (data && !error) {
      ToastAndroid.show(
        "Create a new schedule successfully.",
        ToastAndroid.CENTER
      );
      navigation.goBack();
      setIsSubmitting(false);
    } else {
      ToastAndroid.show("Cannot create a new schedule.", ToastAndroid.CENTER);
      setIsSubmitting(false);
    }
  };
  const cancelReschedule = async () => {
    const { data, error } = await apiDelete({
      url: `/api/schedule/${schedule_id}`,
    });
    if (data && !error) {
      navigation.goBack();
    } else {
      ToastAndroid.show(
        "Cannot delete delivered schedule.",
        ToastAndroid.SHORT
      );
      navigation.goBack();
    }
  };
  return (
    <Modal animationType="fade" transparent={true} visible={isShow}>
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          // backdropOpacity:
        }}
        className=" p-3  flex-1 h-full w-full items-center justify-center "
      >
        <View className="bg-gray-50 p-2 py-10 rounded-xl shadow-lg shadow-gray-500 m-2 border-[1px] border-gray-200">
          <View className="items-center justify-center">
            <View>
              <Ionicons name="checkmark-circle" size={64} color="#2389DA" />
            </View>
            <Text className="text-[24px] font-bold text-gray-600">
              Transaction Successful
            </Text>
          </View>

          <Text className="mt-10 mb-2 text-bold text-center font-semibold ">
            Do you want to reschedule this?
          </Text>
          <View className="mt-2">
            <DateTimePicker setDate={setDate} date={date} />
          </View>
          <View className=" bottom-0 mt-4 flex-row p-2 items-center justify-center gap-x-1 opacity-80">
            <TouchableOpacity
              onPress={() => cancelReschedule()}
              className="flex-row w-[49%]  bg-white p-2 h-[50px] border-[1px] border-[#2389DA]  items-center justify-center rounded-full"
            >
              <Text className="text-[#2389DA] bg-white font-bold text-center">
                Done
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleReSchedule()}
              className="flex-row w-[49%] bg-[#2389DA] p-2 h-[50px]  items-center justify-center rounded-full"
            >
              {isSubmitting ? (
                <>
                  <ActivityIndicator size={24} color="white" />
                  <Text className="ml-2 text-white font-semibold">
                    Rescheduling...
                  </Text>
                </>
              ) : (
                <Text className="text-white font-semibold">Reschedule</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(Reschedule);
