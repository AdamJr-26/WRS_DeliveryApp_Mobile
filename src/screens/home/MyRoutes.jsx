import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import heroes from "../../../assets/hero";
// import { TextInput } from 'react-native-gesture-handler';
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
  ActivityIndicator,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import RenderSortTableView from "../../components/myroutes/RenderSortTableView";
import useFetch from "../../hooks/api/swr/useFetch";
import { apiGet, apiPut } from "../../services/api/axios.method";
import { useSWRConfig } from "swr";
// fetch schedule that aassiged from this personel

const Routes = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  // get schedule that assigned from a personel.
  const [isLoading, setIsloading] = useState(false);
  const { mutate } = useSWRConfig();
  // refresh control
  const [refreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);
    mutate("/api/schedule-assigned/by-personel");
    getAllPlaces();
    setIsRefreshing(false);
  };

  const { data: schedules, error } = useFetch({
    url: "/api/schedule-assigned/by-personel",
  });

  // all places that in schedules
  const [places, setPlaces] = useState([]);
  function getAllPlaces() {
    for (let i = 0; i < schedules?.data?.length; i++) {
      const place = schedules?.data[i].customer.address.barangay;
      const placeIndex = places?.findIndex((plc) => plc?.place === place);
      if (placeIndex < 0) {
        setPlaces([...places, { place: place, occured: 1 }]);
      } else {
        // setPlaces((prevPlaces) => prevPlaces[placeIndex]["occured"] + 1);
      }
    }
  }
  getAllPlaces();

  // status
  // color all scheduels with the same place that on marked.
  const [markedPlace, setmMarkplace] = useState(null);

  // get status of delivery

  // REMOVE ASSIGEND SCHEDULE
  const handleAssignedSchedule = async (id) => {
    const { data, error } = await apiPut({
      url: `/api/schedule/remove/assigned/${id}`,
    });
    if (data && !error) {
      mutate("/api/schedule-assigned/by-personel");
      ToastAndroid.show("An Assigned schedule was removed.", ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        "Failed to removed assigned schedule.",
        ToastAndroid.LONG
      );
    }
  };
  return (
    <View className={Platform.OS === "android" ? "pt-5 flex-1" : "pt-0"}>
      {!schedules && !error ? (
        <View className="absolute items-center justify-center bg-opacity-20 right-0 top-0 left-0 bottom-0 h-full w-full z-10">
          <View className="p-2 bg-white rounded-full shadow-md items-center justify-center shadow-gray-400">
            <ActivityIndicator size={32} color="#2389DA" />
          </View>
        </View>
      ) : (
        ""
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        className="p-1 w-full bg-white max-h-full relative"
      >
        <View className="mt-2 mb-2">
         <View className="flex-row items-center">
          <MatIcons name="routes" size={24} />
         <Text className="ml-2 font-bold text-gray-600 text-[28px]">Routes</Text>
         </View>
          <Text className="text-gray-500 text-[16px]">
            It's time for delivery.
          </Text>
        </View>

        {schedules?.data.length && !isLoading ? (
          <View className=" my-2 flex-row w-full h-[200px] border-[1px] border-gray-200 rounded-xl  bg-white shadow-lg shadow-gray-600">
            <ScrollView
              className="w-[65%]"
              showsVerticalScrollIndicator={false}
            >
              <View className=" p-2 rounded-xl gap-y-1">
                <Text className="font-bold">Places</Text>
                <View className="gap-y-1 ">
                  {places.map((place, i) => (
                    <TouchableOpacity
                      onPress={() => {
                        if (place?.place === markedPlace?.place) {
                          setmMarkplace(null);
                        } else {
                          setmMarkplace(place);
                        }
                      }}
                      key={i}
                      className={
                        place === markedPlace
                          ? "border[1px] border-gray-400 flex-row bg-gray-600 p-5 justify-between rounded-xl"
                          : "border[1px] border-gray-600 flex-row bg-gray-200 p-5 justify-between rounded-xl"
                      }
                    >
                      <Text
                        className={
                          place === markedPlace
                            ? "text-gray-200 font-semibold"
                            : "text-gray-800 font-semibold"
                        }
                      >
                        {place?.place}
                      </Text>
                      {/* <Text className="font-bold text-white text-[16px]">
                          5
                        </Text> */}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
            <View className="w-[35%] p-2  justify-between rounded-xl">
              <View className="bg-gray-600 h-[49%] w-full rounded-xl justify-around p-2 border-[1px] border-gray-200 ">
                <Text className="text-center font-bold text-white tracking-widest ">
                  Status
                </Text>
                <View className="flex-row justify-between items-center">
                  <Text className="text-[11px] font-semibold text-gray-50 ">
                    Delivered
                  </Text>
                  <Text className="text-[19px] text-gray-50 font-bold text-center">
                    5
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-[11px] font-semibold text-gray-50 ">
                    Ongoing
                  </Text>
                  <Text className="text-[19px] text-gray-50 font-bold text-center">
                    25
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="h-[49%] w-full rounded-xl justify-around items-center p-3 border-[1px] border-gray-200 ">
                <View className="">
                  <FontAwesome name="send" size={32} color="#2389DA" />
                </View>
                <Text className="text-gray-600 font-semibold text-[14px]">
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          ""
        )}

        {schedules?.data?.length ? (
          <View className=" p-1 w-full h-full  rounded-lg bg-gray-100 shadow-lg shadow-gray-600">
            <ScrollView showsVerticalScrollIndicator={false}>
              {schedules?.data?.map((schedule, i) => (
                <RenderSortTableView
                  marked_place={markedPlace}
                  schedule={schedule}
                  key={i}
                  handleAssignedSchedule={handleAssignedSchedule}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          <View className=" p-1 w-full flex-1  justify-center items-center  rounded-lg bg-white shadow-lg shadow-gray-600">
            <View className=" w-full h-[300px] items-center justify-center ">
              <Image source={heroes?.void} className="h-full w-[85%]  " />
            </View>
            <Text className="text-[16px] font-bold text-center px-10">
              There is no schedule that has been assigned to you.
            </Text>
            <Text className="text-[12px] text-gray-500 font-semibold text-center">
              Go to Schedules and assign one to you.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Schedules")}
              className="bg-[#2389DA] rounded-full px-5 py-3 mt-2"
            >
              <Text className="text-center text-white font-semibold">
                Assign a schedule
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Routes;
