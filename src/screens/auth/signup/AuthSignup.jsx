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
} from "react-native";
import React, { useEffect } from "react";
import AppTextInput from "../../../components/general/AppTextInput";
import { Formik } from "formik";
import AuthEmailTextInput from "../../../components/auth/AuthEmailTextInput";
import AuthPasswordTextInput from "../../../components/auth/AuthPasswordTextInput";
import { useAuth } from "../../../hooks/auth";
import * as Yup from "yup";

import AppButton from "../../../components/general/AppButton";
import UserExistsNoVerifiedModal from "../../../components/auth/UserExistsNoVerifiedModal";
import ErrorMessageModal from "../../../components/general/modal/ErrorMessageModal";
const AuthSignup = ({ navigation }) => {
  // modal
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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
    wrs_id: Yup.string(),
    gmail: Yup.string()
      .email("Please enter valid gmail")
      .required("Gmail Address is Required"),
    nickname: Yup.string(),
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string(),
    age: Yup.number(),
    gender: Yup.string(),
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

  return (
    <Formik
      validationSchema={signupValidation}
      initialValues={{
        wrs_id: "",
        gmail: "adam@gmail.com ",
        nickname: "",
        firstname: "adam",
        lastname: "",
        contact_number: "",
        age: "19",
        gender: "male",
        address: "",
        password: "adam123",
        confirm_password: "adam123",
      }}
      onSubmit={async (values) => {
        const { res, error } = await signUp(values);
        if (res?.data.code === 200 && !error) {
          const { isExist, success, verified, gmail } = res.data.data;
          // data": {"isExist": true, "success": false, "verified": false}
          if (isExist && !verified && !success) {
            // if the user is existing but not yet verified then redirect to verification page/otp.
            // pop up modal tell that the account is already exist but not yet verified. ask if forgot password or continue to verify.
            toggleModal();
            console.log(
              "existing but not verified yet and asking if continue or forgot password"
            );
          } else if (success && !isExist && !verified) {
            // if the register success and user not existing.
            console.log("navigating to enter otp");
            navigation.navigate("Verify Signup", { email: gmail });
          } else if (!success && isExist && verified) {
            // if verified
            toggleModal();
          } else {
            toggleErrorModal();
          }
        } else {
          toggleErrorModal();
          console.log(res);
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
        <View className={Platform.OS === "android" ? "pt-6 " : "pt-0"}>
          {/* modalssss----------------------------------------------- */}
          <UserExistsNoVerifiedModal
            message="Account already exists"
            toggleModal={toggleModal}
            isModalVisible={isModalVisible}
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
              className="w-full rounded-xl overflow-hidden p-2"
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
              <View className="my-5">
                <AppTextInput
                  values={values.wrs_id}
                  label="WRS ID"
                  placeholder="ex. Jhsk01"
                  onChangeText={handleChange("wrs_id")}
                  onBlur={handleBlur("wrs_id")}
                  errors={errors.wrs_id}
                />
              </View>
              <AuthEmailTextInput
                values={values.gmail}
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
              <AppTextInput
                values={values.gender}
                label="Gender"
                placeholder="Select Gender"
                onChangeText={handleChange("gender")}
                onBlur={handleBlur("gender")}
                errors={errors.gender}
              />
              <AppTextInput
                values={values.age}
                label="Age"
                keyboardType="numeric"
                placeholder=""
                onChangeText={handleChange("age")}
                onBlur={handleBlur("age")}
                errors={errors.age}
              />
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
                label="Adresss"
                placeholder="Adresss"
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                errors={errors.address}
              />
              <AuthPasswordTextInput
                label="Password"
                values={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                errors={errors.password}
              />
              <AuthPasswordTextInput
                label="Confirm Password"
                values={values.password}
                onChangeText={handleChange("confirm_password")}
                onBlur={handleBlur("confirm_password")}
                errors={errors.confirm_password}
              />
            </View>
            <Text className="mt-5 p-2 text-gray-500 font-regular text-[13px] ">
              By signing up, you're agree to our{" "}
              <Text className="font-bold text-[#2389DA]">
                Terms and Conditions
              </Text>{" "}
              and{" "}
              <Text className="font-bold text-[#2389DA]">Privacy Policy</Text>
            </Text>
            <AppButton
              disabled={!isValid}
              onPress={handleSubmit}
              text="Sign Up"
            />
            <View>
              <Text className="text-center text-gray-500  mt-3 ">
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
