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
} from "react-native";
import React, { useState, useEffect, useReducer, useRef } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import useSWR, { useSWRConfig } from "swr";
import SimpleIcons from "react-native-vector-icons/SimpleLineIcons";
import heroes from "../../../assets/hero";
import { SafeAreaView } from "react-native-safe-area-context";
import gallons from "../../../assets/gallon";
import ChooseVehicleModal from "../../components/new-delivery/ChooseVehicleModal";
import ChooseGallonModal from "../../components/new-delivery/ChooseGallonModal";

const ActionNewDelivery = ({ navigation }) => {
  const [selectVehicleModal, setSelectVehicleModal] = useState(false);
  const [selectGallonModal, setSelectGallonModal] = useState(false);
  const getVH = Dimensions.get("window").height;
  const getVW = Dimensions.get("window").width;
  const { mutate } = useSWRConfig();
  useEffect(() => {
    navigation.setOptions({
      tabBar: {
        visible: false,
      },
    });
  }, []);

  const selectedGallonsReducer = (state, action) => {
    switch (action.type) {
      case "add":
        let isExists = false;
        for (let i = 0; i < state.length; i++) {
          for (const key in state[i]) {
            if (key === "id" && state[i][key] === action.data.id) {
              isExists = true;
            }
          }
        }
        if (!isExists) {
          return [action?.data, ...state];
        }
      case "reduce":
        const gallonIndex = state?.findIndex(
          (elem) => elem?._id === action?.data?._id
        );

        if (gallonIndex) {
          state?.splice(gallonIndex, 1);
        }
        return state;
      default:
        throw new Error("invalid command");
    }
  };

  const [selectedVehicle, setSelectedVehicle] = useState();
  const [selectedGallons, dispatchSelectedGallons] = useReducer(
    selectedGallonsReducer,
    []
  );
  console.log("selectedGallonsselectedGallons", selectedGallons);

  // FORM
  const initialValue = {
    gallon_id: "",
    total: "",
  };
  const [form, setForm] = useState([]);
  useEffect(() => {
    function createForm() {
      const f = [];
      for (let i = 0; i < selectedGallons?.length; i++) {
        f.push({ id: i, gallon_id: "", total: "" });
      }
      setForm(f);
    }
    createForm();
  }, [selectedGallons]);

  const handleFormInputsChange = (value, index, id) => {
    const data = [...form];
    data[index]["gallon_id"] = id;
    data[index]["total"] = value;
    console.log("idid", id);
    setForm(data);
  };
  // create form that list of object that has gallon_id and total
  // put name in text input and get id by name.
  // to get total or value of an text input? hmm?
  console.log("[FORM]", form);
  return (
    <SafeAreaView className="m-1 bg-gray-50 p-2 flex-1 ">
      <ScrollView>
        {/* MODALS  */}
        <ChooseVehicleModal
          setIsShow={setSelectVehicleModal}
          isShow={selectVehicleModal}
          setSelectedVehicle={setSelectedVehicle}
        />
        <ChooseGallonModal
          isShow={selectGallonModal}
          setIsShow={setSelectGallonModal}
          selectedGallons={selectedGallons}
          dispatchSelectedGallons={dispatchSelectedGallons}
        />

        {/* gallons  */}
        <View className="flex-row items-center justify-around w-full ">
          <View className=" h-[140px] w-[100px]">
            <TouchableOpacity
              onPress={() => {
                mutate("/api/vehicles");
                setSelectVehicleModal(!selectVehicleModal);
              }}
              className="items-center justify-center border-[1px] border-gray-200 overflow-hidden shadow-xl shadow-gray-200 bg-white h-[100px] w-[100px] rounded-xl"
            >
              <MatComIcon name="truck-outline" size={50} color="#2389DA" />
              {/* <Image
                source={{
                  uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
                }}
                className=" w-full h-full rounded-xl "
              /> */}
            </TouchableOpacity>
            <Text className="text-center text-gray-600 text-[12px] mt-1 font-semibold">
              Select vehicle
            </Text>
          </View>
          <View className=" h-[140px] w-[100px]">
            <TouchableOpacity
              onPress={() => {
                mutate("/api/gallons");
                setSelectGallonModal(!selectGallonModal);
              }}
              className="items-center justify-center border-[1px] border-gray-200 overflow-hidden shadow-xl shadow-gray-200 bg-white h-[100px] w-[100px] rounded-xl"
            >
              <View className="relative w-full h-full items-center justify-center">
                <Image
                  source={gallons?.slim_gallon}
                  className=" w-[60%] h-[60%] rounded-xl "
                />
                <View className="absolute">
                  <MatComIcon name="plus" size={32} color="white" />
                </View>
              </View>
            </TouchableOpacity>
            <Text className="text-center text-gray-600 text-[12px] mt-1 font-semibold">
              Select gallon
            </Text>
          </View>
        </View>
        {selectedVehicle ? (
          <View className="flex-col p-2  h-[150px] shadow-lg shadow-gray-500 rounded-xl bg-white mx-2 overflow-hidden">
            <View>
              <Text className="text-gray-700 font-bold">Selected Vehicle</Text>
            </View>
            <View className="flex-row justify-between overflow-hidden rounded-md">
              <View className="w-[50%] bg-gray-100 rounded-xl overlfow-hidden justify-center items-center">
                <Image
                  source={{
                    uri: selectedVehicle?.vehicle_image,
                  }}
                  className=" w-[80%] h-[80%] object-cover "
                />
              </View>
              <View className="w-[50%] p-2 items-center justify-center">
                <Text className="font-bold text-gray-600 text-[16px] text-center">
                  {selectedVehicle?.vehicle_id.toUpperCase()}
                </Text>
                <Text className="font-semibold text-gray-500">
                  {selectedVehicle?.vehicle_name}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <Text className="text-gray-700 font-bold">No selected vehicle</Text>
        )}

        {selectedGallons?.length ? (
          <View className="flex-col p-2 mb-5 shadow-lg shadow-gray-500 rounded-xl bg-white mx-2 overflow-hidden mt-5">
            <View className="mt-2 flex-row items-center">
              <Text className="text-gray-700 font-bold">Selected gallons</Text>
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
                        {gallon?.gallon_name}
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
                        handleFormInputsChange(value, i, gallon?.id)
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
        ) : (
          <View className="mt-2 flex-row items-center">
            <Text className="text-gray-700 font-bold">No selected gallons</Text>
          </View>
        )}
      </ScrollView>
      <View className="flex-row justify-between ">
        <TouchableOpacity className="w-[49%] py-3 flex-row bg-gray-50 border-[1px] border-gray-200 justify-center items-center rounded-xl">
          <Pressable>
            <Text className="text-center text-red-500">Reset</Text>
          </Pressable>
        </TouchableOpacity>
        <TouchableOpacity className="w-[49%] py-3 bg-[#2389DA] flex-row justify-center items-center rounded-xl">
          <Pressable>
            <Text className="text-center text-gray-50">Create</Text>
          </Pressable>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ActionNewDelivery;
