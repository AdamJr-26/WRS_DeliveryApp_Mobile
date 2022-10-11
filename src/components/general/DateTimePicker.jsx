import { View, Text, Button, TouchableOpacity, useEffect } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
const DateTimePicker = ({ date, setDate }) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  return (
    <TouchableOpacity
      onPress={showDatepicker}
      className="w-[100%] flex-row items-center justify-around relative"
    >
      <Text className="font-semibold text-gray-700 text-center w-full ">
        {date.getMonth().toLocaleString()}-{date.getDay().toLocaleString()}-
        {date.getFullYear().toLocaleString()}
      </Text>
      <View className="">
        <Ionicons name="arrow-down-circle-outline" size={25} />
      </View>
    </TouchableOpacity>
  );
};

export default DateTimePicker;
