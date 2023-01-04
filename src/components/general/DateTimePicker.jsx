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
      value: date instanceof Date ? date : new Date(),
      onChange,
      mode: currentMode,
      is24Hour: false,
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
      className="w-[100%] flex-row items-center justify-around relative border-[1px] bg-gray-100  border-gray-200 h-[55px] rounded-md"
    >
      <Text className="font-semibold text-gray-700 text-center w-full ">
        {date instanceof Date
          ? `${date.getMonth() + 1}/ ${date.getDate().toLocaleString()}/${date
              .getFullYear()
              .toLocaleString()}`
          : "Select date"}
      </Text>
    </TouchableOpacity>
  );
};

export default DateTimePicker;
