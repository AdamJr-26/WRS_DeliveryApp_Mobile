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
  const today = (date_string) => {
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
    const date = new Date(date_string);
    const current_date = `${
      monthNames[date?.getMonth()]
    }, ${date?.getDate()}, ${date?.getFullYear().toLocaleString()}`;
    const day = weekdays[date?.getDay()];
    return { string_date: current_date, day };
  };

  return (
    <TouchableOpacity
      onPress={showDatepicker}
      className="w-[100%] flex-row items-center justify-around relative border-[1px] bg-gray-100  border-gray-200 h-[55px] rounded-md"
    >
      <Text className="font-semibold text-gray-700 text-center w-full ">
        {date instanceof Date
          ? today(date).string_date
          : "Select date"}
      </Text>
    </TouchableOpacity>
  );
};

export default DateTimePicker;
