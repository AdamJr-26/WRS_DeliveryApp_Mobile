import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { TextInput } from 'react-native-gesture-handler';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { apiDelete, apiPut } from "../../../services/api/axios.method";
import PromptModal from "../../general/modal/PromptModal";
import transformDate from "../../../services/utils/date.toString";
const RenderItem = ({ day, item, getSchedules }) => {
  const items = item?.fromItems;
  const [isExpanded, setIsexpanded] = useState(false);
  const [isloading, setIsloading] = useState(false);
  // handle add to routes schedule
  console.log("[item]", item);

  const addtoRoutes = async (id) => {
    setIsloading(true);
    const { data, error } = await apiPut({
      url: "/api/schedule/assign",
      payload: { schedule_id: id },
    });
    console.log("data?.data", data?.data);
    if (data?.data?.assigned && !error) {
      ToastAndroid.show(
        "Added to your routes, now refreshing to get latest.",
        ToastAndroid.LONG
      );
      getSchedules(); // to get updated the schedules list.
      setIsloading(false);
    } else {
      setIsloading(false);
      ToastAndroid.show("Failed to add to your routes", ToastAndroid.LONG);
    }
  };
  // HANDLE DELETE SCHEDULE;
  const [isShownDeletePrompt, setIsShownDeletePrompt] = useState(false);
  const toggleSubmitPrompt = () => {
    setIsShownDeletePrompt(!isShownDeletePrompt);
  };
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteSchedule = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    const { data, error } = await apiDelete({
      url: `/api/schedule/${item?._id}`,
    });
    if (data && !error) {
      setIsDeleting(false);
      getSchedules();
      setIsShownDeletePrompt(false);
      ToastAndroid.show("A schedule has been deleted.", ToastAndroid.LONG);
    } else {
      setIsDeleting(false);
      ToastAndroid.show(
        "Attempting to delete a schedule failed. ",
        ToastAndroid.LONG
      );
    }
  };

  // process date to readable.

  return (
    <View className="flex-col mt-2  w-full bg-white rounded-xl shadow-xl shadow-gray-400 ">
      <PromptModal
        confirmText="Yes"
        confirmHandler={deleteSchedule}
        message="Do you really want to delete this schedule?"
        toggleModal={toggleSubmitPrompt}
        isModalVisible={isShownDeletePrompt}
        animationOutTiming={200}
      />
      <TouchableOpacity
        onPress={() => setIsexpanded(!isExpanded)}
        className="bg-blue-100 flex-row px-2 h-[80px] items-center rounded-t-xl relative overflow-hidden "
      >
        <View className="w-[50px] h-[50px] rounded-full bg-gray-300">
          <Image
            source={{
              uri: item?.customer[0]?.display_photo,
            }}
            className=" w-full h-full rounded-full "
          />
        </View>
        <View className="ml-2">
          <Text className="text-[19px] font-bold text-gray-700">
            {`${item?.customer[0]?.firstname || ""} ${
              item?.customer[0]?.lastname || ""
            }`}
          </Text>
          <Text>regular</Text>
          {/* <Text className="text-[12px] font-semibold text-gray-600">{item.}</Text> */}
        </View>
        <View className="absolute right-2">
          <Ionicons name="arrow-down-circle-sharp" size={25} color="gray" />
        </View>
      </TouchableOpacity>
      {isExpanded ? (
        <>
          {/* expandable */}
          <View className="p-3">
            <View className="flex-row items-center  ">
              <View className="p-2 bg-gray-200 rounded-full ">
                <Ionicons name="call" size={16} />
              </View>
              <Text className="font-bold ml-2">
                {item?.customer[0]?.mobile_number}{" "}
              </Text>
            </View>
            <View className="flex-row items-center mt-2">
              <View className="p-2 bg-gray-200 rounded-full ">
                <Ionicons name="location" size={16} />
              </View>
              <Text className="font-bold ml-2">
                {`${item?.customer[0]?.address?.street || ""}, ${
                  item?.customer[0]?.address?.barangay || ""
                }, ${item?.customer[0]?.address?.municipal_city || ""}, ${
                  item?.customer[0]?.address?.province || ""
                }`}
              </Text>
            </View>
            <View className="flex-col ">
              <View className="flex-row mt-3 justify-between items-center">
                <Text className="font-bold ">Orders</Text>
                <Text className="font-bold ">
                  {transformDate(item?.schedule?.utc_date).string_date}
                </Text>
              </View>
              {items?.map((item) => (
                <View
                  key={item?._id}
                  className="flex-row justify-between p-2 mt-1 items-center rounded-md bg-gray-100"
                >
                  <Text className="font-semibold">{item?.name}</Text>
                  <Text className="font-bold text-[16px]">{item?.total}</Text>
                </View>
              ))}
            </View>
            <View className="flex-row mt-2 w-full justify-end">
              <TouchableOpacity
                onPress={() => setIsShownDeletePrompt(!isShownDeletePrompt)}
                className=" rounded-full px-5 py-3 mt-2"
              >
                <Text className="text-red-700 w-full text-center ">Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addtoRoutes(item?._id)}
                className="bg-[#2389DA] w-[150px] rounded-full px-5 py-3 mt-2 ml-2 flex-row"
              >
                {isloading ? (
                  <>
                    <ActivityIndicator size={16} />
                    <Text className="text-gray-100 font-semibold w-full text-center">
                      Adding...
                    </Text>
                  </>
                ) : (
                  <Text className="text-gray-100 font-semibold w-full text-center">
                    Add to routes
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        ""
      )}
    </View>
  );
};
export default React.memo(RenderItem);
