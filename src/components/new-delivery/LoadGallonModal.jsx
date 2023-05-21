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
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
// swr

import useSWR, { useSWRConfig } from "swr";
import useFetch from "../../hooks/api/swr/useFetch";
import { apiGet } from "../../services/api/axios.method";
const LoadGallonModal = ({
  setIsShow,
  isShow,
  selectedGallons,
  dispatchSelectedGallons,
  selectedVehicle,
}) => {
  // const {
  //   data: gallons,
  //   error: gallonsError,

  // } = useFetch({
  //   url: "/api/gallons/availables",
  // });
  const [gallons, setGallons] = useState([]);

  async function getRecommendedGallons() {
    if (selectedVehicle) {
      console.log("selectedVehicle", selectedVehicle);
      const { data, error } = await apiGet(
        `/api/delivery/recommened-load/${selectedVehicle}`
      );
      console.log("data=>>>>>>>>>", data);
      if (data && !error) {
        setGallons(data.data[0]);
      }
    } else {
      if (isShow) {
        ToastAndroid.show("Please select a vehicle first.", ToastAndroid.LONG);
      }
    }
  }
  useEffect(() => {
    getRecommendedGallons();
    if (isShow && !gallons) {
      ToastAndroid.show("Please assign schedule for you.", ToastAndroid.LONG);
    }
  }, [isShow]);
  const addGallons = (gallon) => {
    dispatchSelectedGallons({
      type: "add",
      data: {
        _id: gallon?._id,
        name: gallon?.name,
        liter: gallon?.liter,
        gallon_image: gallon?.gallon_image,
        price: gallon?.price,
        total: gallon?.total,
      },
    });
  };

  const checkIfExisting = (selectedGallons, gallon) => {
    for (let i = 0; i < selectedGallons.length; i++) {
      if (selectedGallons[i]?.id === gallon?._id) {
        return true;
      } else {
        return false;
      }
    }
  };
  function loadGallons() {
    if (!gallons?.orderedGallons?.length) return;
    for (let i = 0; i < gallons?.orderedGallons?.length; i++) {
      console.log("gallons[i]", gallons?.orderedGallons[i]);
      addGallons(gallons?.orderedGallons[i]);
      if (i + 1 === gallons?.orderedGallons?.length) {
        setIsShow(false);
      }
    }
  }

  return gallons ? (
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
        <View className=" bg-white h-200 p-5 flex gap-y-2">
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-gray-700 text-[19px]">Gallons</Text>

            <TouchableOpacity
              disabled={!gallons?.validCapacity}
              onPress={() => loadGallons()}
              className={
                gallons?.orderedGallons?.length && gallons?.validCapacity
                  ? "flex flex-row bg-gray-600 items-center justify-center px-7 py-2 rounded-full"
                  : "flex flex-row bg-gray-300 items-center justify-center px-7 py-2 rounded-full"
              }
            >
              <Ionicons name="download" size={24} color="white" />
              <Text className="ml-2 font-bold text-white">Load All</Text>
            </TouchableOpacity>
          </View>
          {/* <Text className="text-[12px] font-medium text-gray-600">Before selecting gallons, ensure that your chosen vehicle is already loaded. </Text> */}

          <ScrollView
            className=""
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row gap-x-5">
              {gallons?.orderedGallons?.map((gallon) => (
                <TouchableOpacity
                  key={gallon?._id}
                  className={
                    checkIfExisting(selectedGallons, gallon)
                      ? "h-[200px] relative border-[3px] border-blue-500 w-[150px] overflow-hidden rounded-xl bg-white shadow-xl shadow-gray-500 py-2 "
                      : "h-[200px] relative border-[1px] border-gray-200 w-[150px] overflow-hidden rounded-xl bg-white shadow-xl shadow-gray-500 py-2 "
                  }
                >
                  {/* <Text className="p-2 bg-gray-200 absolute rounded-xl font-bold right-1 top-2 z-10 opacity-70">
                      {gallon?.total}
                    </Text> */}
                  <Pressable
                  // onPress={() => {
                  //   addGallons(gallon);
                  // }}
                  >
                    <Image
                      source={{
                        uri: gallon?.gallon_image,
                      }}
                      className=" w-[100%] h-[70%]  "
                    />
                    <View>
                      <Text className="whitespace-nowrap text-center py-1 w-full font-bold text-gray-800 overflow-hidden">
                        {gallon?.name}
                      </Text>
                      <Text className="text-center py-1 w-full font-semibold text-gray-500 text-[14px]">
                        {gallon?.liter} liter(s)
                      </Text>
                    </View>
                  </Pressable>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="py-3 px-1">
            <View className="flex flex-row justify-between mt-2">
              <Text>Vehicle load limit: </Text>
              <Text className="font-bold">{gallons?.vehicleLoadLimit} KG </Text>
            </View>
            <View className="flex flex-row justify-between mt-2">
              <Text>Total load on routes </Text>
              <Text className="font-bold">
                {" "}
                {gallons?.totalLoadOnAssignedSchedules} KG{" "}
              </Text>
            </View>
            <View className="flex flex-row justify-between mt-2">
              <Text>Exceed load </Text>
              <Text className="font-bold"> {gallons?.totalExceed} KG </Text>
            </View>
            <View>
              <Text className="py-2 px-1  mt-2 bg-gray-200 rounded-md ">
                Note: Liter is equivalent to kilogram(KG).
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  ) : (
    <View className="h-[50px] w-[50px] flex-1 items-center justify-center absolute top-[50%] left-[45%] p-2 bg-white shadow-lg shadow-gray-200">
      <ActivityIndicator size={60} color="#2389DA" />
    </View>
  );
};

export default LoadGallonModal;
