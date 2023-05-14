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
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { apiPost } from "../../../services/api/axios.method";
import Modal from "react-native-modal";
import AppTextInput from "../../general/AppTextInput";
import MatIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import useFetch from "../../../hooks/api/swr/useFetch";

const SellGallonModal = ({ isShow, setIsShow }) => {
  const fieldValidation = Yup.object().shape({
    quantity: Yup.number().required("Quantity is required."),
  });
  const initialValues = {
    quantity: "",
  };

  const { data: gallons, error: gallonsError } = useFetch({
    url: "/api/gallons/availables",
  });
  const [selectedGallon, setSelectedGallon] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const {
    data: customers,
    error: customersError,
    mutate: mutateSearch,
    isValidating,
  } = useFetch({
    url: `/api/search/customers/${searchText}`,
  });
  console.log("setOrderTotal", orderTotal);
  //   console.log("selectedGallon", selectedGallon);

  const onSubmit = async (values) => {
    console.log("valuess", values);
    if (selectedCustomer === null || selectedGallon === null) {
      ToastAndroid.show(
        "Please select a gallon and a customer",
        ToastAndroid.SHORT
      );
      return;
    }
    const { data, error } = await apiPost({
      url: "/api/sell-container",
      payload: {
        ...values,
        customer: selectedCustomer?._id,
        gallon: selectedGallon?._id,
        unitPrice: selectedGallon?.containerPrice,
        orderTotal: selectedGallon?.containerPrice * values.quantity,
      },
    });
    if (data && !error) {
      setIsShow(false);
      setSelectedGallon(null)
setSelectedCustomer(null)
      ToastAndroid.show("Sold gallon successfully.", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Failed", ToastAndroid.SHORT);
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
            Sell Gallon
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
                {selectedCustomer ? (
                  <View className="bg-gray-50  h-[120px]  w-[100%] flex items-center justify-center flex-col relative  overflow-hidden rounded-xl py-2">
                    <Image
                      className=" w-[80px] h-[80px] object-contain rounded-xl
                           "
                      style={{ aspectRatio: 1 }}
                      resizeMode="contain"
                      source={{
                        uri: selectedCustomer?.display_photo,
                      }}
                    />
                    <Text className=" font-bold text-gray-500 text-[10px] text-center whitespace-nowrap">
                      {selectedCustomer?.fullName}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setSelectedCustomer(null)}
                      className="bg-[#2389DA]  px-5 py-1 rounded-xl "
                    >
                      <Text className="text-white text-[10px]">Change</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View className="min-h-[150px]">
                    <Text className="font-bold ">Select a customer</Text>
                    <View className="flex-row mt-2 border-[1px] bg-white border-gray-200 rounded-xl h-[55px] items-center p-2 overflow-hidden">
                      <Ionicons name="search" size={24} />
                      <View className="w-full ml-1">
                        <TextInput
                          className="bg-white"
                          placeholder="Search"
                          value={searchText}
                          onChangeText={(text) => setSearchText(text)}
                        />
                      </View>
                    </View>
                    <View>
                      <ScrollView
                        className=""
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                      >
                        {customers?.data?.map((customer, i) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => setSelectedCustomer(customer)}
                            className="h-[120px] w-[100px] flex items-center justify-between flex-col relative  overflow-hidden rounded-xl py-2"
                          >
                            <Image
                              className=" w-[80px] h-[80px] object-contain rounded-xl
                                   "
                              style={{ aspectRatio: 1 }}
                              resizeMode="contain"
                              source={{
                                uri: customer.display_photo,
                              }}
                            />
                            <Text className=" font-bold text-gray-500 text-[10px] text-center whitespace-nowrap">
                              {customer?.fullName}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                )}
                <View>
                  {selectedGallon ? (
                    <View className="h-[150px] bg-gray-50 mt-1 w-[100%] flex items-center justify-center flex-col relative  overflow-hidden rounded-xl py-2">
                      <Image
                        className=" w-[80px] h-[80px] object-contain rounded-xl
                               "
                        style={{ aspectRatio: 1 }}
                        resizeMode="contain"
                        source={{
                          uri: selectedGallon?.gallon_image,
                        }}
                      />
                      <Text className=" font-bold text-gray-500 text-[10px] text-center whitespace-nowrap">
                        {selectedGallon?.name}
                      </Text>
                      <Text className=" font-bold text-gray-500 text-[12p]">
                        ₱ {selectedGallon.containerPrice}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setSelectedGallon(null)}
                        className="bg-[#2389DA]  px-5 py-1 rounded-xl "
                      >
                        <Text className="text-white text-[10px]">Change</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View className="mt-1">
                      <Text className="font-bold ">Select a gallon</Text>
                      <ScrollView
                        className=""
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                      >
                        {gallons?.data?.map((item, i) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => setSelectedGallon(item)}
                            className="h-[120px] w-[100px] flex items-center justify-between flex-col relative  overflow-hidden rounded-xl py-2"
                          >
                            <Image
                              className=" w-[80px] h-[80px] object-contain rounded-xl
                                 "
                              style={{ aspectRatio: 1 }}
                              resizeMode="contain"
                              source={{
                                uri: item.gallon_image,
                              }}
                            />
                            <Text className=" font-bold text-gray-500 text-[10px] text-center whitespace-nowrap">
                              {item?.name}
                            </Text>
                            <Text className=" font-bold text-gray-500 text-[10px]">
                              ₱ {item.containerPrice}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
                <View className="flex flex-col ">
                  <AppTextInput
                    values={values.quantity}
                    label="Quantity"
                    placeholder="0"
                    editable={selectedGallon?.containerPrice ? true : false}
                    onChangeText={(text) => {
                      handleChange("quantity")(text);
                      if (text) {
                        setOrderTotal(text * selectedGallon?.containerPrice);
                      }
                    }}
                    onBlur={handleBlur("quantity")}
                    keyboardType="numeric"
                    errors={errors.quantity}
                  />
                  {/* handleChange('quantity')(text);
              if (text && values.unitPrice) {
                setFieldValue('totalPrice', (text * values.unitPrice).toString());
              } else {
                setFieldValue('totalPrice', '');
              }
            }} */}
                  {/* <AppTextInput
                    values={values.quantity}
                    label="Unit Price ₱"
                    placeholder="0"
                    value={selectedGallon?.containerPrice}
                    onChangeText={handleChange("unitPrice")}
                    onBlur={handleBlur("unitPrice")}
                    keyboardType="numeric"
                    errors={errors.unitPrice}
                  /> */}
                  {/* <AppTextInput
                    values={values.quantity}
                    label="Order Total ₱"
                    placeholder="0"
                    onChangeText={handleChange("orderTotal")}
                    onBlur={handleBlur("orderTotal")}
                    keyboardType="numeric"
                    errors={errors.orderTotal}
                    editable={false}
                  /> */}
                  <View className="flex flex-row items-center justify-between py-5">
                    <Text className="font-bold tracking-[1px]">Total:</Text>
                    <Text className=" font-bold text-gray-500 text-[24px]  mt-1">
                      ₱ {orderTotal}
                    </Text>
                  </View>
                </View>
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

export default SellGallonModal;
