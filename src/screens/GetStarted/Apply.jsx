import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import heroes from "../../../assets/hero";
import { Formik } from "formik";
import * as Yup from "yup";
import { apiPut } from "../../services/api/axios.put";
const Apply = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowHeight = Dimensions.get("screen").height;

  return (
    <View className={Platform.OS === "android" ? "pt-5 flex-1" : "pt-0"}>
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
              const { data, error } = await apiPut({
                url: "/api/personel/apply-id",
                payload: values,
              });
              console.log("data", data);
              if (data && !error) {
                navigation.replace("Get Started");
                
              } else {
                console.log("error", error);
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
                      1. To get started you must contain apply id.
                    </Text>
                    <Text className="font-regular text-gray-500 text-[14px] mb-3">
                      2. To have your apply id, contact your water refilling
                      station admin to create one your appy id.
                    </Text>
                    <Text className="font-regular text-gray-500 text-[14px] mb-3">
                      3. Put your id from above input field and click apply
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="h-[60px] rounded-xl bg-[#2389DA] flex items-center justify-center"
                >
                  <Text className=" text-center font-medium text-white">
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View className="p-y-5 mt-5 ">
            <Text className="text-center text-gray-500">
              If you want to use other account, plase log out first.
            </Text>
            <TouchableOpacity>
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
