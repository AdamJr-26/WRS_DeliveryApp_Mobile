import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import heroes from "../../../assets/hero";
import { Formik } from "formik";
import * as Yup from "yup";
import { apiPut } from "../../services/api/axios.put";
import { useAuth } from "../../hooks/auth";
import { useSWRConfig } from "swr";
import CustomStatusBar from "../../components/general/CustomStatusBar";

const Apply = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowHeight = Dimensions.get("screen").height;
  const { logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useSWRConfig();
  return (
    <View className={Platform.OS === "android" ? "pt-5 flex-1" : "pt-0"}>
      <CustomStatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="p-3 w-full bg-white"
      >
        <View
          style={{
            height: windowHeight / 4,
          }}
          className="w-full max-h-[250px] rounded-xl overflow-hidden items-center justify-center"
        >
          <Image
            source={heroes.apply_d}
            className="object-cover w-full h-full m-auto rounded-xl "
          />
        </View>
        <View className="">
          <Formik
            initialValues={{ applyId: "" }}
            validationSchema={Yup.object().shape({
              applyId: Yup.string()
                .required("Apply Id is required.")
                .max(16, "Max apply id is 16 characters/letters"),
            })}
            onSubmit={async (values) => {
              setIsSubmitting(true);
              const { data, error } = await apiPut({
                url: "/api/personel/apply-id",
                payload: values,
              });

              if (data && !error) {
                // mutate
                setIsSubmitting(false);
                mutate("/api/delivery-personel/profile");
                navigation.replace("Get Started", {
                  data,
                });
              } else if (error?.response?.data?.code === 409) {
                Alert.alert("Sorry we cannot find that apply ID");
                setIsSubmitting(false);
              } else {
                console.log("error", error);
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
              <View className="bg-white flex-col ">
                <View className="bg-gray-100 m-2 p-5 rounded-xl flex-col gap-y-3">
                  <Text className="text-[20px] font-bold text-center">
                    Appy ID
                  </Text>
                  <TextInput
                    className="bg-white h-[60px] font-bold rounded-xl border-[#2389DA] border-[2px] text-center"
                    placeholder="KJA35dkKS"
                    values={values.applyId}
                    onChangeText={handleChange("applyId")}
                    onBlur={handleBlur("applyId")}
                    errors={errors.applyId}
                  />
                  {errors && (
                    <Text className="text-red-500 font-400 text-[10px] ">
                      {errors.applyId}
                    </Text>
                  )}
                </View>
                <View>
                  <Text className="text-center font-bold text-[20px]">
                    Get Started
                  </Text>
                  <View className="p-3">
                    <Text className="font-regular text-gray-500 text-[14px] mb-3">
                      1. To get started you must contain apply ID.
                    </Text>
                    <Text className="font-regular text-gray-500 text-[14px] mb-3">
                      2. To obtain your apply ID, contact the administrator of
                      your water refilling station. 
                    </Text>
                    <Text className="font-regular text-gray-500 text-[14px] mb-3">
                      3. Put your ID in the above input field and click Apply.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="h-[60px] rounded-xl bg-[#2389DA] flex items-center justify-center"
                >
                  <Text className=" text-center font-medium text-white">
                    {isSubmitting ? <ActivityIndicator /> : "Apply"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
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
      </ScrollView>
    </View>
  );
};

export default Apply;
