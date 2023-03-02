
import React from "react";
import {
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";


const CustomStatusBar = () => {
  return (
    <StatusBar
      animated={true}
      backgroundColor="#2389DA"
      barStyle="light-content"
      hidden={false}
    />
  );
};

export default CustomStatusBar;
