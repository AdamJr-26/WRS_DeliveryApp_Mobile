import React, { useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NewCustomer from "../screens/new.screen.stack/NewCustomer";
import NewDelivery from "../screens/new.screen.stack/NewDelivery";
import NewOrder from "../screens/new.screen.stack/NewOrder";
import New from "../screens/home/New";
import NewSchedule from "../screens/new.screen.stack/NewSchedule";

import DeliverOrder from "../screens/deliveries.screen.stack/DeliverOrder";
const MainStackNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Add" component={New} />
      <Stack.Screen name="New Customer" component={NewCustomer} />
      <Stack.Screen name="New Delivery" component={NewDelivery} />
      <Stack.Screen name="New Order" component={NewOrder} />
      <Stack.Screen name="New Schedule" component={NewSchedule} />
      {/* this screen when you click delivery button in deliveries */}
      <Stack.Screen name="Deliver Order" component={DeliverOrder} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
