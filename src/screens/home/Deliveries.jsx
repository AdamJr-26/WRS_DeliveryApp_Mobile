

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
import RenderSortTableView from "../../components/deliveries/RenderSortTableView";
import useFetch from "../../hooks/api/swr/useFetch";

const Delivery = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const getVW = Dimensions.get("screen").width;
  const getVH = Dimensions.get("screen").height;

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
