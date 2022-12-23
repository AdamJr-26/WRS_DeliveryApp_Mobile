import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  DrawerLayoutAndroid,
  RefreshControl,
} from "react-native";
import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../hooks/auth";
import heroes from "../../../assets/hero";
import DrawerLayout from "../../components/home/DrawerLayout";
import useFetch from "../../hooks/api/swr/useFetch";
import useSWR, { useSWRConfig } from "swr";
const Home = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const window = useWindowDimensions({ navigation });
  const deviceViewHeight = window.height;
  const deviceViewWidth = window.width;

  const { user } = useAuth();

  // drawer
  const drawer = useRef(null);
  useEffect(() => {
    drawer.current.closeDrawer();
  }, []);

  // REFRESH DELIVERY
  const { mutate } = useSWRConfig();
  const [refreshing, setIsRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    mutate("/api/delivery/by-personel");
    setIsRefreshing(false);
  }, []);
  // PERSONEL DELIVERY
  const { data: mydelivery, error: mydeliveryError } = useFetch({
    url: "/api/delivery/by-personel",
  });
  const vehicle = mydelivery?.data.vehicle;
  const delivery_items = mydelivery?.data?.delivery_items;

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={deviceViewWidth / 1.5}
      drawerPosition="left"
      renderNavigationView={DrawerLayout}
    >
      <View
        className={Platform.OS === "android" ? "pt-8  flex-1" : "pt-0 flex-1"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="flex gap-2 p-3 bg-white"
        >
          <View className="flex gap-y-2">
            <Pressable onPress={() => drawer.current.openDrawer()}>
              <Ionicons name="menu-outline" size={32} color="gray" />
            </Pressable>

            <View className="flex gap-y-1">
              <Text className="font-bold text-[24px] text-gray-600">
                Hello, {user?.firstname} {user?.lastname}
              </Text>
              <Text className="font-semibold text-gray-500 ">
                Have a safe ride.
              </Text>
            </View>
          </View>
          {mydelivery && !mydeliveryError ? (
            <ScrollView>
              <View className="flex relative  border-[1px] border-gray-300 p-[10px]  rounded-xl ">
                <Text className="font-bold text-center py-5 text-[24px] text-gray-600">
                  My Delivery
                </Text>
                <View className="flex-row w-full justify-between h-[100px] shadow-lg bg-gray-100 p-2 rounded-xl">
                  <View className="w-[40%] rounded-xl overflow-hidden border-[1px] border-blue-200 bg-gray-100">
                    <Image
                      source={{ uri: vehicle?.vehicle_image }}
                      className="h-full w-full "
                    />
                  </View>
                  <View className="w-[60%] justify-center items-center">
                    <Text className="font-semibold text-gray-500">
                      {vehicle?.vehicle_name}
                    </Text>
                    <Text className="font-bold text-[16px]">
                      {" "}
                      {vehicle?.vehicle_id}
                    </Text>
                  </View>
                </View>

                <View className="h-[1px] bg-gray-200 rounded-full mt-2"></View>
                {/* ITEMSSS */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  className="flex bg-white"
                >
                  <View className="mt-2 h-full">
                    {delivery_items?.map((item) => (
                      <View
                        key={item._id}
                        className="bg-gray-100 flex-row mb-1 h-[70px] w-auto border-[1px] border-gray-300 p-1 overflow-hidden rounded-xl"
                      >
                        <View className="h-full w-[20%] bg-gray-100 rounded-md p-1">
                          <Image
                            source={{ uri: item?.gallon?.gallon_image }}
                            className=" h-full w-auto  object-scale-down"
                          />
                        </View>
                        <View className="w-[55%] items-center justify-center">
                          <Text className="font-bold text-gray-700">
                            {item?.gallon?.name}
                          </Text>
                        </View>
                        <View className="w-[25%] justify-center items-center">
                          <Text className="text-[12px] text-gray-400">
                            ONBOARD
                          </Text>
                          <Text className="font-bold text-[24px] text-blue-400">
                            {item?.total}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>

                {mydelivery?.data?.approved ? (
                  <View className="absolute bottom-0 left-[45%] p-2 opacity-80">
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Deliveries")}
                      className="flex-row bg-blue-400 p-2 h-[50px] w-[50px] items-center justify-center rounded-full"
                    >
                      <MatIcons
                        name="truck-delivery-outline"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View className="items-center justify-center fixed">
                    <Text className="text-[12px] text-yellow-500 font-bold mb-2">
                      pending
                    </Text>
                    <TouchableOpacity>
                      <Text className="bg-red-600 font-bold  px-4 py-1 text-white font-semibold rounded-xl">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
          ) : (
            <View className="flex justify-center items-center relative h-[400px] border-[1px] border-gray-300 p-[10px]  rounded-xl ">
              <Text className="absolute top-2 font-bold text-[24px] text-gray-700">
                No Delivery
              </Text>
              <Image
                source={heroes?.delivery_truck}
                className="h-[45%] w-full "
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("New", {
                    screen: "New Delivery",
                  });
                }}
                className="absolute bottom-2 bg-[#2389DA] w-[80%] p-4 rounded-xl "
              >
                <Text className="text-white text-center font-semibold ">
                  Create Now
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View>
            <Text>
              Other functions ex. create a report for gallon na natapon.
            </Text>
          </View>
        </ScrollView>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default Home;
