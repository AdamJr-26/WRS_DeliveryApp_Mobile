import { View, Text } from 'react-native'
import React from 'react'
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
const HomeDrawerLayout = () => {
  return (
    <View className="p-3 rounded-xl bg-gray-400">
      <View><MatIcon name='close' size={20} /> </View>
    </View>
  )
}

export default HomeDrawerLayout;
