import {
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-native-modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AppTextInput from "../../general/AppTextInput";
import Ionicons from "react-native-vector-icons/Ionicons";
import { apiPost } from "../../../services/api/axios.method";
const NewExpenseModal = ({ isShow, setIsShow }) => {
  const fieldValidation = Yup.object().shape({
    expense_title: Yup.string().required("Title is required"),
    amount: Yup.number().required("Amount is required"),
    description: Yup.string(),
  });
  const initialValues = {
    expense_title: "",
    amount: "",
    description: "",
  };
  const onSubmit = async (values) => {
    const { data, error } = await apiPost({
      url: "/api/expense",
      payload: values,
    });
    if (data && !error) {
      setIsShow(false);
      ToastAndroid.show(
        "New expense successfully submitted",
        ToastAndroid.SHORT
      );
    } else {
      ToastAndroid.show(
        "Something went wrong, please try again.",
        ToastAndroid.SHORT
      );
    }
  };


  return (
    <Modal
      isVisible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow);
      }}
    >
      <View className="bg-slate-100 rounded-lg p-2 shadow-sm flex ">
        <View className="my-2 flex-row items-center justify-between">
          <Text className="text-[16px] font-semibold text-gray-700">
            New expense
          </Text>
          <TouchableOpacity onPress={() => setIsShow(false)} className="">
            <Text>
              <Ionicons name="close" size={24} />
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Formik
            validationSchema={fieldValidation}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <View>
                <AppTextInput
                  values={values.expense_title}
                  label="Title"
                  placeholder="Title"
                  onChangeText={handleChange("expense_title")}
                  onBlur={handleBlur("expense_title")}
                  errors={errors.expense_title}
                />
                <AppTextInput
                  values={values.amount}
                  label="Amount"
                  placeholder="0"
                  onChangeText={handleChange("amount")}
                  onBlur={handleBlur("amount")}
                  errors={errors.amount}
                  keyboardType="numeric"
                />
                <AppTextInput
                  values={values.description}
                  label="Description"
                  placeholder="0"
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  errors={errors.description}
                />
                <View className=" bottom-0 mt-4 flex-row p-2 items-center justify-center gap-x-1 opacity-80">
                  <TouchableOpacity
                    onPress={() => setIsShow(!isShow)}
                    className="flex-row w-[49%]  bg-white p-2 h-[50px] border-[1px] border-[#2389DA]  items-center justify-center rounded-full"
                  >
                    <Text className="text-[#2389DA] bg-white font-bold text-center">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    className="flex-row w-[49%] bg-[#2389DA] p-2 h-[50px]  items-center justify-center rounded-full"
                  >
                    <Text className="text-white font-bold ml-2">Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

export default NewExpenseModal;
