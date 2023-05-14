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
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppTextInput from "../../../components/general/AppTextInput";
import { Formik } from "formik";
import AuthEmailTextInput from "../../../components/auth/AuthEmailTextInput";
import AuthPasswordTextInput from "../../../components/auth/AuthPasswordTextInput";
import { useAuth } from "../../../hooks/auth";
import * as Yup from "yup";

import AppButton from "../../../components/general/AppButton";
import PromptModal from "../../../components/general/modal/PromptModal";
import ErrorMessageModal from "../../../components/general/modal/ErrorMessageModal";
import DateTimePicker from "../../../components/general/DateTimePicker";
import CustomStatusBar from "../../../components/general/CustomStatusBar";

const AuthSignup = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // modal
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  // error modal
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // not verified account
  const [verifyEmail, setVerifyEmail] = useState();
  const [verifyModal, setVerifyModal] = useState(false);
  const toggleNotVerifiedModal = () => {
    setVerifyModal(!verifyModal);
  };

  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

  const { signUp } = useAuth();

  const signupValidation = Yup.object().shape({
    gmail: Yup.string()
      .email("Please enter valid gmail")
      .lowercase()
      .required("Gmail Address is Required"),
    nickname: Yup.string(),
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string(),
    age: Yup.number(),
    contact_number: Yup.number(),
    address: Yup.string(),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must not exceed 16 letters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .min(6, "Password must be aleast 6 characters")
      .max(16, "Password must not exceed 16 letters")
      .required("Confirm password is required"),
  });
  // karugtong ng form
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");

  return (
    <Formik
      validationSchema={signupValidation}
      initialValues={{
        wrs_id: "",
        gmail: "",
        nickname: "",
        firstname: "",
        lastname: "",
        contact_number: "",
        age: "",
        address: "",
        password: "",
        confirm_password: "",
      }}
      onSubmit={async (values) => {
        setIsSubmitting(true);
        values["gender"] = gender;
        values["birthday"] = Math.floor(new Date(birthday).valueOf() / 1000);
        values?.gmail.toLowerCase();
        const { res, error } = await signUp(values);

        if (res?.data.code === 200 && !error) {
          const { isExist, success, verified, gmail } = res.data.data;
          // data": {"isExist": true, "success": false, "verified": false}
          if (isExist && !verified && !success && gmail) {
            // toggleNotVerifiedModal(gmail)
            setVerifyEmail(gmail);
            setIsSubmitting(false);
            toggleNotVerifiedModal();
            console.log(
              "existing but not verified yet and asking if continue or forgot password"
            );
          } else if (success && !isExist && !verified) {
            // if the register success and user not existing.
            console.log("navigating to enter otp");
            navigation.navigate("Verify Signup", { email: gmail });
            setIsSubmitting(false);
          } else if (!success && isExist && verified) {
            // if verified
            toggleModal();
            setIsSubmitting(false);
          } else {
            toggleErrorModal();
            setIsSubmitting(false);
          }
        } else {
          toggleErrorModal();
          console.log(res);
          setIsSubmitting(false);
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
        <View className={Platform.OS === "android" ? "pt-0 " : "pt-0"}>
          <CustomStatusBar />
          {/* modalssss----------------------------------------------- */}
          <PromptModal
            confirmText="Login"
            confirmHandler={() => {
              navigation.navigate("Login");
            }}
            message="Account already exists"
            toggleModal={toggleModal}
            isModalVisible={isModalVisible}
            animationOutTiming={200}
          />
          <PromptModal
            confirmText="Verify"
            confirmHandler={() => {
              console.log("verifyEmail", verifyEmail);
              navigation.navigate("Verify Signup", {
                email: verifyEmail,
                sendOnRender: true,
              });
            }}
            message="This email is already exist, but not verified yet. do you want to verify now?"
            toggleModal={toggleNotVerifiedModal}
            isModalVisible={verifyModal}
            animationOutTiming={200}
          />
          <ErrorMessageModal
            message="Something went wrong, please try again."
            toggleModal={toggleErrorModal}
            isModalVisible={isErrorModalVisible}
            animationOutTiming={200}
          />
          {/*  -------------------------------------------------------- */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                height: windowHeight / 3,
              }}
              className="w-full rounded-xl overflow-hidden  p-2"
            >
              <Image
                source={require("../../../../assets/hero/signup.png")}
                className=" w-full h-full object-contain rounded-xl "
              />
            </View>
            <Text className=" text-[32px] font-bold text-gray-600 p-2">
              Sign up
            </Text>
            <View className="p-2 flex-1 flex-col bg-white rounded-xl">
              <AuthEmailTextInput
                values={values.gmail.toLowerCase()}
                label="Email"
                placeholder="sample@gmail.com"
                onChangeText={handleChange("gmail")}
                onBlur={handleBlur("gmail")}
                errors={errors.gmail}
              />
              <AppTextInput
                values={values.nickname}
                label="Nickname"
                placeholder="Totoy"
                onChangeText={handleChange("nickname")}
                onBlur={handleBlur("nickname")}
                errors={errors.nickname}
              />
              <AppTextInput
                values={values.firstname}
                label="Firstname"
                placeholder="Juan"
                onChangeText={handleChange("firstname")}
                onBlur={handleBlur("firstname")}
                errors={errors.firstname}
              />
              <AppTextInput
                values={values.lastname}
                label="Lastname"
                placeholder="Dela Cruz"
                onChangeText={handleChange("lastname")}
                onBlur={handleBlur("lastname")}
                errors={errors.lastname}
              />
              <View>
                <Text className="mt-2 font-bold text-gray-600">
                  Select gender
                </Text>
                <View className="flex-row mt-2 ">
                  <TouchableOpacity>
                    <Pressable
                      onPress={() => setGender("Female")}
                      className={
                        gender === "Female"
                          ? "border-[2px] border-blue-400 p-2 rounded-xl w-[100px] items-center justify-center ml-2"
                          : "border-[1px] border-gray-300 p-2 rounded-xl w-[100px] items-center justify-center ml-2"
                      }
                    >
                      <Text>Female</Text>
                    </Pressable>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Pressable
                      onPress={() => setGender("Male")}
                      className={
                        gender === "Male"
                          ? " border-[2px] border-blue-400 p-2 rounded-xl w-[100px] items-center justify-center ml-2"
                          : "border-[1px] border-gray-300 p-2 rounded-xl w-[100px] items-center justify-center ml-2"
                      }
                    >
                      <Text>Male</Text>
                    </Pressable>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="mt-2">
                <Text className="font-semibold">Birthday</Text>
                <DateTimePicker date={birthday} setDate={setBirthday} />
              </View>
              <AppTextInput
                values={values.firstname}
                label="Contact Number"
                keyboardType="numeric"
                placeholder="09xxxxxxxxx"
                onChangeText={handleChange("contact_number")}
                onBlur={handleBlur("contact_number")}
                errors={errors.contact_number}
              />
              <AppTextInput
                values={values.address}
                label="Addresss"
                placeholder="Addresss"
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                errors={errors.address}
              />
              <AuthPasswordTextInput
                placeholder="Password"
                label="Password"
                values={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                errors={errors.password}
              />
              <AuthPasswordTextInput
                placeholder="Confirm Password"
                label="Confirm Password"
                values={values.confirm_password}
                onChangeText={handleChange("confirm_password")}
                onBlur={handleBlur("confirm_password")}
                errors={errors.confirm_password}
              />
            </View>
            <Text className="mt-5 p-2 text-gray-500 font-regular text-[13px] ">
              By signing up, you agree to our{" "}
              <Text className="font-bold text-[#2389DA]">
                Terms and Conditions
              </Text>{" "}
              and{" "}
              <Text className="font-bold text-[#2389DA]">Privacy Policy</Text>
            </Text>
            <View className="m-2">
              <AppButton
                disabled={!isValid}
                onPress={handleSubmit}
                text="Sign Up"
                isLoading={isSubmitting}
              />
            </View>
            <View>
              <Text className="text-center text-gray-500  mt-2">
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
      )}
    </Formik>
  );
};

export default AuthSignup;
