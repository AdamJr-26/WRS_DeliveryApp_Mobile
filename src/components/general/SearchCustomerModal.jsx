import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Button,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
// swr
import useSWR, { useSWRConfig } from "swr";
// axios api
import { apiGet } from "../../services/api/axios.method";

import heroes from "../../../assets/hero/index";
const SearchCustomerModal = ({ setIsShow, isShow, selectCustomer }) => {
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const [customers, setCustomers] = useState(null);
  const [isloading, setIsloading] = useState(false);
  //   on change textinput -> if text is greater than 2 -> query ->
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function getCustomer() {
      setIsloading(true);
      if (searchText?.length) {
        const { data, error } = await apiGet(
          `/api/customer/by-firstname/${searchText}`
        );
        if (data && !error) {
          setCustomers(data?.data);
          setIsloading(false);
        } else {
          setIsloading(false);
        }
      } else {
        setCustomers(null);
        setIsloading(false);
      }
    }
    getCustomer();
  }, [searchText]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow);
      }}
    >
      <View className="flex-1 flex-col justify-between ">
        <View className=" h-auto flex-1">
          <Pressable
            className="h-full"
            onPress={() => setIsShow(!isShow)}
          ></Pressable>
        </View>
        <View
          style={{ height: windowHeight / 1.5 }}
          className="bg-white h-[200px] p-5 gap-y-2 rounded-t-3xl shadow-xl shadow-gray-400"
        >
          <View className="w-full relative">
            <Text className="text-center font-bold text-[16px] ">
              Search Customer
            </Text>
            <View className="absolute right-2">
              <Pressable onPress={() => setIsShow(!isShow)}>
                <Ionicons name="close" size={24} />
              </Pressable>
            </View>
          </View>
          <View className="flex-row border-[1px] border-gray-200 rounded-xl h-[55px] items-center p-2">
            <Ionicons name="search" size={24} />
            <View className="w-full ml-1">
              <TextInput
                placeholder="Search"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
            </View>
          </View>
          <Text className="font-bold">Results</Text>
          {customers && !isloading ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {customers?.map((customer, i) => (
                <TouchableOpacity
                  onPress={() => {
                    setIsShow(!isShow);
                    selectCustomer(customer);
                  }}
                  key={i}
                  className=" bg-white mb-2 rounded-xl border-[1px] border-gray-300 p-2 flex-row items-center"
                >
                  <View className="flex-row items-center rounded-md justify-center w-[50px] h-[50px] bg-gray-200 ">
                    <Image
                      source={{
                        uri: customer?.display_photo,
                      }}
                      className="w-[100%] h-[100%] rounded-md"
                    />
                  </View>

                  <View className="flex-col gap-1 ml-2">
                    <Text className="font-bold text-gray-600 text-[19px]">
                      {customer?.firstname + " " + customer?.lastname}
                    </Text>
                    <Text className="text-gray-500 font-semibold text-[12px] ">
                      {customer?.address?.street +
                        ", " +
                        customer?.address?.barangay +
                        ", " +
                        customer?.address?.municipal_city}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : isloading ? (
            <ActivityIndicator color="blue" size={24} />
          ) : (
            <View className="items-center justify-center h-full">
              <View className="flex-row items-center justify-center h-[100px] w-[100px]">
                <Image
                  source={heroes.search}
                  className=" w-full h-full rounded-xl object-fit contain"
                />
              </View>
              <View className="p-2 shadow-gray-300 shadow-2xl bg-white rounded-xl">
                <Text className="font-bold text-gray-600">
                  Search customer by their firstname.
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SearchCustomerModal;
