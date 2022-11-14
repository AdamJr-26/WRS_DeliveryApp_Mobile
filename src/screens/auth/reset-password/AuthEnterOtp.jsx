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
import { Formik } from "formik";
import * as Yup from "yup";
import { axios } from "../../../services/api/axios";
const AuthEnterOtp = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const { gmail } = route.params;
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
            source={require("../../../../assets/hero/otp.png")}
            className=" w-full h-full object-contain "
          />
        </View>
        <View className="p-2 mt-3">
          <Text className="text-[32px] font-bold text-gray-700">Enter OTP</Text>
          <Text className="font-semibold text-gray-500 text-[13px] mt-3">
            An 4 digit code has been sent to your {gmail}
          </Text>
        </View>
        <Formik
          initialValues={{
            otp: "",
          }}
          validationSchema={Yup.object().shape({
            otp: Yup.string().required("OTP is Required"),
          })}
          onSubmit={async (values) => {
            try {
              const res = await axios.post("/auth/verify-top/personel", {
                gmail: gmail,
                otp: values.otp,
              });
              const data = res.data.data;
              console.log("res.data", data.token);
              if (data.gmail && data.token) {
                navigation.navigate("new password", {
                  otp: data.token,
                  gmail: data.gmail,
                });
              }
              
            } catch (error) {
              console.log("errror", error.response);
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
              <View className="mt-5">
                <AppTextInput
                  placeholder="OTP"
                  values={values.otp}
                  label="Enter OTP"
                  onChangeText={handleChange("otp")}
                  onBlur={handleBlur("otp")}
                  errors={errors.otp}
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

export default AuthEnterOtp;
