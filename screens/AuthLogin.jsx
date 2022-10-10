import {
  View,
  Text,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import AuthTextInput from "../components/AuthTextInput";

const Login = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

  return (
    <View className={Platform.OS === "android" ? "pt-5 flex-1" : "pt-0"}>
      {/* form */}
      <ScrollView className="flex-1 flex-col  p-2 overflow-hidden">
        <View
          style={{
            height: windowHeight / 3,
          }}
          className="w-full rounded-xl overflow-hidden "
        >
          <Image
            source={{
              uri: "https://www.pngmart.com/files/21/Food-Delivery-Transparent-Images-PNG.png",
            }}
            className=" w-full h-full object-contain "
          />
        </View>
        <Text className=" text-[32px] font-bold text-gray-600 p-2">Log in</Text>
        <View className="p-2 flex-col ">
          <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <AuthTextInput placeholder="your_email@gmail.com" iconName="at" />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <AuthTextInput placeholder="Password" iconName="lock-outline" type="password" />
            </TouchableWithoutFeedback>
          </View>

          <View classNam="flex-row flex-wrap text-gray-200 "></View>
          <View className="flex-row justify-end">
            <Text
              className="font-bold text-[#2389DA] "
              onPress={() => navigation.navigate("forgot password")}
            >
              Forgot Password
            </Text>
          </View>
          <TouchableOpacity className="mt-5 p-4 bg-[#2389DA] flex-row items-center justify-center rounded-2xl">
            <Pressable>
              <Text className="text-gray-50 font-bold">Login</Text>
            </Pressable>
          </TouchableOpacity>
          <Text className="text-center text-gray-500  mt-3 ">
            Don't have an account yet?{" "}
            <Text
              className="font-bold  text-[#2389DA]"
              onPress={() => navigation.navigate("Signup")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
// https://picsum.photos/200/300
