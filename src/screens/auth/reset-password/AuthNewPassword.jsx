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
// import AuthTextInput from "../../../components/auth/AuthTextInput";
import MatComIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppTextInput from "../../../components/general/AppTextInput";

const AuthNewPassword = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

  const onSubmit = () => {
    if (true) {
      navigation.navigate("Login");
    }
  };
  return (
    <View className={Platform.OS === "android" ? "pt-5 " : "pt-0"}>
      <ScrollView showsVerticalScrollIndicator={false} className="p-2">
        <View
          style={{
            height: windowHeight / 3,
          }}
          className="w-full rounded-xl relative overflow-hidden "
        >
          <Image
            source={require('../../../../assets/hero/reset.png')}
            className=" w-full h-full object-contain "
          />
        </View>
        <View className="p-2 mt-3">
          <Text className="text-[32px] font-bold text-gray-700">Reset </Text>
          <Text className="text-[32px] font-bold text-gray-700">Password</Text>
        </View>
        <View className="gap-y-10 mt-2">
          <AppTextInput label="New Password" placeholder="New Password" />
          <AppTextInput label="Confirm New Password" placeholder="Confirm New Password" />
           
        </View>
        <TouchableOpacity
          onPress={onSubmit}
          className="mt-5 p-4 bg-[#2389DA] flex-row items-center justify-center rounded-2xl"
        >
          <Pressable>
            <Text className="text-gray-50 font-bold">Submit</Text>
          </Pressable>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AuthNewPassword;
