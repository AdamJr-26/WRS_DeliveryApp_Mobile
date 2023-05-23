import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useLayoutEffect, useState, useReducer } from "react";

import { useNavigation } from "@react-navigation/native";
import FormButtons from "../../components/new-delivery/FormButtons";
import StepVehicle from "../../components/new-delivery/StepVehicle";
import StepsWrapper from "../../components/new-delivery/StepsWrapper";
import useFetch from "../../hooks/api/swr/useFetch";
import { useEffect } from "react";
import { apiPost } from "../../services/api/axios.method";
const Delivery = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const steps = [
    {
      step: 1,
      name: "Vehicle",
    },
    {
      step: 2,
      name: "Schedules",
    },
    {
      step: 3,
      name: "Finalize & Submit",
    },
  ];
  const [step, setStep] = useState({
    step: 1,
    name: "Vehicle",
  });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const {
    data: vehiclesData,
    error,
    mutate: mutateVehicle,
  } = useFetch({
    url: "/api/vehicles/available",
  });

  // handle selecting schedules. ---------------------------------------
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

  // REMOVE , ADD, RESET ITEM ON REDUCER.
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
  //   CREATE FORM ##########---------------------------------------------------------------
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
              gallon_image: item.gallon.gallon_image,
            });
          }
        }
      }
      setForm(data);
      setSelectedRoutes(selected_scheds);
    }
    createForm();
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

  //    HANDLE SUBMIT ---------------------------------------------------------
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
      navigation.goBack();
      setForm([]);
      setSelectedVehicle(null);
      setSelectedRoutes([]);
      ToastAndroid.show(
        "Delivery form submitted successfully.",
        ToastAndroid.BOTTOM
      );
    } else {
      ToastAndroid.show("Please try again.", ToastAndroid.BOTTOM);
    }
  }
  //   NEXT PREV BUTTONS -----------------------------------------------------
  function handleNext() {
    if (step.name === "Vehicle") {
      setStep({
        step: 2,
        name: "Schedules",
      });
    } else if (step.name === "Schedules") {
      setStep({
        step: 3,
        name: "Finalize & Submit",
      });
    }
  }
  function handlePrev() {
    if (step.name === "Schedules") {
      setStep({
        step: 1,
        name: "Vehicle",
      });
    } else if (step.name === "Finalize & Submit") {
      setStep({
        step: 2,
        name: "Schedules",
      });
    }
  }
  const [enabledPrev, setEnabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);
  useEffect(() => {
    if (step.name === "Vehicle" && selectedVehicle) {
      setDisabledNext(true);
    } else if (step.name === "Schedules" && selectedSchedules.length) {
      setDisabledNext(true);
    } else {
      setDisabledNext(false);
    }
  }, [step, selectedVehicle, selectedSchedules]);

  return (
    <View className="flex-1 bg-white ">
      <View className="px-[14px] py-4 border-b-[1px] border-gray-200 w-screen">
        <Text className="font-bold text-[14px]">New Delivery</Text>
      </View>

      <View className="m-[14px] ">
        <Text className="font-bold text-[24px]">
          Step {step.step}/3: {step.name}
        </Text>
        <Text className="text-[12px]">
          Select a vehicle to be used for delivering the gallons.
        </Text>
      </View>
      {/* IF STEP 2 OR SELECTING SCHEDULES SHOW THIS VIEW */}
      {step.step === 2 ? (
        <View className="m-[14px] flex-row justify-between">
          <Text className="font-bold">
            {selectedSchedules?.length} Selected
          </Text>
          <View
            className={`px-4 py-1 rounded-full ${
              exceededLoad > 0 ? "bg-red-200" : "bg-green-200"
            }`}
          >
            <Text
              className={`font-semibold ${
                exceededLoad > 0 ? "text-red-800" : "text-green-800"
              }`}
            >
              {totalLoad}kg/{selectedVehicle?.loadLimit}kg
            </Text>
          </View>
        </View>
      ) : null}
      <View className="border-b-[1px] border-gray-200 w-full h-[1px] m-0"></View>
      {/* I PULLED SOME CONTENS THAT HIDDEN IN TAB BAR USING THIS mb-[200px]
        and I also used that in StepSchedules.mb-[60px]
      */}
      <View className="m-[14px] mb-[200px]">
        {/* 
            ############## Component tree ##############
            StepsWrapper:
                Stepvehicle:
                    etc.
        */}
        <StepsWrapper
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          vehiclesData={vehiclesData}
          step={step}
          handleSelectSchedule={handleSelectSchedule}
          selectedSchedules={selectedSchedules}
          form={form}
          totalLoad={totalLoad}
          exceededLoad={exceededLoad}
        />
      </View>
      <FormButtons
        step={step.name}
        handleNext={handleNext}
        handlePrev={handlePrev}
        enabledNext={disabledNext}
        enabledPrev={false}
        enabledSubmit={false}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </View>
  );
};

export default Delivery;
