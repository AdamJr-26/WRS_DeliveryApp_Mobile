import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Dimensions,
  Pressable,
} from "react-native";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSWRConfig } from "swr";

import Ionicons from "react-native-vector-icons/Ionicons";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { apiGet } from "../../services/api/axios.method";
import CustomerInfoModal from "../../components/customers/CustomerInfoModal";
import useFetch from "../../hooks/api/swr/useFetch";
import heroes from "../../../assets/hero";
const Customers = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  // #2389DA
  const { mutate } = useSWRConfig();
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [customer, setCustomer] = useState();
  useEffect(() => {
    return () => {
      setShowCustomerInfo(false);
    };
  }, []);

  const [searchText, setSearchText] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");

  // get list of barangay
  useEffect(() => {
    async function getAllBarangay() {
      const { data, error } = await apiGet("/api/customer/distinct/places");
      if (data?.data && !error) {
        setPlaces(data?.data);
      } else {
        setPlaces([]);
      }
    }
    getAllBarangay();
  }, []);

  console.log("searchText, selectedPlace", searchText, selectedPlace);
  const { data: customers, error: customersError } = useFetch({
    url: `/api/search/customers/${searchText}/${selectedPlace}`,
  });
  useEffect(() => {
    mutate(`/api/search/customers/${searchText}`);
  }, [searchText]);

  console.log("customerscustomers", customers);

  return (
    <View
      className={Platform.OS === "android" ? "pt-5 flex-1 bg-white " : "pt-0"}
    >
      {/* MODAL */}
      <CustomerInfoModal
        isShow={showCustomerInfo}
        setIsShow={setShowCustomerInfo}
        customer={customer}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className=" p-2"
      >
        <View className="flex-row mt-2 border-[1px] bg-white border-gray-200 rounded-xl h-[55px] items-center p-2">
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

        {customers ? (
          <View className=" bg-white flex-1 h-full rounded-xl mt-3 ">
            <View className="flex-row h-[30px] justify-between items-end px-4">
              <Text className="text-gray-700 font-bold  ">Results</Text>
              <Text className="text-gray-500 font-semibold text-[12px] ">
                Details
              </Text>
            </View>
            <View className="mt-4 bg-white flex-col ">
              {/* customers list */}
              {customers?.data?.map((customer, i) => (
                <TouchableOpacity
                  onPress={() => {
                    setShowCustomerInfo(!showCustomerInfo);
                    setCustomer(customer);
                  }}
                  key={i}
                  className="mt-2 bg-white rounded-2xl mx-2 h-[80px] flex-row items-center flex-1 border-b-[1px] border-b-gray-200 shadow-md shadow-gray-300"
                >
                  <View className="flex-row p-2 ">
                    <View className="flex-row  items-center w-[50px] h-[50px]  rounded-full bg-gray-300 overflow-hidden">
                      <Image
                        source={{
                          uri: customer?.display_photo,
                        }}
                        className=" w-full h-full rounded-full "
                      />
                    </View>
                    <View className="flex-col justify-around ml-3 flex-nowrap">
                      <Text className="font-bold text-gray-700">
                        {customer?.firstname} {customer?.lastname}
                      </Text>
                      <View className="flex-row items-center ">
                        <Ionicons
                          name="md-location-sharp"
                          size={12}
                          color="#2389DA"
                        />
                        <Text className="ml-1 text-[12px] font-regular text-gray-500">
                          {customer?.address?.street}{" "}
                          {customer?.address?.barangay}{" "}
                          {customer?.address?.municipality}{" "}
                          {customer?.address?.province}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View className="bg-white flex-1 h-full rounded-xl mt-3 items-center justify-center">
            <View
              style={{ width: windowWidth / 1.5, height: windowWidth / 1.5 }}
            >
              <Image
                source={heroes?.people_search}
                className="w-full h-full object-contain"
              />
            </View>
            <Text className="text-[16px] font-bold text-center">
              View your customer's information.
            </Text>
            <Text className="text-[12px] text-gray-500 font-semibold text-center">
              You can search by their Names, Address, Mobile number.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Customers;
