import {
  View,
  Text,
  Button,
  Image,
  DrawerLayoutAndroid,
  useWindowDimensions,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Home = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const drawer = useRef();
  const window = useWindowDimensions();
  const deviceViewHeight = window.height;
  useEffect(() => {
    return () => {
      drawer.current.closeDrawer();
    };
  }, []);
  const DrawerLayout = () => (
    <View className=" flex-col">
      <View className="bg-gray-700 px-3 py-10 gap-3 w-fit relative flex-col items-center justify-center">
        <View className="absolute top-2 left-2">
          <MatIcon
            onPress={() => drawer.current.closeDrawer()}
            name="close"
            size={30}
            color="#FFFFFF"
          />
        </View>
        <View className="w-[120px] h-[120px] border-2 border-blue-500 rounded-full p-1">
          <Image
            source={{
              uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
            }}
            className=" w-full h-full rounded-full "
          />
        </View>
        <View className="flex flex-col justify-center items-center">
          <Text className="text-[24px] text-gray-100 font-bold whitespace-nowrap">
            Adam Marcaida Jr.
          </Text>
          <Text className="text-gray-300 font-semibold">Nickname: Pogi</Text>
        </View>
      </View>
      <View className={`flex-col justify-between h-[475px]`}>
        {/* navigation */}
        <View className="p-3 flex-col gap-3">
          <TouchableOpacity className="flex flex-row relative  items-center px-2 py-4  border-[1px] bg-blue-50 border-gray-200 rounded-lg ">
            <MatIcon name="security" size={25} color="gray" />
            <Text className="text-[16px] font-regular ml-2">
              Change Password
            </Text>
            <View className="absolute right-2 ">
              <MatIcon name="arrow-right" size={25} color="#2389DA" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row relative  items-center px-2 py-4  border-[1px] bg-blue-50 border-gray-200 rounded-lg ">
            <MatIcon name="home-switch" size={25} color="gray" />
            <Text className="text-[16px] font-regular ml-2">
              Change Station
            </Text>
            <View className="absolute right-2 ">
              <MatIcon name="arrow-right" size={25} color="#2389DA" />
            </View>
          </TouchableOpacity>
        </View>
        {/* logout */}
        <View>
          <TouchableOpacity className="flex-row items-center justify-center gap-2 ">
            <MatIcon name="logout" size={25} color='gray' />
            <Text className="text-[19px] font-semibold text-red-900">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="right"
      renderNavigationView={DrawerLayout}
    >
      <View className={Platform.OS === "android" ? "pt-5" : "pt-0"}>
        <View className="flex flex-col  bg-gray-700 h-[100px] p-2">
          <View className=" flex-row p-4 mt-2 w-full items-center justify-between  ">
            <View className="flex-row  items-center gap-3 h-auto w-auto outline-dotted">
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
                }}
                className="h-7 w-7 bg-gray-300 p-4 rounded-full"
              />
              <View className="flex-col">
                <Text className="text-[12px] text-gray-300">Welcome,</Text>
                <Text className="text-[16px] text-gray-50">Adam Marcaida</Text>
              </View>
            </View>
            <View className="flex-1 items-end ">
              <MatIcon
                onPress={() => drawer.current.openDrawer()}
                name="menu-open"
                color="#FFFFFf"
                size={30}
              />
            </View>
          </View>
        </View>
        {/* delivery list */}
        <View className=" bg-gray-100  h-full relative">
          <View className="h-[100px] bg-gray-700"></View>
          <View className="absolute top-2 mx-[5%] bg-white h-[200px] w-[90%] rounded-xl p-2 shadow-xl">
            <View className="flex-row gap-3 items-center justify-center">
              <MatIcon
                name="truck-delivery-outline"
                size={20}
                color="#2389DA"
              />
              <Text className="text-[#2389DA]">My Delivery</Text>
            </View>
          </View>
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default Home;
