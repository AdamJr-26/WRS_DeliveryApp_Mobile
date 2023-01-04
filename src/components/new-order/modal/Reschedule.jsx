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
import { apiPost } from "../../../services/api/axios.method";
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
      navigation.navigate("My Routes");
      setIsSubmitting(false);
    } else {
      ToastAndroid.show("Cannot create a new schedule.", ToastAndroid.CENTER);
      setIsSubmitting(false);
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
              Transaction successful
            </Text>
          </View>

          <Text className="mt-10 mb-2 text-bold text-center font-semibold ">
            Do you want to reschedule this?
          </Text>
          <View className="mt-2">
            <DateTimePicker setDate={setDate} date={date} />
          </View>
          <View className="mt-4 flex-row">
            <TouchableOpacity
              onPress={() => navigation.navigate("My Routes")}
              className="h-[55px] border-[1px] border-gray-200 w-[49%] rounded-xl items-center justify-center"
            >
              <Text className="font-bold ">Go to Routes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleReSchedule()}
              className="h-[55px] flex-row w-[49%]  border-[1px] bg-[#2389DA] border-gray-200  rounded-xl items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <ActivityIndicator size={34} color="white" />
                  <Text className="ml-2 text-white font-semibold">Rescheduling...</Text>
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

export default Reschedule;
