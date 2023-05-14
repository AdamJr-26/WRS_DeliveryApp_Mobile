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
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppTextInput from "../../../components/general/AppTextInput";
import AppButton from "../../../components/general/AppButton";
import { useAuth } from "../../../hooks/auth";
import * as Yup from "yup";
import { Formik } from "formik";
import ErrorMessageModal from "../../../components/general/modal/ErrorMessageModal";
import heroes from "../../../../assets/hero";
import { apiPost } from "../../../services/api/axios.method";
import CustomStatusBar from "../../../components/general/CustomStatusBar";

const EnterOTP = ({ route, navigation }) => {
  const { email, sendOnRender } = route.params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  // send vefify otp.
  const { verifyPersonel } = useAuth();
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };
  const windowHeight = Dimensions.get("screen").height;
  // resend
  const [isResending, setIsResending] = useState(false);
  const resend = () => {
    setIsResending(true);
    const { data, error } = apiPost({
      url: "/auth/resend-otp",
      payload: { gmail: email },
    });
    if (data && !error) {
      setIsResending(false);
    } else {
      setIsResending(false);
    }
  };
  useEffect(() => {
    if (sendOnRender) {
      resend();
    }
  }, []);
  return (
    <View className="flex-col flex-1 justify-between w-full bg-white p-0 ml-[-2px]">
      <CustomStatusBar />
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={Yup.object().shape({
          otp: Yup.string().max(16, "OTP must not exceed 16 letters"),
        })}
        onSubmit={async (values) => {
          setIsSubmitting(true);
          const { res, error } = await verifyPersonel({
            otp: values?.otp,
            gmail: email,
          });
          const data = res?.data;
          if (data?.code === 201 && !error) {
            // display modal taht verification was success and
            //redirecting to login with "ok" button
            setIsSubmitting(false);
            navigation.navigate("Login");
            Alert.alert("Your account has been verified successfully.");
          } else {
            setIsSubmitting(false);
            Alert.alert("Failed to verify.");
            // display modal that verification is failed and resend again.
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
            {/* modal================================== */}
            <ErrorMessageModal
              message="Something went wrong, please try again."
              toggleModal={toggleErrorModal}
              isModalVisible={isErrorModalVisible}
              animationOutTiming={200}
            />
            {/* =============================================== */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex-col gap-y-5 ">
                <View className="justify-center ">
                  <View>
                    <View
                      style={{
                        height: windowHeight / 4,
                        width: windowHeight / 4,
                        overflow: "hidden",
                      }}
                      className="bg-gray-200 self-center"
                    >
                      <Image
                        source={heroes.verify}
                        className="h-full w-full "
                      />
                    </View>
                  </View>

                  <Text className="p-2 font-semibold text-[14px] mb-5">
                    Hello, {email} we've sent you a one time password. Please
                    check your mail.
                  </Text>

                  <View className="bg-gray-100 m-1 p-5 rounded-xl flex-col gap-y-3">
                    <Text className="text-[20px] font-bold text-center">
                      Verify Email
                    </Text>
                    <TextInput
                      className="bg-white h-[60px] font-bold rounded-xl border-[#2389DA] border-[2px] text-center"
                      placeholder="r4ND0MstR"
                      values={values.otp}
                      onChangeText={handleChange("otp")}
                      onBlur={handleBlur("otp")}
                      errors={errors.otp}
                    />
                    {errors && (
                      <Text className="text-red-500 font-400 text-[10px] ">
                        {errors.otp}
                      </Text>
                    )}
                  </View>
                </View>
                <View className="flex-row gap-1">
                  <Text>Didn't receive the code?</Text>
                  <TouchableOpacity onPress={resend}>
                    <Text className="font-bold text-[#2389DA]">
                      {isResending ? "sending..." : "resend"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <View className="h-[50px] items-center justify-center">
              {/* <Text>loadding screen when trying to resent request</Text> */}
            </View>
            <AppButton onPress={handleSubmit} text="Verify" />
          </>
        )}
      </Formik>
    </View>
  );
};

export default EnterOTP;
