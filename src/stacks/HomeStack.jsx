import { View, Text, Button } from "react-native";
import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

import MyRoutes from "../screens/home/MyRoutes";
import Customers from "../screens/home/Customers";
import Home from "../screens/home/Home";
import Schedules from "../screens/home/Schedules";
import NewStackNavigator from "./NewStackNavigator";
import MyTabBar from "./NavigationOptions/MyTabBar";

const HomeStack = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator 
    tabBar={(props) => <MyTabBar {...props} 
    />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="My Routes" component={MyRoutes} />
      <Tab.Screen name="New" component={NewStackNavigator} />
      <Tab.Screen name="Schedules" component={Schedules} />
      <Tab.Screen name="Customers" component={Customers} />
    </Tab.Navigator>
  );
};

export default HomeStack;
