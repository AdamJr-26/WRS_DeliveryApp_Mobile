import { View, Text, Button, TouchableOpacity, Dimensions } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MatcomIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MatIcons from "react-native-vector-icons/MaterialIcons";
const getVW = Dimensions.get("screen").width;
const getVH = Dimensions.get("screen").height;
const NewScreenOptions = ({ navigation }) => {
  return (
    <View>
      <View>
        <Text></Text>
      </View>
      <View
        style={{ height: getVH, width: getVW }}
        className="flex-col justify-center items-center"
      >
        <View className="w-full gap-2 flex flex-row flex-wrap justify-center ">
          <TouchableOpacity
            onPress={() => navigation.navigate("New Delivery")}
            style={{ height: getVW / 3, width: getVW / 3 }}
            className="bg-white rounded-xl shadow-xl shadow-gray-600 flex-col items-center justify-center"
          >
            <View className="flex-col justify-center items-center">
              <MatcomIcons
                name="truck-plus-outline"
                size={40}
                color="#2389DA"
              />
            </View>
            <Text className="font-bold text-gray-800 text-center mt-3">
              Delivery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("New Customer")}
            style={{ height: getVW / 3, width: getVW / 3 }}
            className="bg-white rounded-xl shadow-xl shadow-gray-600 flex-col items-center justify-center"
          >
            <View className="flex-col justify-center items-center">
              <MatcomIcons
                name="account-multiple-plus"
                size={40}
                color="#2389DA"
              />
            </View>
            <Text className="font-bold text-gray-800 text-center mt-3">
              Customer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.navigate("Deliver Order",{
            params: {schedule: []}
          })}
            style={{ height: getVW / 3, width: getVW / 3 }}
            className="bg-white rounded-xl shadow-xl shadow-gray-600 flex-col items-center justify-center"
          >
            <View className="flex-col justify-center items-center">
              <MatcomIcons name="border-color" size={40} color="#2389DA" />
            </View>
            <Text className="font-bold text-gray-800 text-center mt-3">
              Deliver order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.navigate("New Schedule")}
            style={{ height: getVW / 3, width: getVW / 3 }}
            className="bg-white rounded-xl shadow-xl shadow-gray-600 flex-col items-center justify-center"
          >
            <View className="flex-col justify-center items-center">
              <MatIcons name="schedule" size={40} color="#2389DA" />
            </View>
            <Text className="font-bold text-gray-800 text-center mt-3">
              Schedule
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewScreenOptions;
