import { View, Text, Button } from "react-native";
import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import MyRoutes from "../screens/home/MyRoutes";
import Customers from "../screens/home/Customers";
import Home from "../screens/home/Home";
import Schedules from "../screens/home/Schedules";
import NewStackNavigator from "./NewStackNavigator";



const HomeStack = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
            size = focused ? size + 5: size + 0
          }
          else if(route.name === "My Routes"){
            iconName = focused ? "map-marker-radius" : "map-marker-radius-outline"
            size = focused ? size + 5: size + 0
          }
          else if(route.name === "New"){
            iconName = focused ? "plus" : "plus"
            size = focused ? size + 10: size + 5
          }
          else if(route.name === "Schedules"){
            iconName = focused ? "calendar-multiselect" : "calendar-multiselect"
            size = focused ? size + 5: size + 0
          }
          else if(route.name === "Customers"){
            iconName = focused ? "face-man-profile" : "face-man-profile"
            size = focused ? size + 5: size + 0
          }
          
          return <MatIcon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#2389DA",
        tabBarInactiveTintColor: "gray",
        
      
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="My Routes" component={MyRoutes} />
      <Tab.Screen name="New" component={NewStackNavigator} />
      <Tab.Screen name="Schedules" component={Schedules} />
      <Tab.Screen name="Customers" component={Customers} />
    </Tab.Navigator>
  );
};

export default HomeStack;
