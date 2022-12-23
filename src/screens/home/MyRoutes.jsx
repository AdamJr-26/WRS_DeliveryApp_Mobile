import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
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
} from "react-native";
import RenderSortTableView from "../../components/myroutes/RenderSortTableView";
import useFetch from "../../hooks/api/swr/useFetch";
import { apiGet } from "../../services/api/axios.method";

// fetch schedule that aassiged from this personel

const Routes = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const getVW = Dimensions.get("screen").width;
  const getVH = Dimensions.get("screen").height;
  // get schedule that assigned from a personel.
  const [isLoading, setIsloading] = useState(false);
  const [schedules, setSchedules] = useState();

  // refresh control
  const [refreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);
    getAssignedSchedules();
    setIsRefreshing(false);
  };
  // get all assigend schedules.
  async function getAssignedSchedules() {
    setIsloading(true);
    const { data, error } = await apiGet("/api/schedule-assigned/by-personel");
    if (data && !error) {
      setSchedules(data?.data);
      setIsloading(false);
    } else {
      setIsloading(false);
      setSchedules([]);
    }
  }
  useEffect(() => {
    getAssignedSchedules();
  }, []);

  // all places that in schedules
  const [places, setPlaces] = useState([]);
  function getAllPlaces() {
    for (let i = 0; i < schedules?.length; i++) {
      const place = schedules[i].customer.address.barangay;
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

  return (
    <View className={Platform.OS === "android" ? "pt-5 flex-1" : "pt-0"}>
      {isLoading ? (
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
          <Text className="font-bold text-gray-600 text-[28px]">Routes</Text>
          <Text className="text-gray-500 text-[16px]">
            It's time for delivery.
          </Text>
        </View>
        <View className=" my-2 flex-row w-full h-[200px] border-[1px] border-gray-100 rounded-xl  bg-white shadow-lg shadow-gray-600">
          {schedules && !isLoading ? (
            <>
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
            </>
          ) : (
            <View className="h-full w-full items-center justify-center relative">
              <Image source={heroes?.void} className="h-full w-[40%] " />
              <Text className="absolute text-center font-bold bg-white px-4 py-2 rounded-full shadow-md shadow-gray-500">
                Nothing has been assigned yet.
              </Text>
            </View>
          )}
        </View>

        <View className=" p-1 w-full h-full border-[1px] border-gray-100 rounded-xl bg-gray-100 shadow-lg shadow-gray-600">
          <ScrollView showsVerticalScrollIndicator={false}>
            {schedules?.map((schedule, i) => (
              <RenderSortTableView
                marked_place={markedPlace}
                schedule={schedule}
                key={i}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Routes;
