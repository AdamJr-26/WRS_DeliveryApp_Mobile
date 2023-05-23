import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";


const FormButtons = ({
  step,
  handleNext,
  handlePrev,
  enabledNext,
  enabledPrev,
  enabledSubmit,
  handleSubmit,
  isSubmitting,
}) => {
  
  if (step === "Vehicle") {
    return (
      <View className="mx-[14px] bg-transparent absolute bottom-2 left-0 right-0">
        <TouchableOpacity
          onPress={() => handleNext()}
          disabled={enabledNext && step === "Vehicle" ? false : true}
          className={`${
            enabledNext ? "bg-[#2389DA]" : "bg-gray-200"
          } h-[50px] w-full rounded-full items-center justify-center`}
        >
          <Text className="font-bold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (step === "Schedules") {
    return (
      <View className="flex-row gap-x-1 w-full w-screen  bg-transparent absolute bottom-2 left-0 right-0 px-[10px]">
        <TouchableOpacity
          onPress={handlePrev}
          className="border-[1px] border-[#2389DA] bg-gray-100 h-[50px] w-[50%] rounded-full items-center justify-center"
        >
          <Text className="font-bold text-[#2389DA]  ">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          disabled={enabledNext && step === "Schedules" ? false : true}
          className={`${
            enabledNext ? "bg-[#2389DA]" : "bg-gray-200"
          } h-[50px] h-[50px] w-[50%] rounded-full items-center justify-center`}
        >
          <Text className="font-bold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (step === "Finalize & Submit") {
    return (
      <View className="flex-row gap-x-1 w-full w-screen  bg-transparent absolute bottom-2 left-0 right-0 px-[10px]">
        <TouchableOpacity
          onPress={handlePrev}
          className="bg-gray-100 h-[50px] w-[50%] rounded-full items-center justify-center"
        >
          <Text className="font-bold text-gray-600">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#2389DA] h-[50px] w-[50%] rounded-full items-center justify-center"
        >
          {isSubmitting ? (
            <ActivityIndicator size={24} color="white" />
          ) : (
            <Text className="font-bold text-white">Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
};

export default FormButtons;
