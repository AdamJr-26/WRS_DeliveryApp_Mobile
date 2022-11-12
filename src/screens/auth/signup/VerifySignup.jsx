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
import AppButton from "../../../components/general/AppButton";
import { useAuth } from "../../../hooks/auth";
import * as Yup from "yup";
import { Formik } from "formik";
import ErrorMessageModal from "../../../components/general/modal/ErrorMessageModal";

const EnterOTP = ({ route, navigation }) => {
  const { email } = route.params;
  console.log(email);
  const { verifyPersonel } = useAuth();
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };

  return (
    <View className="flex-col flex-1 justify-between w-full bg-white p-2 ml-[-2px]">
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={Yup.object().shape({
          otp: Yup.string().max(16, "OTP must not exceed 16 letters"),
        })}
        onSubmit={async (values) => {
          const { res, error } = await verifyPersonel({
            otp: values.otp,
            gmail: email,
          });
          const data = res?.data;
          if (data.code === 201 && !error) {
            // display modal taht verification was success and
            //redirecting to login with "ok" button
            navigation.navigate("Login");
          } else {
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
            <View className="flex-col gap-y-5 ">
              <View className="justify-center h-[150px]">
                <Text className="text-center text-[16px] text-gray-600 font-medium mb-5">
                  Code has sent to your email {email}
                </Text>
                <AppTextInput
                  placeholder="OTP"
                  label="Enter OTP"
                  values={values.otp}
                  onChangeText={handleChange("otp")}
                  onBlur={handleBlur("otp")}
                  errors={errors.otp}
                />
              </View>
              <View className="flex-row gap-2 my-5">
                <Text>Didn't receive the code?</Text>
                <TouchableOpacity>
                  <Text className="font-bold text-[#2389DA]">
                    Request Again
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
