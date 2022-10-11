import React, { useLayoutEffect, useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { TextInput } from 'react-native-gesture-handler';
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
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "../../components/general/DateTimePicker";

import { SafeAreaView } from "react-native-safe-area-context";
import { orders } from "../../services/utils/dummyData";
import SchedulesRenderItem from "../../components/schedules/SchedulesRenderItem";

const Ordered = () => {
  const renderItem = ({ item }) => <SchedulesRenderItem item={item} />;
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.map((item) => (
          <SchedulesRenderItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
// ------------------------------------------------------
const Scheduled = () => {
  return (
    <View>
      <Text>Scheduled</Text>
    </View>
  );
};
// ----------------------------
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
// ----------------------------------

const Schedules = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [placesModalIsVisible, setPlacesModalIsVisible] = useState(false);
  const [scheduleType, setScheduleType] = useState("scheduled");
  
  const [date, setDate] = useState(new Date());

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={Platform.OS === "android flex-1" ? "pt-5" : "pt-0"}
      >
        <View className="flex-col ">
          <View className="p-2">
            <View className="flex-row items-center bg-white p-2 border-[1px] border-gray-200 rounded-xl ">
              <Ionicons name="search" size={20} color="gray" />
              <TextInput className="ml-2 w-full" placeholder="Search" />
            </View>
          </View>
        </View>
        <Text>{date.getMonth().toString()}</Text>
        <Text className="px-2 font-semibold">Schedule Type</Text>
        <View className="p-2">
          <View className="w-full p-1 bg-gray-200 flex-row rounded-md">
            <Pressable
              style={
                scheduleType === "scheduled"
                  ? {
                      backgroundColor: "white",
                    }
                  : {}
              }
              onPress={() => setScheduleType("scheduled")}
              className="flex w-[50%] justify-center items-center rounded-md p-2 transition-all ease-in-out"
            >
              <Text className="font-bold text-gray-800">Scheduled</Text>
            </Pressable>
            <Pressable
              style={
                scheduleType === "ordered"
                  ? {
                      backgroundColor: "white",
                    }
                  : {}
              }
              onPress={() => setScheduleType("ordered")}
              className="flex w-[50%] justify-center items-center rounded-md p-2 transition-all ease-in-out"
            >
              <Text className="font-bold text-gray-800">Ordered</Text>
            </Pressable>
          </View>
          <View>
            <Text className="font-bold text-gray-800 mt-2">Filter By:</Text>
          </View>
          <View className="flex-row gap-1 w-[100%] mt-2">
            <View className="w-[50%] p-2 shadow-md shadow-blue-500 bg-gray-50  rounded-xl flex-row items-center justify-between">
              <DateTimePicker date={date} setDate={setDate} />
            </View>
            <TouchableOpacity
              onPress={() => setPlacesModalIsVisible(!placesModalIsVisible)}
              className="w-[50%] p-2 shadow-md shadow-blue-500 bg-gray-50  rounded-xl flex-row items-center justify-between"
            >
              <Text className="font-semibold text-gray-800">Select Places</Text>
              <Ionicons name="arrow-down-circle-outline" size={25} />
            </TouchableOpacity>
            {/* modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={placesModalIsVisible}
              onRequestClose={() => {
                setPlacesModalIsVisible(!placesModalIsVisible);
              }}
            >
              <View
                className="flex-col items-center justify-center"
                style={{
                  height: deviceHeight,
                  width: deviceWidth,
                }}
              >
                <View
                  style={{ height: deviceHeight / 2, width: deviceWidth - 50 }}
                  className="flex-col justify-between bg-white shadow-lg shadow-gray-200 rounded-xl p-3"
                >
                  <View>
                    <Text className="font-bold text-gray-800">Places:</Text>
                  </View>
                  <ScrollView>
                    {[
                      "masuso",
                      "bunsuran 1",
                      "bunsuran 2",
                      "bunsuran 3",
                      "villa elise",
                      "masagana",
                      "bagong bario",
                      "poblacion",
                      "santol",
                    ].map((item, i) => (
                      <TouchableOpacity
                        key={i}
                        className="p-2 bg-gray-100 m-1 rounded-xm"
                      >
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    onPress={() =>
                      setPlacesModalIsVisible(!placesModalIsVisible)
                    }
                    className="w-full flex-row items-center justify-center  bg-[#2389DA] rounded-full p-2"
                  >
                    <Text className="text-gray-50">Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        {scheduleType === "scheduled" ? <Scheduled /> : <Ordered />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Schedules;
