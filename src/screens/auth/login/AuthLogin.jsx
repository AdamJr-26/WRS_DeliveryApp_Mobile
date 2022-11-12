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
  Button,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthEmailTextInput from "../../../components/auth/AuthEmailTextInput";
import AuthPasswordTextInput from "../../../components/auth/AuthPasswordTextInput";
import loginHero from "../../../../assets/hero/login.png";
import { useAuth } from "../../../hooks/auth";
const Login = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const { login } = useAuth();
  const loginValidationSchema = Yup.object().shape({
    gmail: Yup.string()
      .email("Please enter valid gmail")
      .required("Gmail Address is Required"),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  return (
    <View className={Platform.OS === "android" ? "pt-5 flex-1" : "pt-0"}>
      {/* form */}
      <ScrollView className="flex-1 flex-col p-2 overflow-hidden">
        <View
          style={{
            height: windowHeight / 3,
          }}
          className="w-full max-h-[250px] rounded-xl overflow-hidden items-center justify-center"
        >
          <Image
            source={require("../../../../assets/hero/login.png")}
            className="object-cover w-full h-full m-auto rounded-xl "
          />
        </View>
        <Text className=" text-[32px] font-bold text-gray-600 p-2">Log in</Text>
        <View className="p-2 flex-col ">
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ gmail: "", password: "" }}
            onSubmit={async (values) => {
              const { res, error } = await login(values);
              if (res && !error) {
                console.log(res);
              } else {
                console.log(error);
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
                  <Text>{values.gmail}</Text>

                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <AuthEmailTextInput
                      values={values.gmail}
                      label="Email"
                      placeholder="sample@gmail.com"
                      onChangeText={handleChange("gmail")}
                      onBlur={handleBlur("gmail")}
                      errors={errors.gmail}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <AuthPasswordTextInput
                      values={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      errors={errors.password}
                    />
                  </TouchableWithoutFeedback>
                </View>

                <View classNam="flex-row flex-wrap text-gray-200 "></View>
                <View className="flex-row justify-end">
                  <Text
                    className="font-bold text-[#2389DA] "
                    onPress={() => navigation.navigate("forgot password")}
                  >
                    Forgot Password
                  </Text>
                </View>

                <TouchableOpacity
                  disabled={!isValid}
                  className="mt-5 p-4 bg-[#2389DA] flex-row items-center justify-center rounded-2xl"
                >
                  <Pressable onPress={handleSubmit}>
                    <Text className="text-gray-50 font-bold">Login</Text>
                  </Pressable>
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <Text className="text-center text-gray-500  mt-3 ">
            Don't have an account yet?{" "}
            <Text
              className="font-bold  text-[#2389DA]"
              onPress={() => navigation.navigate("Signup")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
// https://picsum.photos/200/300
