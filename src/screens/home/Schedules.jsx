import React, { useLayoutEffect, useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
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

import DateAgenda from "../../components/schedules/CalendarAgenda/DateAgenda";

import { apiGet } from "../../services/api/axios.method";
import UnattendedSchedules from "../../components/schedules/UnattendedSchedules";

// rreact-navigation/native
import { useIsFocused } from '@react-navigation/native';

const Schedules = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
 
  const [selectedPlace, setSelectedPlace] = useState(null);

  const today = () => {
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
    const date = new Date();
    const current_date = `${
      monthNames[date?.getMonth()]
    }, ${date?.getDate()}, ${date?.getFullYear().toLocaleString()}`;
    const day = weekdays[date?.getDay()];
    return { string_date: current_date, day };
  };

  // get list of barangay
  const isFocused = useIsFocused();
  const [places, setPlaces] = useState([]);
  async function getAllBarangay() {
    const { data, error } = await apiGet("/api/customer/distinct/places");
    if (data?.data && !error) {
      setPlaces(data?.data);
    } else {
      setPlaces([]);
    }
  }
  useEffect(() => {
    if(isFocused){
      getAllBarangay();
    }
    
  }, [isFocused]);
  // kapag wala pa naselect na place automatic mag set sa unang place mula rsa places array
  useEffect(() => {
    if (!selectedPlace) {
      setSelectedPlace(places[0]);
    }
  }, [places]);

  // unattended schedules modal
  const [isShowUnattendedSchedules, setIsShowUnattendedSchedules] =
    useState(false);

  return (
    <View
      className={Platform.OS === "android" ? "flex-1 mt-0 bg-gray-100" : "pt-0"}
    >
      {/* modal */}
      <UnattendedSchedules
        isShow={isShowUnattendedSchedules}
        setIsShow={setIsShowUnattendedSchedules}
      />
      <View className="flex-1 bg-white p-2 z-10">
        <Text className="text-center text-[21px] font-bold text-gray-600">
          Schedules
        </Text>
        <View className="flex-row justify-between items-center">
          <View className="">
            <View>
              <Text className="font-bold text-[28px] text-gray-700">Today</Text>
              <Text>{today().string_date}</Text>
            </View>
          </View>
          <View className="flex-row">
            <TouchableOpacity
              onPress={() =>
                setIsShowUnattendedSchedules(!isShowUnattendedSchedules)
              }
              className=""
            >
              <MatIcons name="calendar-arrow-left" size={32} />
            </TouchableOpacity>
          </View>
        </View>

        <View className=" w-full flex-row mt-2 ">
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {places.map((place) => (
              <TouchableOpacity
                key={place}
                onPress={() => setSelectedPlace(place)}
              >
                <Text
                  className="font-bold text-center px-3 py-[5px] ml-1 rounded-full border-[1px] border-[#2389DA]"
                  style={
                    selectedPlace === place
                      ? { backgroundColor: "#2389DA", color: "white" }
                      : {}
                  }
                >
                  {place}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* calendar */}
        <DateAgenda selected_place={selectedPlace} />
      </View>
    </View>
  );
};

export default Schedules;
