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
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppTextInput from "../../../components/general/AppTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { apiPost } from "../../../services/api/axios.method";

const AuthEnterOtp = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const { gmail } = route.params;

  const [isSubmitting, setIsSubmitting] = useState(false);
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
            setIsSubmitting(true);
            const { data, error } = await apiPost({
              url: "/auth/verify-top/personel",
              payload: {
                gmail: gmail,
                otp: values?.otp,
              },
            });
            console.log("data", data);
            if (data?.data?.gmail && data?.data?.token) {
              setIsSubmitting(false);
              navigation.navigate("new password", {
                otp: data?.data?.token,
                gmail: data?.data?.gmail,
              });
            } else if (error?.response?.data?.code === 409) {
              Alert.alert("Please enter a valid OTP");
            } else {
              setIsSubmitting(false);
              Alert.alert("Something went wrong, please try again.");
              console.log("[ERROR FORGOT PASSWORD.]", error);
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
                  <Text className="text-gray-50 font-bold">
                    {isSubmitting ? <ActivityIndicator /> : "Submit"}
                  </Text>
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
