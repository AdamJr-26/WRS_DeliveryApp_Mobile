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
import transformDate from "../../services/utils/date.toString";
const MyRoutes = () => {
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
  const {
    data: schedules,
    error,
    mutate: mutateOndeliverySchedules,
  } = useFetch({
    url: "/api/schedules/assigned-delivery",
  });

  // refresh control
  const [refreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);
    mutateOndeliverySchedules();
    getAllPlaces();
    setIsRefreshing(false);
  };

  console.log("schedulesschedules", schedules);
  // all places that in schedules
  const [places, setPlaces] = useState([]);
  function getAllPlaces() {
    for (let i = 0; i < schedules?.data?.length; i++) {
      const place = schedules?.data[i]?.customer?.address?.barangay;
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
  const handleAssignedSchedule = async (sched) => {
    const { data, error } = await apiPut({
      url: `/api/schedule/remove/assigned/${sched._id}`,
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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      // className={Platform.OS === "android" ? "pt-0 flex-1" : "pt-0"}
      className="bg-white"
    >
      {!schedules && !error ? (
        <View className="absolute items-center justify-center bg-opacity-20 right-0 top-0 left-0 bottom-0 h-full w-full z-10">
          <View className="p-2 bg-white rounded-full shadow-md items-center justify-center shadow-gray-400">
            <ActivityIndicator size={32} color="#2389DA" />
          </View>
        </View>
      ) : (
        ""
      )}
      <View className="p-1 w-full bg-white max-h-full relative">
        <View>
          <View className="mt-2 mb-2">
            <View className="flex-row items-center">
              <MatIcons name="routes" size={24} />
              <Text className="ml-2 font-bold text-gray-600 text-[28px]">
                Routes
              </Text>
            </View>
            <Text className="text-gray-500 text-[14px]">
              The schedules you have selected will serve as your route.
            </Text>
          </View>
          {schedules?.data.length && !isLoading ? (
            <View className=" my-2 w-full  h-[100px] border-[1px] border-gray-200 rounded-xl  bg-white ">
              <View className="flex-1   justify-center">
                <Text className="font-bold p-2">Places</Text>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  horizontal={true}
                >
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
                          ? "border[1px] ml-1 border-gray-400  h-[40px] flex-row bg-[#2389DA] px-4  items-center rounded-full"
                          : "border[1px] ml-1 border-gray-600  h-[40px] flex-row bg-gray-200 px-4  items-center rounded-full"
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
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          ) : null}
          {schedules?.data?.length ? (
            <View className=" p-0 w-full h-full  rounded-lg bg-gray-100">
              {/* <View className="p-2 bg-white rounded-lg">
              <Text className="text-gray-500 font-semibold">
              The schedules you have selected will serve as your route.
              </Text>
            </View> */}
              <ScrollView
                className="py-2"
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
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
        </View>
      </View>
      <View>
        <View>
          <Text>Assigned Schedules</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyRoutes;
