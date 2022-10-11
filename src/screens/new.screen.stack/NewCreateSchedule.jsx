import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Button,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "../../components/general/DateTimePicker";

const NewCreateSchedule = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  return (
    <View className={Platform.OS === "android" ? "flex-1" : "pt-0"}>
      <ScrollView className="px-2">
        <View className="border-[1px] border-gray-300 bg-white p-2 flex-row items-center rounded-xl overflow-hidden shadow-2xl shadow-gray-400 mt-2">
          <View className="flex-row items-center justify-center w-[50px] h-[50px] ">
            <Image
              source={{
                uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
              }}
              className=" w-full h-full rounded-xl "
            />
          </View>
          {/*  */}
          <View className="flex-col gap-1 ml-2">
            <Text className="font-bold text-gray-600 text-[19px]">
              Juan Dela Cruz
            </Text>
            <Text className="text-gray-500 font-semibold ">
              #434 Mahogany st. Bunsuran 1st
            </Text>
            <View className="bg-yellow-600 rounded-full overflow-hidden">
              <Text className=" w-auto text-center text-gray-50 font-semibold text-[12px]">
                regular
              </Text>
            </View>
          </View>
        </View>
        {/* date */}
        <View className="mt-2">
          <View className="bg-white rounded-xl shadow-sm shadow-gray-500 px-3 py-2">
            <Text className="text-gray-700 font-bold">Select Date</Text>
            <DateTimePicker date={date} setDate={setDate} />
          </View>
        </View>
        {/* gallons */}
            <View>
              
            </View>
      </ScrollView>
    </View>
  );
};

export default NewCreateSchedule;
