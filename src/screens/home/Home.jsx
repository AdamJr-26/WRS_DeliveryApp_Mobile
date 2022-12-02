import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../hooks/auth";
import heroes from "../../../assets/hero";
const Home = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const window = useWindowDimensions();
  const deviceViewHeight = window.height;

  const { user } = useAuth();
  console.log("user", user);
  return (
    <View
      className={Platform.OS === "android" ? "pt-8  flex-1" : "pt-0 flex-1"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex gap-2 p-3 bg-white"
      >
        <View className="flex gap-y-2">
          <Ionicons name="menu-outline" size={32} color="gray" />
          <View className="flex gap-y-1">
            <Text className="font-bold text-[24px] text-gray-600">
              Hello, {user?.firstname} {user?.lastname}
            </Text>
            <Text className="font-semibold text-gray-500 ">
              Have a safe ride.
            </Text>
          </View>
        </View>

        <View className="flex justify-center items-center relative h-[400px] border-[1px] border-gray-300 p-[10px]  rounded-xl ">
          <Text className="absolute top-2 font-bold text-[24px] text-gray-700">
            No Delivery
          </Text>
          <Image source={heroes?.delivery_truck} className="h-[45%] w-full " />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("New", {
                screen: "New Delivery",
              });
            }}
            className="absolute bottom-2 bg-[#2389DA] w-[80%] p-4 rounded-xl "
          >
            <Text className="text-white text-center font-semibold ">
              Create Now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
