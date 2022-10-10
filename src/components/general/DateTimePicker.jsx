import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
const DateTimePicker = () => {
  const [date, setDate] = useState(new Date());

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
    <TouchableOpacity  onPress={showDatepicker} className="w-[100%] flex-row items-center justify-between" >
      <Text className="font-semibold text-gray-700">
        {date.getMonth().toLocaleString()}-
        {date.getDay().toLocaleString()}-{date.getFullYear().toLocaleString()}
      </Text>
      <Ionicons name="arrow-down-circle-outline" size={25}  />
    </TouchableOpacity>
  );
};

export default DateTimePicker;
