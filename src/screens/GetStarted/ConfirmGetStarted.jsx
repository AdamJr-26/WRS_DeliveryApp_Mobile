import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect } from "react";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import heroes from "../../../assets/hero";
import { useAuth } from "../../hooks/auth/index";
import useFetch from "../../hooks/api/swr/useFetch";

const ConfirmGetStarted = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowHeight = Dimensions.get("screen").height;
  const { revalidateUser, logout } = useAuth();
  const { data } = route.params;
  const { data: admin, error } = useFetch({ url: "/api/admin/basic-info" });
  
  console.log("adminadminadmin", admin);
  return (
    <View className={Platform.OS === "android" ? "pt-5 flex-1 " : "pt-0"}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="p-3 w-full bg-white"
      >
        {!admin ? (
          <View className="h-[100%] w-[100%] items-center justify-center">
            <ActivityIndicator />
          </View>
        ) : (
          <View className="flex justify-between h-full ">
            <View className="flex-1 h-full bg-white py-10">
              <Text className="text-[24px] font-bold text-gray-600">
                <Text className="font-bold text-green-700">
                  Congratulations
                </Text>
                , you are now applied to:
              </Text>
              <View className="mt-5">
                <MatIcon name="check-circle" size={32} color="#2389DA" />
              </View>
            </View>
            <View className="flex gap-y-5">
              <View
                style={{
                  height: windowHeight / 4,
                  width: windowHeight / 4,
                  overflow: "hidden",
                }}
                className="bg-gray-200 self-center rounded-full border-[1px] border-gray-200"
              >
                <Image
                  source={admin?.data?.wrs_image}
                  className="h-full w-full "
                />
              </View>
              <Text className="font-bold text-[24px] text-center">
                {admin?.data?.wrs_name}
              </Text>
              <Text className="mt-10 text-gray-500 text-center">
                {admin?.data?.address?.barangay +
                  " " +
                  admin?.data?.address?.city}
              </Text>
              <TouchableOpacity
                onPress={() => revalidateUser()}
                className="h-[60px] rounded-xl bg-[#2389DA] flex items-center justify-center"
              >
                <Text className=" text-center font-medium text-white">
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>
            <View className="p-y-5 mt-5 ">
              <Text className="text-center text-gray-500">
                If you want to use other account, please log out first.
              </Text>
              <TouchableOpacity onPress={logout}>
                <Text className="font-bold text-[#2389DA] text-center">
                  Log out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ConfirmGetStarted;
