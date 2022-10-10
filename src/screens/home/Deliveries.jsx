

import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { TextInput } from 'react-native-gesture-handler';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Button,
  Pressable,
} from "react-native";
import { DragSortableView } from "react-native-drag-sort";
import { orders } from "../../services/utils/dummyData";

const Delivery = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const getVW = Dimensions.get("screen").width;
  const getVH = Dimensions.get("screen").height;

  const RenderSortTableView = ({ item, index }) => (
    <View className="flex-col mt-2 p-3  bg-white rounded-xl shadow-xl ">
      <TouchableOpacity className="flex-row items-center  gap-3 relative ">
        <View className="w-[50px] h-[50px] rounded-full">
          <Image
            source={{
              uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
            }}
            className=" w-full h-full rounded-full "
          />
        </View>
        <View>
          <Text className="text-[19px] font-bold text-gray-700">
            {item.name}
          </Text>
          <Text className="text-[12px] font-semibold text-gray-600">
            {item.address}
          </Text>
          {/* <Text className="text-[12px] font-semibold text-gray-600">{item.}</Text> */}
        </View>
        <View className="absolute right-2">
          <Ionicons name="arrow-down-circle-sharp" size={25} color="gray" />
        </View>
      </TouchableOpacity>
      <View className="h-[2px] bg-gray-200 w-full mt-2"></View>
      {/* expandable */}
      <View className="p-3">
        <View className="flex-row items-center  ">
          <View className="p-2 bg-gray-200 rounded-full  ">
            <Ionicons name="call" size={16} />
          </View>
          <Text className="font-bold ml-2">{item.contact_number} </Text>
        </View>
        <View className="flex-col">
          <Text className="font-bold mt-3">Orders</Text>
          <View>
            <Text>Item 1</Text>
            <Text>Item 2</Text>
            <Text>Item 3</Text>
          </View>
        </View>
        <View className="flex-row mt-2 w-full">
          <Pressable className="bg-gray-200 px-4 py-2 rounded-full w-50"><Text className="text-gray-800 font-semibold ">Remove</Text></Pressable>
          <Pressable className="bg-[#2389DA] px-4 py-2 ml-2 rounded-full w-50"><Text className="text-gray-100 font-semibold ">Deliver</Text></Pressable>
          {/* <Button className="rounded-xl " title="Remove" />
          <Button className="rounded-xl " title="Deliver" /> */}
        </View>
      </View>
    </View>
  );

  return (
    <View className={Platform.OS === "android" ? "pt-5" : "pt-0"}>
      <ScrollView showsVerticalScrollIndicator={false} className="p-3 w-full">
        <View className="flex-row items-center bg-white p-2 border-[1px] border-gray-200 rounded-xl ">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput className="ml-2 w-full" placeholder="Search" />
        </View>
        <View className="p-2 mt-3 flex-row"><Ionicons name="map-outline" size={20} /><Text className=" font-bold text-gray-800 ml-2">Your Routes</Text></View>
        {/* order list */}
        <View className="flex-col  w-full p-3  rounded-xl">
        
          {orders.map((item, index) => (
            <RenderSortTableView key={item.id} item={item} index={index} />
          ))}

          {/* <DragSortableView
            dataSource={orders}
            parentWidth={getVW}
            childrenWidth={getVW}
            childrenHeight={100}
            keyExtractor={(item, index) => item.id}
            sortable={true}
            renderItem={(item, index) => {
              return <RenderSortTableView item={item} index={index} />;
            }}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Delivery;
