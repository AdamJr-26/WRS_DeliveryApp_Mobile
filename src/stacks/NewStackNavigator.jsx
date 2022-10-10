import { View, Text } from 'react-native'
import React, { useLayoutEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActionNewCustomer from '../screens/ActionNewCustomer';
import ActionNewDelivery from '../screens/ActionNewDelivery';
import AddScreen from '../screens/AddScreen';
import ActionNewOrder from '../screens/ActionNewOrder';
const MainStackNavigator = ({navigation}) => {
    const Stack = createNativeStackNavigator()
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen name='Add' component={AddScreen} />
        <Stack.Screen name='New Customer' component={ActionNewCustomer} />
        <Stack.Screen name='New Delivery' component={ActionNewDelivery} />
        <Stack.Screen name='Deliver Order' component={ActionNewOrder} />
    </Stack.Navigator>
  )
}

export default MainStackNavigator;