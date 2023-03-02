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
  ToastAndroid,
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
import RecentDeliveries from "../../components/home/RecentDeliveries";
import { apiPut } from "../../services/api/axios.method";
import PromptModal from "../../components/general/modal/PromptModal";
import ReturnDelivery from "../../components/home/ReturnDelivery";
import CustomerBalanceModal from "../../components/general/modal/CustomerBalanceModal";
import Profile from "../../components/home/modal/Profile";
import CustomStatusBar from "../../components/general/CustomStatusBar";


const Home = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const window = useWindowDimensions({ navigation });
  const deviceViewHeight = window.height;
  const deviceViewWidth = window.width;

  const { user, revalidateUser } = useAuth();

  // REFRESH DELIVERY
  const { mutate } = useSWRConfig();
  const [refreshing, setIsRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    mutate("/api/delivery/by-personel");
    setIsRefreshing(false);
    mutateRecentDeliveries();
  }, []);

  // PERSONEL DELIVERY
  const { data: mydelivery, error: mydeliveryError } = useFetch({
    url: "/api/delivery/by-personel",
  });
  const vehicle = mydelivery?.data.vehicle;
  const delivery_items = mydelivery?.data?.delivery_items;

  // HANDLE CANCEL OR DELETE DELIVERY
  const [isShownSubmitPrompt, setIsShownSubmitPrompt] = useState(false);
  const toggleSubmitPrompt = () => {
    setIsShownSubmitPrompt(!isShownSubmitPrompt);
  };
  const handleCancelDelivery = async () => {
    const delivery_id = mydelivery?.data?._id;
    const { data, error } = await apiPut({
      url: `/api/delivery/cancel/${delivery_id}`,
    });
    if (data && !error) {
      mutate("/api/delivery/by-personel");
      console.log("data", data);
      setIsShownSubmitPrompt(!isShownSubmitPrompt);
      const messsage = data?.fullMessage?.cancel_delivery?.message;
      ToastAndroid.show("You just cancelled the delivery", ToastAndroid.LONG);
    } else {
      mutate("/api/delivery/by-personel");
      setIsShownSubmitPrompt(!isShownSubmitPrompt);
      ToastAndroid.show("Failed to cancel delivery.", ToastAndroid.LONG);
    }
  };
  const [showReturnModal, setShowReturnModal] = useState(false);

  const {
    data: recentDeliveries,
    error: errorRecentDeliveries,
    mutate: mutateRecentDeliveries,
  } = useFetch({ url: "/api/deliveries/recent" });
  console.log("[recentDeliveries]", recentDeliveries);

  // handle profile modal
  const [showProfile, setShowProfile] = useState(false);

  return (
    <View
      className={Platform.OS === "android" ? "flex-1 h-full" : "pt-0 flex-1"}
    >
      <CustomStatusBar />
      <ReturnDelivery
        isShow={showReturnModal}
        setIsShow={setShowReturnModal}
        delivery_id={mydelivery?.data?._id}
      />

      <PromptModal
        confirmText="Yes"
        confirmHandler={handleCancelDelivery}
        message="Do you really want to cancel your delivery?"
        toggleModal={toggleSubmitPrompt}
        isModalVisible={isShownSubmitPrompt}
        animationOutTiming={200}
      />
      <Profile
        isShow={showProfile}
        setIsShow={setShowProfile}
        revalidateUser={revalidateUser}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="p-2
           pt-2 w-full bg-white max-h-full "
      >
        <View className="flex ">
          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={() => setShowProfile(!showProfile)}>
              <View className=" w-[45px] h-[45px] items-center justify-center rounded-full border-[2px] border-[#2389DA] overflow-hidden">
                <Image
                  source={{ uri: user?.display_photo }}
                  className="h-full w-[85%]  "
                />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => logout()} className="flex-row">
              <Text className="font-semibold text-gray-600">Log out</Text>
              <View className="ml-2">
                <MatIcons name="logout" size={19} color="gray" />
              </View>
            </TouchableOpacity> */}
          </View>

          <View className="flex gap-y-1">
            <Text className="font-bold text-[24px] text-gray-600">
              Hello, {user?.firstname}
            </Text>
            <Text className="font-semibold text-gray-500 ">
              Have a safe ride.
            </Text>
          </View>
        </View>
        {mydelivery && !mydeliveryError ? (
          <ScrollView>
            <View className="flex mt-4 relative bg-gray-50 border-[1px] border-gray-200 p-[10px]  rounded-xl ">
              <Text className="font-bold text-center text-[24px] text-gray-600">
                My Delivery
              </Text>
              <View className="flex-row mt-2 w-full justify-between h-[100px] shadow-lg bg-white p-2 rounded-xl">
                <View className="w-[40%] rounded-xl overflow-hidden border-[1px] border-gray-100 bg-gray-100">
                  <Image
                    source={{ uri: vehicle?.vehicle_image }}
                    className="h-full w-full "
                  />
                </View>
                <View className="w-[60%] justify-center p-2">
                  <View className="flex-row">
                    <Text className="text-gray-500">Plate no.</Text>
                    <Text className="ml-1 font-bold text-[16px]">
                      {vehicle?.vehicle_id}
                    </Text>
                  </View>
                  <View className="flex-row">
                    <Text className="text-gray-500">Vehicle name: </Text>
                    <Text className="ml-1 font-semibold ">
                      {vehicle?.vehicle_name}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="h-[1px] bg-gray-200 rounded-full mt-2"></View>
              {/* ITEMSSS */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                className="flex bg-gray-50"
              >
                <View className="mt-2 h-full bg-white rounded-xl">
                  {delivery_items?.map((item) => (
                    <View
                      key={item._id}
                      className="border-[1px] border-gray-200 flex-row justify-between mb-1  h-[70px]  w-auto  p-1 overflow-hidden rounded-xl"
                    >
                      <View className="flex-row justify-center items-center">
                        <View className=" w-[50px] h-[50px] rounded-xl p-1 bg-gray-100 items-center justify-center">
                          <Image
                            source={{ uri: item?.gallon?.gallon_image }}
                            className=" h-full w-full "
                          />
                        </View>
                        <View className="ml-2 items-center justify-center">
                          <Text className="font-bold text-gray-700">
                            {item?.gallon?.name}
                          </Text>
                        </View>
                      </View>
                      <View className=" justify-center items-center">
                        <Text className="text-[10px] text-gray-400">
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
                <View className=" bottom-0 mt-4 flex-row p-2 items-center justify-center gap-x-1 opacity-80">
                  <TouchableOpacity
                    onPress={() => setShowReturnModal(!showReturnModal)}
                    className="flex-row w-[49%]  bg-white p-2 h-[50px] border-[1px] border-[#2389DA]  items-center justify-center rounded-full"
                  >
                    <Text className="text-[#2389DA] bg-white font-bold text-center">
                      Finish Delivery
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("My Routes")}
                    className="flex-row w-[49%] bg-[#2389DA] p-2 h-[50px]  items-center justify-center rounded-full"
                  >
                    <MatIcons
                      name="truck-delivery-outline"
                      size={24}
                      color="white"
                    />
                    <Text className="text-white font-bold ml-2">
                      Deliver now
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View className="items-center justify-center fixed w-full">
                  <Text className="text-[12px] text-yellow-500 font-bold mb-2">
                    pending
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsShownSubmitPrompt(!isShownSubmitPrompt)}
                    className="flex-row w-full bg-[#FF605C] p-2 h-[50px]  items-center justify-center rounded-full"
                  >
                    <Text className="px-4 py-1 text-white font-semibold rounded-xl">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        ) : (
          <View className="bg-white mt-4 flex justify-around items-center relative h-[300px] border-[1px] border-gray-300 p-[10px]  rounded-xl ">
            <Text className="top-2 font-bold text-[24px] text-gray-700">
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
                  initial: false,
                });
              }}
              className="flex-row bg-[#2389DA] p-2 h-[50px] w-full mt-2 items-center justify-center rounded-full"
            >
              <Text className="text-white text-center font-semibold ">
                Create Delivery
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View className="rounded-t-xl mt-5 bg-white p-2 mb-10">
          <Text className="text-[16px] text-gray-700 font-bold ">
            Recent Deliveries
          </Text>
          <Text className="text-[12px] text-gray-500">
          You have completed lists of previous deliveries
          </Text>

          {recentDeliveries?.data?.length && !errorRecentDeliveries ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="mt-2"
            >
              {recentDeliveries.data?.map((recent, i) => (
                <RecentDeliveries key={i} data={recent} />
              ))}
            </ScrollView>
          ) : (
            <View className="">
              <View className=" w-[120px] h-[120px] items-center justify-center  overflow-hidden">
                <Image
                  source={heroes?.up_to_date}
                  className="h-full w-full  "
                />
              </View>
              <Text className="absolute left-0 top-[50] bg-white p-2 rounded-full font-semibold">
                No Recent deliveries
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
