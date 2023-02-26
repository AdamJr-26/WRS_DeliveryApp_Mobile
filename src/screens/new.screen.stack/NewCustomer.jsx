import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
  RefreshControl,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback } from "react";
import AppTextInput from "../../components/general/AppTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { createCustomer } from "../../services/api/api.create.customer";
import { Buffer } from "buffer";
import AuthEmailTextInput from "../../components/auth/AuthEmailTextInput";

const ActionNewCustomer = ({ navigation }) => {
  // REFRESH
  const [refreshing, setIsRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
  }, []);

  // IMAGE PICK
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result?.cancelled) {
        // console.log("[resImage]", result);
        const resImage = {
          buffer: Buffer.from(result?.base64, "base64"),
          uri: result.uri,
          type: result.type,
          originalname: result?.uri,
          height: result.height,
          mimetype: result?.type,
        };
        setImage(resImage);
      } else {
        setImage(null);
      }
    } catch (error) {
      setImage(null);
      console.log("error", error);
    }
  };
  console.log("image", image?.uri);
  // FORMIK
  const customerInitialValue = {
    firstname: "",
    lastname: "",
    mobile_number: "",
    gmail: "",
    province: "",
    municipal_city: "",
    barangay: "",
    street: "",
  };
  const customerValidation = Yup.object().shape({
    firstname: Yup.string()
      .max(30, "Must not exceed 30 letters")
      .required("Firstname is required"),
    lastname: Yup.string().max(30, "Must not exceed 30 letters"),
    mobile_number: Yup.string().max(
      11,
      "Invalid mobile number, please start with 09"
    ),
    gmail: Yup.string().email(),
    province: Yup.string()
      .max(30, "Must not exceed 30 letters")
      .required("Province is required"),
    municipal_city: Yup.string().max(30, "Must not exceed 30 letters"),
    barangay: Yup.string()
      .max(30, "Must not exceed 30 letters")
      .required("Barangay is required"),
    street: Yup.string().max(30, "Must not exceed 30 letters"),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <View className="flex-col flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="p-2 rounded-xl shadow-lg shadow-gray-400 bg-white "
      >
        <Formik
          initialValues={customerInitialValue}
          validationSchema={customerValidation}
          onSubmit={async (values, actions) => {
            if (isSubmitting) return;
            const address = {
              province: values?.province,
              municipal_city: values.municipal_city,
              barangay: values.barangay,
              street: values.street,
            };
            const body = {
              address,
              firstname: values.firstname,
              lastname: values.lastname,
              mobile_number: values.mobile_number,
              gender,
              gmail: values.gmail,
            };
            const file = image;
            setIsSubmitting(true);
            const { data, error } = await createCustomer(file, body);
            if (data && !error) {
              setIsSubmitting(false);
              console.log("data", data);
              setImage(null);
              setGender(null);
              actions.resetForm({ values: customerInitialValue });
              navigation.navigate("Customers");
              ToastAndroid.show("Created a new customer", ToastAndroid.LONG);
              navigation.goBack();
            } else {
              setIsSubmitting(false);
              ToastAndroid.show(
                "Attempting to create a new customer failed",
                ToastAndroid.LONG
              );
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
            <View className="mb-5">
              <View className="items-center justify-center">
                <Text>Pick an image</Text>
                {image?.uri ? (
                  <Pressable
                    onPress={() => setImage(null)}
                    className="absolute right-10 bg-[#2389DA] p-1 rounded-xl "
                  >
                    <Text className="text-white">Remove</Text>
                  </Pressable>
                ) : (
                  ""
                )}
                <TouchableOpacity
                  onPress={pickImage}
                  className="mt-2 h-[100px] w-[100px] border-[2px] border-gray-100 items-center justify-center rounded-lg"
                >
                  {image ? (
                    <Image
                      source={{
                        uri: image?.uri,
                      }}
                      className=" w-[100px] h-[100px] rounded-xl "
                    />
                  ) : (
                    <Ionicons name="image" size={32} />
                  )}
                </TouchableOpacity>
              </View>
              <View className="mt-5">
                <View className="flex ">
                  <Text className="tex-[16px] font-bold text-gray-600 text-center">
                    Basic Info
                  </Text>
                  <View className="p-1">
                    <AppTextInput
                      label="Firstname"
                      values={values.firstname}
                      placeholder="Juan"
                      onChangeText={handleChange("firstname")}
                      onBlur={handleBlur("firstname")}
                      errors={errors.firstname}
                    />
                    <AppTextInput
                      label="Lastname"
                      values={values.lastname}
                      placeholder="Dela Cruz"
                      onChangeText={handleChange("lastname")}
                      onBlur={handleBlur("lastname")}
                      errors={errors.lastname}
                    />
                    <AppTextInput
                      label="Mobile number"
                      values={values.mobile_number}
                      placeholder="09xxxxxxxxx"
                      onChangeText={handleChange("mobile_number")}
                      keyboardType="numeric"
                      onBlur={handleBlur("mobile_number")}
                      errors={errors.mobile_number}
                    />
                    <AuthEmailTextInput
                      values={values.gmail.toLowerCase()}
                      label="Email Address"
                      placeholder="sample@gmail.com"
                      onChangeText={handleChange("gmail")}
                      onBlur={handleBlur("gmail")}
                      errors={errors.gmail}
                    />

                    <View>
                      <Text className="mt-2 font-bold text-gray-600">
                        Select gender
                      </Text>
                      <View className="flex-row mt-2 ">
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
                      </View>
                    </View>
                    <View className="flex mt-5">
                      <Text className="tex-[16px] font-bold text-gray-600 text-center">
                        Address
                      </Text>
                      <AppTextInput
                        label="Province"
                        values={values.province}
                        placeholder="Province"
                        onChangeText={handleChange("province")}
                        onBlur={handleBlur("province")}
                        errors={errors.province}
                      />
                      <AppTextInput
                        label="Municipality / City"
                        values={values.municipal_city}
                        placeholder="Municipality / City"
                        onChangeText={handleChange("municipal_city")}
                        onBlur={handleBlur("municipal_city")}
                        errors={errors.municipal_city}
                      />
                      <AppTextInput
                        label="Barangay"
                        values={values.barangay}
                        placeholder="Barangay"
                        onChangeText={handleChange("barangay")}
                        onBlur={handleBlur("barangay")}
                        errors={errors.barangay}
                      />
                      <AppTextInput
                        label="House no. street"
                        values={values.street}
                        placeholder="House no. street"
                        onChangeText={handleChange("street")}
                        onBlur={handleBlur("street")}
                        errors={errors.street}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View className="flex-row items-center justify-between w-full mt-5">
                <TouchableOpacity className="w-[49%] bg-gray-200 py-3 rounded-3xl">
                  <Text className="w-full text-center  font-semibold text-gray-700">
                    Reset
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="w-[49%] bg-[#2389DA] py-3 rounded-3xl"
                >
                  {isSubmitting ? (
                    <View className="flex-row items-center justify-center">
                      <ActivityIndicator size={24} color="white" />
                      <Text className="ml-2 text-center  font-semibold text-gray-50">
                        Creating...
                      </Text>
                    </View>
                  ) : (
                    <Text className="w-full text-center  font-semibold text-gray-50">
                      Create
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default ActionNewCustomer;
