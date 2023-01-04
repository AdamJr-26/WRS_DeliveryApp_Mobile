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
import React, { useState, useEffect, useReducer, useCallback } from "react";
import DateTimePicker from "../../components/general/DateTimePicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SearchCustomerModal from "../../components/general/SearchCustomerModal";
import ChooseGallonModal from "../../components/new-delivery/ChooseGallonModal";
import useSWR, { useSWRConfig } from "swr";
import { apiGet, apiPost } from "../../services/api/axios.method";

const NewCreateSchedule = ({ navigation }) => {
  const [date, setDate] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [isOpenSearchCustomer, setIsOpenSearchCustomer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useSWRConfig();
  const [customerSchedule, setCustomerSchedule] = useState(null);
  // CHECK IF CUSTOMER ALREADY HAS SCHEDULE.
  useEffect(() => {
    // fetch
    if (!customer?._id) return;
    async function checkIfCustomerHasSchedule() {
      const { data, error } = await apiGet(
        `/api/schedule/customer/${customer?._id}`
      );
      if (data && !error) {
        setCustomerSchedule(data?.data);
        if (data?.data?.length) {
          ToastAndroid.showWithGravity(
            "Be advised, this customer already has schedule.",
            ToastAndroid.CENTER,
            ToastAndroid.LONG
          );
        }
      } else {
        ToastAndroid.show(
          "Error getting customer's schedule",
          ToastAndroid.SHORT
        );
      }
    }
    checkIfCustomerHasSchedule();
  }, [customer]);
  // selected gallons
  const [selectGallonModal, setSelectGallonModal] = useState(false);
  const selectedGallonsReducer = (state, action) => {
    switch (action.type) {
      case "add":
        let isExists = false;
        for (let i = 0; i < state.length; i++) {
          for (const key in state[i]) {
            if (key === "_id" && state[i][key] === action?.data?._id) {
              isExists = true;
            }
          }
        }
        if (!isExists) {
          return [...state, action?.data];
        }
      case "reduce":
        const gallonIndex = state?.findIndex(
          (elem) => elem?._id === action?.data?._id
        );

        if (gallonIndex) {
          state?.splice(gallonIndex, 1);
        }
        return state;
      case "reset":
        if (action?.data instanceof Array) {
          state = action?.data;
          return state;
        } else {
          return state;
        }

      default:
        alert("Oops. Invalid command, please try again.");
    }
  };
  const [selectedGallons, dispatchSelectedGallons] = useReducer(
    selectedGallonsReducer,
    []
  );
  // FORM
  const [form, setForm] = useState([]);
  useEffect(() => {
    function createForm() {
      const f = [];
      for (let i = 0; i < selectedGallons?.length; i++) {
        f.push({ gallon: "", total: "" });
      }
      setForm(f);
    }
    createForm();
  }, [selectedGallons]);

  const handleFormInputsChange = (value, index, _id) => {
    const data = [...form];
    data[index]["gallon"] = _id;
    data[index]["total"] = value;
    setForm(data);
  };
  // RESET
  const handleReset = () => {
    dispatchSelectedGallons({ type: "reset", data: [] });
    setForm([]);
    setDate(null);
  };
  // sumbmit
  const handleSubmit = async () => {
    if (!customer?._id || !date) {
      ToastAndroid.show("Please select customer and date", ToastAndroid.SHORT);
    } else {
      var isAllFieldSupplied = true;
      // check if all items keys has supplied value.
      for (let i = 0; i < form.length; i++) {
        for (key in form[i]) {
          if (form[i][key].length) {
            isAllFieldSupplied = true;
          } else {
            isAllFieldSupplied = false;
            break;
          }
        }
      }
      if (isAllFieldSupplied) {
        const payload = {
          items: form,
          customer: customer?._id,
          schedule: {
            unix_timestamp: Math.floor(date.valueOf() / 1000),
            utc_date: date,
          },
        };
        setIsSubmitting(true);
        const { data, error } = await apiPost({
          url: "/api/new/schedule",
          payload,
        });
        if (data && !error) {
          handleReset();
          setCustomer(null);
          setIsSubmitting(false);
          ToastAndroid.show("New schedule saved.", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("New schedule did not save", ToastAndroid.SHORT);
          setIsSubmitting(false);
        }
      } else {
        ToastAndroid.show(
          "Please provide gallon count for every item",
          ToastAndroid.SHORT
        );
      }
    }
  };

  return (
    <View className={Platform.OS === "android" ? "flex-1" : "pt-0"}>
      <SearchCustomerModal
        isShow={isOpenSearchCustomer}
        setIsShow={setIsOpenSearchCustomer}
        selectCustomer={setCustomer}
      />
      <ChooseGallonModal
        isShow={selectGallonModal}
        setIsShow={setSelectGallonModal}
        selectedGallons={selectedGallons}
        dispatchSelectedGallons={dispatchSelectedGallons}
      />
      <ScrollView className="m-1 bg-white">
        <View className="bg-white p-1 overflow-hidden rounded-xl h-full">
          {/* if there is no selected customer */}

          <TouchableOpacity
            onPress={() => setIsOpenSearchCustomer(!isOpenSearchCustomer)}
            className=" border-gray-200 border-[1px] bg-white p-2 flex-row items-center rounded-xl overflow-hidden shadow-md shadow-gray-400 mt-2"
          >
            {customer ? (
              <View className="w-full relative bg-white p-2 flex-row items-center">
                <View className="flex-row items-center bg-gray-200 rounded-md justify-center w-[50px] h-[50px] ">
                  <Image
                    source={{
                      uri: customer?.display_photo,
                    }}
                    className=" w-full h-full rounded-xl "
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
                  <View className="flex-row  items-center">
                    <View className="bg-yellow-600 w-[60px] h-[20px] items-center justify-center rounded-full overflow-hidden">
                      <Text className=" w-auto text-center text-gray-50 font-semibold text-[10px]">
                        regular
                      </Text>
                    </View>
                    {/* check if customer already has schedule */}
                    {customerSchedule?.length ? (
                      <View className="ml-2 flex-row items-center justify-center">
                        <Ionicons name="calendar" size={18} color="green" />
                        <Text className="text-[10px] bg-gray-200 rounded-md px-2 font-bold">
                          {customerSchedule?.length}
                        </Text>
                      </View>
                    ) : (
                      ""
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setIsOpenSearchCustomer(!isOpenSearchCustomer)}
                className="h-[40px] items-center justify-center flex-row"
              >
                <Ionicons name="search" size={24} />
                <Text className="text-gray-600 ml-2">Select a customer</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          {/* date */}
          <View className="border-gray-200 border-[1px] bg-white rounded-xl shadow-md shadow-gray-500 px-3 py-2 mt-2">
            <Text className="text-gray-700 font-bold mb-2">Select Date</Text>
            <DateTimePicker date={date} setDate={setDate} />
          </View>

          <View className=" border-gray-200 border-[1px] bg-white rounded-xl shadow-md shadow-gray-500 px-3 py-2 mt-2">
            <View className="flex-row justify-between items-center">
              <Text className="font-bold">Select Gallon(s)</Text>
              <TouchableOpacity
                onPress={() => {
                  mutate("/api/gallons/availables");
                  setSelectGallonModal(!selectGallonModal);
                }}
                className="rounded-xl p-2 bg-[#2389DA]"
              >
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View className="flex-col p-2 ">
              {selectedGallons?.map((gallon, i) => (
                <View
                  key={i}
                  className="relative bg-white shadow-lg shadow-gray-400 h-[80px] flex-row items-center justify-between border-[1px] border-gray-200 rounded-lg py-2 my-1"
                >
                  <View className="absolute top-[-5px] right-[-5px] bg-gray-500 rounded-full"></View>
                  <View className="flex-row items-center justify-center">
                    <View className="ml-2 w-[50px] h-[50px] p-1  bg-gray-100 rounded-md items-center justify-center">
                      <Image
                        source={{
                          uri: gallon?.gallon_image,
                        }}
                        className="h-full w-full rounded-lg "
                      />
                    </View>
                    <View className="flex-col justify-center ml-2">
                      <Text className="text-gray-700 font-semibold text-[19px]">
                        {gallon?.name}
                      </Text>
                      <Text className="text-gray-500">
                        {gallon?.liter} Liter(s)
                      </Text>
                    </View>
                  </View>
                  <View className=" h-full flex-col justify-center items-center px-3 absolute right-0 ">
                    {/* <Text className="text-[8px] font-semibold w-full ">PCS</Text> */}

                    <TextInput
                      onChangeText={(value) =>
                        handleFormInputsChange(value, i, gallon?._id)
                      }
                      className="bg-gray-100 rounded-lg text-center py-2 text-[24px] w-[70px] h-full"
                      keyboardType="numeric"
                      placeholder="0"
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
          {selectedGallons.length ? (
            <View className="bg-white rounded-xl px-3 py-2 mt-2 flex-row justify-between p-1">
              <TouchableOpacity
                onPress={handleReset}
                className="h-[55px] border-[1px] border-gray-200 w-[49%] rounded-xl items-center justify-center"
              >
                <Text className="font-bold ">Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isSubmitting}
                onPress={handleSubmit}
                className="h-[55px] border-[1px] bg-[#2389DA] border-gray-200 w-[49%] rounded-xl items-center justify-center"
              >
                {isSubmitting ? (
                  <ActivityIndicator size={16} color="white" />
                ) : (
                  <Text className="font-bold  text-white">Schedule</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            ""
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default NewCreateSchedule;
