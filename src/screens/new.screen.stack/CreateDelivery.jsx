import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useReducer } from "react";

import useFetch from "../../hooks/api/swr/useFetch";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { apiPost } from "../../services/api/axios.method";
// NOT USED
const CreateDelivery = () => {
  const {
    data: vehiclesData,
    error,
    mutate: mutateVehicle,
  } = useFetch({
    url: "/api/vehicles/available",
  });
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const {
    data: schedulesData,
    error: schedulesError,
    mutate: mutateShedules,
  } = useFetch({
    url: "/api/schedule-assigned/by-personel",
  });

  // SELECT SCHEDULES.
  // reducer function
  function schedulesReducer(state, action) {
    if (!selectedVehicle) {
      ToastAndroid.show("Please select a vehicle first.", ToastAndroid.BOTTOM);
      return state;
    }
    switch (action.type) {
      case "add":
        let isExists = false;
        for (let i = 0; i < state.length; i++) {
          for (const key in state[i]) {
            if (
              key === "scheduleId" &&
              state[i][key] === action.data.scheduleId
            ) {
              isExists = true;
            }
          }
        }
        if (!isExists) {
          return [...state, action?.data];
        }
      case "remove":
        const isSelected = state.some(
          (sched) => sched.scheduleId === action.data.scheduleId
        );
        if (isSelected) {
          let updatedState = state?.filter(
            (sched) => sched.scheduleId !== action.data.scheduleId
          );
          return updatedState;
        } else {
          return state;
        }

      case "reset":
        if (action?.data instanceof Array) {
          state = action?.data;
          return state;
        } else {
          return state;
        }
    }
  }

  const [selectedSchedules, dispatchSelectedSchedules] = useReducer(
    schedulesReducer,
    []
  );
  function handleSelectSchedule(schedule) {
    const isSelected = selectedSchedules.some(
      (sched) => sched.scheduleId === schedule._id
    );

    if (isSelected && selectedSchedules.length > 1) {
      dispatchSelectedSchedules({
        type: "remove",
        data: {
          scheduleId: schedule._id,
          items: schedule.items,
        },
      });
    } else if (isSelected && selectedSchedules.length === 1) {
      dispatchSelectedSchedules({
        type: "reset",
        data: [],
      });
    } else {
      dispatchSelectedSchedules({
        type: "add",
        data: {
          scheduleId: schedule._id,
          items: schedule.items,
        },
      });
    }
  }

  const [form, setForm] = useState([]);
  const [totalLoad, setTotalLoad] = useState(0);
  const [exceededLoad, setExceededLoad] = useState(0);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  useEffect(() => {
    function createForm() {
      let data = [];
      let selected_scheds = [];
      for (let schedule of selectedSchedules) {
        // ADDDING SCHEDULE
        let isAdded = selected_scheds.some(
          (s) => s.schedule === schedule.scheduleId
        );
        if (!isAdded) {
          selected_scheds.push({
            schedule: schedule.scheduleId,
          });
        }
        // ADDING GALLON
        for (let item of schedule.items) {
          const gallonIndex = data.findIndex(
            (sched) => sched.gallon === item.gallon._id
          );
          if (gallonIndex > -1) {
            data[gallonIndex].total += item.total;
          } else if (gallonIndex < 0) {
            data.push({
              gallon: item.gallon._id,
              total: item.total,
              name: item.gallon.name,
              liter: item.gallon.liter,
            });
          }
        }
      }
      setForm(data);
      setSelectedRoutes(selected_scheds);
    }

    if (!selectedVehicle) {
      ToastAndroid.show("Please select a vehicle first.", ToastAndroid.BOTTOM);
    } else {
      createForm();
    }
  }, [selectedSchedules]);

  // calculate the vehicle limit, schdule lad, exceeded load.
  useEffect(() => {
    function calculateLoad() {
      if (!selectedVehicle) return;
      let gallonLoad = 0;
      for (let gallon of form) {
        let load = gallon.liter * gallon.total;
        gallonLoad = gallonLoad + load;
        setLoadPercentage((gallonLoad / selectedVehicle.loadLimit) * 100);
        setExceededLoad(gallonLoad - selectedVehicle.loadLimit);
      }
      setTotalLoad(gallonLoad);
    }
    calculateLoad();
  }, [selectedVehicle, form]);
  
  async function handleSubmit() {
    setIsSubmitting(true);
    const payload = {
      vehicle_id: selectedVehicle?._id,
      items: form,
      selectedRoutes: selectedRoutes,
    };

    const { data, error } = await apiPost({
      url: "/api/delivery",
      payload: payload,
    });
    setIsSubmitting(false);
    if (data && !error) {
        setForm([])
        setSelectedVehicle(null)
        setSelectedRoutes([])
      ToastAndroid.show(
        "Delivery form submitted successfully.",
        ToastAndroid.BOTTOM
      );
    } else {
      ToastAndroid.show("Please try again.", ToastAndroid.BOTTOM);
    }
  }
  console.log("totalLoad", totalLoad);
  console.log("loadPercentage", loadPercentage.toFixed(0));
  console.log("exceededLoad", exceededLoad);
  console.log("form###############", JSON.stringify(form));
  return (
    <View className="flex-1 bg-white">
      <View className="relative p-2 rounded-xl border-[1px] border-gray-200 m-2 overflow-hidden">
        <View className="">
          <View className="flex-row justify-between">
            <Text className="font-bold">Gallons</Text>
            <TouchableOpacity>
              <MatComIcon name="clipboard-edit" size={24} color="#2389DA" />
            </TouchableOpacity>
          </View>
          <Text className="text-[12px]">
            These are ordered gallons of selected schedules.
          </Text>
        </View>
        <ScrollView
          className="my-2 h-[30px] bg-gray-50 rounded-xl"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {form.map((gallon, i) => (
            <View
              key={i}
              className=" border-[1px] mr-1 border-[#2389DA] flex-row justify-between  items-center px-2 py-1 rounded-full"
            >
              <Text>{gallon.name}</Text>
              <Text className="ml-2 font-semibold">{gallon.total}</Text>
            </View>
          ))}
        </ScrollView>
        <View className="px-1">
          <View>
            <Text className="font-bold">Load limit</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className=" flex-row gap-x-2 bg-gray-50 rounded-xl"
          >
            <View className="flex-row justify-between py-2 mr-2 gap-x-1">
              <Text>Vehicle</Text>
              <Text className="font-bold">
                {selectedVehicle?.loadLimit || 0}KG
              </Text>
            </View>
            <View className="flex-row justify-between py-2 mr-2 gap-x-1">
              <Text>Gallons</Text>
              <Text className="font-bold">{totalLoad}KG</Text>
            </View>
            <View className="flex-row justify-between py-2 mr-2 gap-x-1">
              <Text>Exceeded</Text>
              <Text className="font-bold">
                {exceededLoad < 0 ? 0 : exceededLoad}KG
              </Text>
            </View>
          </ScrollView>
        </View>
        <View className="z-20 flex-row justify-end gap-2 mt-1">
          <TouchableOpacity
            onPress={() => handleSubmit()}
            disabled={form.length && exceededLoad < 0 ? false : true}
            className={`py-2 px-4 rounded-full ${
              form.length && exceededLoad < 0 ? "opacity-100" : "opacity-50"
            } bg-[#2389DA]`}
          >
            {isSubmitting ? (
              <View className=" flex-row justify-between items-center min-w-[80px]">
                <Text className="text-white">
                  <ActivityIndicator size={21} color="white" />
                </Text>
              </View>
            ) : (
              <Text className="text-white font-bold flex-row items-between min-w-[80px]">
                <MatComIcon name="send" size={14} /> Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {/* /loading */}
        {/* <View className="absolute h-[5px] w-[100%] bg-gray-100 bottom-0 left-0 right-0">
          <View
            className={`min-w-[${loadPercentage}%] max-w-[${loadPercentage}%] h-full bg-[#2389DA]`}
          ></View>
        </View> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="">
        <View className="py-2 ml-2">
          <View className="py-2">
            <Text className="font-bold text-[24px]">Select a vehicle</Text>
            <Text>Select vehicle first before choosing schedules.</Text>
          </View>

          {!selectedVehicle ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {vehiclesData?.data?.map((vehicle, i) => (
                <TouchableOpacity
                  onPress={() => setSelectedVehicle(vehicle)}
                  key={i}
                  className="flex flex-col mr-2 rounded-md overflow-hidden  min-w-[200px] max-w-[200px] border-[1px] border-gray-200 rounded-xl"
                >
                  <View className="w-[100%] h-[180px] bg-gray-100">
                    <Image
                      source={{
                        uri: vehicle?.vehicle_image,
                      }}
                      className=" w-[100%] h-[100%]  "
                    />
                  </View>
                  <View className="flex-col flex-2 gap-2 px-2 bg-white index-10">
                    <View className="flex ">
                      <Text className="font-bold text-[16px]">
                        {vehicle?.vehicle_name}
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text className="font-ligth text-[12px]">Plate no.:</Text>
                      <Text className="font-bold text-[14px]">
                        {" "}
                        {vehicle?.vehicle_id}
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text className="font-ligth text-[12px]">
                        Load limit (KG):
                      </Text>
                      <Text className="font-bold text-[14px]">
                        {" "}
                        {vehicle?.loadLimit}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View className="flex">
              <View className="flex flex-col mr-2 rounded-md overflow-hidden min-w-[200px] max-w-[200px] border-[2px] border-[#2389DA] rounded-xl">
                <View className="w-[100%] h-[180px] bg-gray-100 relative">
                  <Image
                    source={{
                      uri: selectedVehicle?.vehicle_image,
                    }}
                    className=" w-[100%] h-[100%]  "
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setSelectedVehicle(null)}
                  className="absolute top-[0%] right-[0px] p-1 bg-gray-50 rounded-full"
                >
                  <MatComIcon name="close" size={32} color="black" />
                </TouchableOpacity>
                <View className="flex-col flex-2 gap-2 px-2 bg-white index-10">
                  <View className="flex ">
                    <Text className="font-bold text-[16px]">
                      {selectedVehicle?.vehicle_name}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text className="font-ligth text-[12px]">Plate no.:</Text>
                    <Text className="font-bold text-[14px]">
                      {" "}
                      {selectedVehicle?.vehicle_id}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text className="font-ligth text-[12px]">
                      Load limit (KG):
                    </Text>
                    <Text className="font-bold text-[14px]">
                      {" "}
                      {selectedVehicle?.loadLimit}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
        <View className="py-2 ml-2">
          <View className="flex-row justify-between py-2">
            <View className="">
              <Text className="font-bold text-[24px]">Select schedules</Text>
              <Text>Select schedules for this delivery.</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                dispatchSelectedSchedules({ type: "reset", data: [] })
              }
              className="p-2 flex-row gap-1 items-center"
            >
              <MatComIcon name="checkbox-blank-off" size={16} color="#2389DA" />
              <Text className="font-bold text-[#2389DA]">Reset</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {schedulesData?.data?.map((schedule, i) => (
              <TouchableOpacity
                onPress={() => handleSelectSchedule(schedule)}
                key={i}
                className="relative p-2 mr-2 min-w-[300px] max-w-[300px] border-[1px] border-gray-200 rounded-xl"
              >
                <View className="absolute top-2 right-2">
                  {/* checkbox-blank-outline */}
                  <MatComIcon
                    name={
                      selectedSchedules.some(
                        (sched) => sched.scheduleId == schedule._id
                      )
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    size={24}
                    color="#2389DA"
                  />
                </View>
                <View className="flex-row gap-2 items-center">
                  <View className="h-[50px] w-[50px] bg-gray-200 rounded-full">
                    <Image
                      source={{
                        uri: schedule?.customer?.display_photo,
                      }}
                      className=" w-full h-full rounded-full "
                    />
                  </View>
                  <View className="flex justify-center">
                    <Text className="font-bold">
                      {" "}
                      {schedule.customer?.firstname || " "}{" "}
                      {schedule.customer?.lastname || " "}.
                    </Text>
                    <Text className="text-[12px] whitespace-nowrap">
                      {schedule.customer?.address?.street},{" "}
                      {schedule.customer?.address?.barangay},{" "}
                      {schedule.customer?.address?.municipal_city}
                    </Text>
                  </View>
                </View>
                <View className="flex-col mt-2">
                  <Text className="font-bold ">Orders</Text>
                  {schedule.items.map((item, i) => (
                    <View
                      key={i}
                      className="flex-row justify-between items-center py-2 gap-2  "
                    >
                      <View className="flex-row items-center">
                        <View className="h-[40px] w-[40px] bg-gray-200 rounded-full mr-2">
                          <Image
                            source={{
                              uri: item.gallon.gallon_image,
                            }}
                            className=" w-full h-full  "
                          />
                        </View>
                        <View>
                          <Text className="font-bold">
                            {item?.gallon?.name}{" "}
                          </Text>
                          <Text className="text-[10px]">
                            {item?.gallon?.liter} Liters{" "}
                          </Text>
                        </View>
                      </View>
                      <View className="flex-row justify-between items-center">
                        <Text className="text-[16px] font-bold">
                          {item?.total}{" "}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateDelivery;
