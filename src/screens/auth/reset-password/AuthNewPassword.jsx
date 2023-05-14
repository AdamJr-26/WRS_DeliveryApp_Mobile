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
  Alert,
} from "react-native";
import React, { useEffect } from "react";
// import AuthTextInput from "../../../components/auth/AuthTextInput";
import MatComIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppTextInput from "../../../components/general/AppTextInput";
import { Formik } from "formik";
import * as Yup from "yup";

import AuthPasswordTextInput from "../../../components/auth/AuthPasswordTextInput";
import { apiPost } from "../../../services/api/axios.method";
import CustomStatusBar from "../../../components/general/CustomStatusBar";

const AuthNewPassword = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const { otp, gmail } = route.params;
  const onSubmit = () => {
    if (true) {
      navigation.navigate("Login");
    }
  };
  return (
    <View className={Platform.OS === "android" ? "pt-0 " : "pt-0"}>
      <CustomStatusBar />
      <ScrollView showsVerticalScrollIndicator={false} className="p-2">
        <View
          style={{
            height: windowHeight / 3,
          }}
          className="w-full rounded-xl relative overflow-hidden "
        >
          <Image
            source={require("../../../../assets/hero/reset.png")}
            className=" w-full h-full object-contain "
          />
        </View>
        <View className="p-2 mt-3">
          <Text className="text-[32px] font-bold text-gray-700">Reset </Text>
          <Text className="text-[32px] font-bold text-gray-700">Password</Text>
        </View>
        <Formik
          initialValues={{
            new_password: "",
            confirm_new_password: "",
          }}
          validationSchema={Yup.object().shape({
            new_password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .max(16, "Password must not exceed 16 letters")
              .required("Password is required"),
            confirm_new_password: Yup.string()
              .oneOf([Yup.ref("new_password"), null], "Password must match")
              .min(6, "Password must be aleast 6 characters")
              .max(16, "Password must not exceed 16 letters")
              .required("Confirm password is required"),
          })}
          onSubmit={async (values) => {
            const { data, error } = await apiPost({
              url: "/auth/new-password/personel",
              payload: {
                gmail: gmail,
                token: otp,
                new_password: values.new_password,
                confirm_new_password: values.confirm_new_password,
              },
            });
            if (data && !error) {
              Alert.alert("Your password has been changed successfully.");
              navigation.navigate("Login");
            } else {
              console.log("errorrrr", error);
              Alert.alert("session Expired, please try again");
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <View className="flex-col">
                <AuthPasswordTextInput
                  placeholder="New Password"
                  label="New Password"
                  values={values.new_password}
                  onChangeText={handleChange("new_password")}
                  onBlur={handleBlur("new_password")}
                  errors={errors.new_password}
                />
                <AuthPasswordTextInput
                  placeholder="Confirm New Password"
                  label="Confirm New Password"
                  values={values.confirm_new_password}
                  onChangeText={handleChange("confirm_new_password")}
                  onBlur={handleBlur("confirm_new_password")}
                  errors={errors.confirm_new_password}
                />
              </View>
              <TouchableOpacity
                disabled={!isValid}
                onPress={handleSubmit}
                className="mt-5 p-4 bg-[#2389DA] flex-row items-center justify-center rounded-2xl"
              >
                <Pressable>
                  <Text className="text-gray-50 font-bold">Submit</Text>
                </Pressable>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default AuthNewPassword;
