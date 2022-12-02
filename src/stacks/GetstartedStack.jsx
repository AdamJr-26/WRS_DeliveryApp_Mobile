import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Apply from "../screens/GetStarted/Apply";
import ConfirmGetStarted from "../screens/GetStarted/ConfirmGetStarted";

const GetstartedStack = () => {
  
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Apply" component={Apply} />
      <Stack.Screen name="Get Started" component={ConfirmGetStarted} />
    </Stack.Navigator>
  );
};

export default GetstartedStack;
