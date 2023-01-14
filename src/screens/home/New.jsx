import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MatcomIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MatIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
const getVW = Dimensions.get("screen").width;
const getVH = Dimensions.get("screen").height;

import { ScrollView } from "react-native-gesture-handler";

const New = ({ navigation }) => {
  // const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  // #2389DA

  return (
    <View
      className={
        Platform.OS === "android" ? "pt-5 flex-1 h-full bg-slate-50" : "pt-0"
      }
    >
      <ScrollView>
        <View className="flex-1 h-full">
          <View className=" bg-white p-2 rounded-xl">
            <View className="flex-row items-center">
              <Text className="font-bold text-gray-600 text-[16px] mr-2">
                Create
              </Text>
              <View className="p-1 border-[1px] border-gray-300 rounded-full h-[20px] w-[20px] items-center justify-center">
                <MatcomIcons name="information-variant" size={10} />
              </View>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {[
                {
                  iconName: "truck-plus-outline",
                  label: "Delivery",
                  route: "New Delivery",
                  params: {},
                },
                {
                  iconName: "account-multiple-plus",
                  label: "Customer",
                  route: "New Customer",
                  params: {},
                },
                {
                  iconName: "border-color",
                  label: "Purchase",
                  route: "Deliver Order",
                  params: {
                    schedule: [],
                  },
                },
                {
                  iconName: "calendar-edit",
                  label: "Schedule",
                  route: "New Schedule",
                  params: {
                    customer: [],
                  },
                },
              ].map((elem, i) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(elem.route, { params: elem.params })
                  }
                  key={i}
                  className="flex-row p-2 mr-4"
                >
                  <View className=" rounded-xl items-center justify-between">
                    <View className="bg-blue-50 h-[75px] w-[75px] rounded-full items-center justify-center">
                      <MatcomIcons
                        name={elem.iconName}
                        size={32}
                        color="#2389DA"
                      />
                    </View>
                    <Text className="font-semibold mt-1 ">{elem.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View className="bg-white p-2 mt-2 rounded-xl">
            <View className="flex-row items-center">
              <Text className="font-bold text-gray-600 text-[16px] mr-2">
                Others
              </Text>
              <View className="p-1 border-[1px] border-gray-300 rounded-full h-[20px] w-[20px] items-center justify-center">
                <MatcomIcons name="information-variant" size={10} />
              </View>
            </View>
            <TouchableOpacity className="flex-row items-center justify-between px-2 py-4">
              <View className="flex-row items-center">
                <View className="items-center justify-center bg-gray-100 p-3 rounded-xl">
                  <MatcomIcons name="cash-minus" size={19} color="gray" />
                </View>
                <Text className="ml-4 font-bold ">New expense</Text>
              </View>
              <View className="items-center justify-center">
                <Ionicons name="chevron-forward-outline" size={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default New;
