import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DeliveryRoutes from "../../components/myroutes/DeliveryRoutes";
import AssignedSchedules from "../../components/myroutes/AssignedSchedules";
const Routes = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [routeTab, setRouteTab] = useState("routes");
  return (
    <View className="flex-1 bg-white gap-y-2">
      {/* Route tab */}
      <View className="flex-row gap-x-5 border-b-[1px] border-gray-200 border-opacity-10 pt-4 pl-4 ">
        <TouchableOpacity
          onPress={() => setRouteTab("routes")}
          className="flex-col justify-between items-center shrink gap-y-2  rounded-full"
        >
          <Text className="text-[20px] font-bold">Routes</Text>
          {routeTab === "routes" ? (
            <View className=" bottom-0 left-0 bg-[#2389DA] h-[5px] rounded-full w-[50px]"></View>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRouteTab("assigned-schedules")}
          className="flex-col justify-between items-center shrink gap-y-2 rounded-full"
        >
          <Text className="text-[20px] font-bold">Assigned</Text>
          {routeTab === "assigned-schedules" ? (
            <View className=" bottom-0 left-0 bg-[#2389DA] h-[5px] rounded-full w-[50px]"></View>
          ) : null}
        </TouchableOpacity>
      </View>
      {/* if the tab is routes */}
      <View className="px-4 pt-2">
        {routeTab === "routes" ? <DeliveryRoutes /> : <AssignedSchedules />}
      </View>
    </View>
  );
};

export default Routes;
