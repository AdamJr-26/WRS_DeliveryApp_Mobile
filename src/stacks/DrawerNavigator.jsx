import { View, Text } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';

import BottomTabNavigator from './BottomTabNavigator';
import UserStackNavigator from './UserStackNavigator';
const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
        <Drawer.Screen name ="Main" component={BottomTabNavigator} />
        <Drawer.Screen name ="User" component={UserStackNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator;
