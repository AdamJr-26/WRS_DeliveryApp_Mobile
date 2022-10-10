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
import AppTextInput from "../../../components/general/AppTextInput";

const AuthSignup = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

  return (
    <View className={Platform.OS === "android" ? "pt-5 " : "pt-0"}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <Text className=" text-[32px] font-bold text-gray-600 p-2">
          Sign up
        </Text>
        <View className="p-2 flex-1 flex-col">
          <AppTextInput label="Gmail" placeholder="username@gmail.com" />

          <AppTextInput label="Firstname" placeholder="Firstname" />

          <AppTextInput label="Lastname" placeholder="Lastname" />

          <AppTextInput
            label="Contact Number"
            placeholder="Contact Number"
            type="numeric"
          />

          <AppTextInput
            label="Complete Address"
            placeholder="Complete Address"
          />

          <AppTextInput label="Position" placeholder="Position" />

          <AppTextInput label="Password" placeholder="Password" />

          <AppTextInput
            label="Confirm Password"
            placeholder="Confirm Password"
          />
        </View>
        <Text className="mt-5 p-2 text-gray-500 font-regular text-[13px] ">
          By signing up, you're agree to our{" "}
          <Text className="font-bold text-[#2389DA]">Terms and Conditions</Text>{" "}
          and <Text className="font-bold text-[#2389DA]">Privacy Policy</Text>
        </Text>
        <TouchableOpacity className="mt-5 p-4 bg-[#2389DA] flex-row items-center justify-center rounded-2xl">
          <Pressable>
            <Text className="text-gray-50 font-bold">Sign up</Text>
          </Pressable>
        </TouchableOpacity>
        <View>
          <Text className="text-center text-gray-500  mt-3 ">
            Already have an account?{" "}
            <Text
              className="font-bold  text-[#2389DA]"
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthSignup;
