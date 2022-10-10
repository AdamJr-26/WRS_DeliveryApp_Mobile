import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
const SearchTextinput = () => {
  return (
    <View className="flex-row items-center bg-white p-2 border-[1px] border-gray-200 rounded-xl ">
    <Ionicons name="search" size={20} color="gray" />
    <TextInput className="ml-2 w-full" placeholder="Search" />
  </View>
  )
}

export default SearchTextinput