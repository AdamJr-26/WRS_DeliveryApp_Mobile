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
import AuthEmailTextInput from "../../../components/auth/AuthEmailTextInput";
// import AuthTextInput from "../../../components/auth/AuthTextInput";
const AuthSendOtp = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

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
            source={require("../../../../assets/hero/forgot.png")}
            className=" w-full h-full object-contain "
          />
        </View>
        <View className="p-2 mt-3">
          <Text className="text-[32px] font-bold text-gray-700">
            Forgot Password?
          </Text>
          <Text className="font-semibold text-gray-500 text-[13px] mt-3">
            Don't worry! it happens. Please enter the address associated with
            your account.
          </Text>
          <Formik
            initialValues={{ gmail: "" }}
            validationSchema={Yup.object().shape({
              gmail: Yup.string()
                .email("Please enter valid email")
                .required("Email Address is Required"),
            })}
            onSubmit={async (values) => {
              try {
                const res = await axios.post("/auth/send-otp/personel", values);
                if(res.data){
                  navigation.navigate("Enter OTP",{gmail: values.gmail})
                }
              } catch (error) {
                console.log("errrrrrror", error);
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
                <View className="mt-3">
                  <AuthEmailTextInput
                    values={values.gmail}
                    label="Enter Email"
                    placeholder="youremail@gmail.com"
                    onChangeText={handleChange("gmail")}
                    onBlur={handleBlur("gmail")}
                    errors={errors.gmail}
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
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthSendOtp;
