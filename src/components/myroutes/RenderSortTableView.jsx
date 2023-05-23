import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatcomIcons from "react-native-vector-icons/MaterialCommunityIcons";

// import { TextInput } from 'react-native-gesture-handler';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Pressable,
  ActivityIndicator,
} from "react-native";
import transformDate from "../../services/utils/date.toString";
import { apiGet } from "../../services/api/axios.method";

const RenderSortTableView = ({
  schedule,
  index,
  marked_place,
  handleAssignedSchedule,
}) => {
  const navigation = useNavigation();
  const customer = schedule?.customer;
  const [isSending, setIsSending] = useState(false);
  const sendEmail = async (schedule) => {
    if (schedule?.notified && !isSending) {
      ToastAndroid.show("This customer already notified.", ToastAndroid.SHORT);
    } else {
      setIsSending(true);
      const { data, error } = await apiGet(
        `/api/send/delivery-notification/${schedule?._id}`
      );
      if (data && !error) {
        setIsSending(false);
        ToastAndroid.show("Send email successfully", ToastAndroid.SHORT);
      } else {
        setIsSending(false);
        ToastAndroid.show("Failed to send email.", ToastAndroid.SHORT);
      }
    }
  };
  return (
    <View className="flex-col max-w-[350px] h-[400px] mr-1 mt-0 p-3 border-[1px] border-gray-200 bg-white rounded-xl shadow-xl ">
      <TouchableOpacity
        className={
          customer?.address?.barangay === marked_place?.place
            ? "flex-row h-[75px] items-center  relative bg-blue-200 w-full rounded-lg"
            : "flex-row h-[75px] items-center  relative w-full"
        }
      >
        <View className="ml-2 w-[50px] bg-gray-200 h-[50px] rounded-full ">
          <Image
            source={{
              uri: customer?.display_photo,
            }}
            className=" w-full h-full rounded-full "
          /> 
        </View>
        <View className="ml-2  ">
          <Text className="text-[19px] font-bold text-gray-700 ">
            {customer?.firstname || " "} {customer?.lastname || " "}
          </Text>
          <Text className="text-[12px] break-words font-semibold text-gray-600">
            {customer?.address?.street}, {customer?.address?.barangay},{" "}
            {customer?.address?.municipal_city}
          </Text>
          {/* <Text className="text-[12px] font-semibold text-gray-600">{item.}</Text> */}
        </View>
        {/* <View className="absolute right-2">
          <Ionicons name="arrow-down-circle-sharp" size={25} color="gray" />
        </View> */}
      </TouchableOpacity>
      <View className="h-[2px] bg-gray-200 w-full mt-2"></View>
      {/* expandable */}
      <View className="p-3">
        <View className="flex-row items-center  ">
          <View className="p-2 bg-gray-200 rounded-full  ">
            <Ionicons name="call" size={16} />
          </View>
          <Text className="font-bold ml-2">{customer?.mobile_number} </Text>
        </View>
        <View className="flex-col">
          <View className="flex-row mt-3 justify-between items-center">
            <Text className="font-bold ">Orders</Text>
            <Text className="font-bold ">
              {transformDate(schedule?.schedule?.utc_date).string_date}
            </Text>
          </View>
          {schedule?.items?.map((item, i) => (
            <View
              key={i}
              className="flex-row justify-between p-2 mt-1 items-center rounded-md bg-gray-100"
            >
              <Text className="font-semibold">{item?.gallon?.name}</Text>
              <Text className="font-bold text-[16px]">{item?.total}</Text>
            </View>
          ))}
        </View>
        <View className="flex-row mt-2 w-full items-center justify-end">
          <TouchableOpacity
            onPress={() => sendEmail(schedule)}
            className="flex-row items-center gap-[2px]"
          >  
            {isSending ? (
              <ActivityIndicator size={24} color="#2389DA" />
            ) : (
              <MatcomIcons
                name="gmail"
                color={schedule?.notified ? "gray" : "#2389DA"}
                size={24}
              />
            )}
            <Text
              className="font-bold"
              style={
                schedule?.notified ? { color: "gray" } : { color: "#2389DA" }
              }
            >
              Send
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAssignedSchedule(schedule)}
            className="px-4 py-2 rounded-full w-50"
          >
            <Text className="text-red-800  ">Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("New", {
                screen: "Deliver Order",
                initial: false,
                params: { schedule: schedule },
              });
            }}
            className="bg-[#2389DA] px-8 py-2 ml-2 rounded-full w-50"
          >
            <Text className="text-gray-100 font-semibold ">Deliver</Text>
          </TouchableOpacity>
          {/* <Button className="rounded-xl " title="Remove" />
        <Button className="rounded-xl " title="Deliver" /> */}
        </View>
      </View>
    </View>
  );
};

export default React.memo(RenderSortTableView);
