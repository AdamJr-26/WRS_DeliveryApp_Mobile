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
const AuthSendOtp = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

  const onSubmit = ()=>{
    if(true){
        navigation.navigate("enter otp")
    }
  }
  return (
    <View className={Platform.OS === "android" ? "pt-5 " : "pt-0"}>
      <ScrollView showsVerticalScrollIndicator={false} className="p-2">
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
        <View className="p-2 mt-3">
          <Text className="text-[32px] font-bold text-gray-700">
            Forgot Password?
          </Text>
          <Text
          className="font-semibold text-gray-500 text-[13px] mt-3">
            Don't worry! it happens. Please enter the address associated with
            your account.
          </Text>

          <View className="mt-3">
            <AuthTextInput iconName="at" placeholder="Email ID " />
          </View>
          <TouchableOpacity onPress={onSubmit} className="mt-5 p-4 bg-[#2389DA] flex-row items-center justify-center rounded-2xl">
            <Pressable>
              <Text className="text-gray-50 font-bold">Submit</Text>
            </Pressable>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthSendOtp;
