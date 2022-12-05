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
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import useSWR, { useSWRConfig } from "swr";
import { SafeAreaView } from "react-native-safe-area-context";
import gallons from "../../../assets/gallon";
import ChooseVehicleModal from "../../components/new-delivery/ChooseVehicleModal";
import ChooseGallonModal from "../../components/new-delivery/ChooseGallonModal";
import { apiPost } from "../../services/api/axios.method";
import ErrorMessageModal from "../../components/general/modal/ErrorMessageModal";

import PromptModal from "../../components/general/modal/PromptModal";
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

  const [selectedVehicle, setSelectedVehicle] = useState();
  const [selectedGallons, dispatchSelectedGallons] = useReducer(
    selectedGallonsReducer,
    []
  );
  console.log("selectedGallonsselectedGallons", selectedGallons);

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

  const handleFormInputsChange = (value, index, id) => {
    const data = [...form];
    data[index]["gallon"] = id;
    data[index]["total"] = value;
    console.log("idid", id);
    setForm(data);
  };
  // create form that list of object that has gallon and total
  // put name in text input and get id by name.
  // to get total or value of an text input? hmm?
  console.log("[FORM]", form);

  // RESET
  const handleReset = () => {
    setSelectedVehicle();
    dispatchSelectedGallons({ type: "reset", data: [] });
    setForm([]);
  };

  // PROMPT MODAL
  const [isShownPrompt, setIsShownPrompt] = useState(false);
  const togglePrompt = () => {
    setIsShownPrompt(!isShownPrompt);
  };

  // ERROR MODAL
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong.");
  const toggleErrorModal = () => {
    setIsErrorModalVisible(!isErrorModalVisible);
  };

  // SUBMIT
  const handleSubmit = async () => {
    const payload = {
      vehicle_id: selectedVehicle?._id,
      items: form,
    };
    var isAllFieldSupplied = true;
    // check if all items keys has supplied value.
    for (let i = 0; i < form.length; i++) {
      for (key in form[i]) {
        if (form[i][key].length && payload?.vehicle_id) {
          isAllFieldSupplied = true;
        } else {
          isAllFieldSupplied = false;
          break;
        }
      }
    }
    if (isAllFieldSupplied) {
      const res = await apiPost({
        url: "/api/delivery",
        payload: payload,
      });
      console.log("postData", res);
      const status = res?.error?.response?.status;
      if (res.data && !res?.error) {
        // reset
        // annother alert that success
        togglePrompt();
        handleReset();
      } else if (status === 409) {
        setErrorMessage(
          "You cannot create another delivery while you have an ongoing delivery."
        );
        toggleErrorModal();
      } else {
        setErrorMessage(
          "Sorry, something went wrong. If this message keeps showing, please try to restart the app."
        );
        toggleErrorModal();
      }
    } else {
      setErrorMessage("All fields are required.");
      toggleErrorModal();
    }
  };

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
        <ErrorMessageModal
          message={errorMessage}
          toggleModal={toggleErrorModal}
          isModalVisible={isErrorModalVisible}
          animationOutTiming={100}
        />
        <PromptModal
          confirmText="Yes"
          confirmHandler={handleSubmit}
          message="Do you want to proceed?"
          toggleModal={togglePrompt}
          isModalVisible={isShownPrompt}
          animationOutTiming={200}
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
        <TouchableOpacity
          onPress={handleReset}
          className="w-[49%] py-3 flex-row bg-gray-50 border-[1px] border-gray-200 justify-center items-center rounded-xl"
        >
          <Pressable>
            <Text className="text-center text-red-500">Reset</Text>
          </Pressable>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (form.length && selectedVehicle) {
              togglePrompt();
            }
          }}
          className="w-[49%] py-3 bg-[#2389DA] flex-row justify-center items-center rounded-xl"
        >
          
            <Text className="text-center text-gray-50">Create</Text>
        
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ActionNewDelivery;
