import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";

const StepFinalizeAndSubmit = ({
  selectedVehicle,
  form,
  selectedSchedules,
  totalLoad,
  exceededLoad,
}) => {
  console.log("formformform", form);
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="gap-y-2">
      <View className="gap-y-2">
        <Text className="font-bold text-[16px]">Vehicle</Text>
        <View
          className={`flex-row rounded-xl border-[2px] border-gray-200
          overflow-hidden`}
        >
          <View className="bg-gray-200  flex items-center justify-center h-[120px] w-[120px]">
            <Image
              source={{
                uri: selectedVehicle?.vehicle_image,
              }}
              className=" w-[90%] h-[90%]  "
            />
          </View>
          <View className="p-2 justify-around flex-1">
            <Text className="font-semibold text-[16px]">
              {selectedVehicle?.vehicle_name}
            </Text>
            <View className="gap-y-1">
              <View className="flex-row justify-between">
                <Text className="text-[12px] text-gray-500">Plate number:</Text>
                <Text className="text-[12px] font-bold">
                  {" "}
                  {selectedVehicle?.vehicle_id}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-[12px]  text-gray-500">Load limit:</Text>
                <Text className="text-[12px] font-bold">
                  {selectedVehicle?.loadLimit}kg
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="gap-y-2 py-2 border-b-[1px] border-gray-200">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-[16px]">Gallons</Text>
          <TouchableOpacity className="px-3 py-2 rounded-full bg-[#2389DA]">
            <Text className="text-white">Add a Gallon</Text>
          </TouchableOpacity>
        </View>
        {form.map((gallon, i) => (
          <View key={i} className="py-2 flex-row justify-between items-center ">
            <View className="flex-row items-center  gap-x-2">
              <View className="h-[70px] w-[70px] bg-gray-200 rounded-full overflow-hidden">
                <Image
                  source={{
                    uri: gallon?.gallon_image,
                  }}
                  className=" w-[100%] h-[100%]  "
                />
              </View>
              <View>
                <Text className="font-bold text-[16px] ">{gallon.name}</Text>
                <Text className="text-[12px]">{gallon.liter} liter(s)</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-x-2">
              <TouchableOpacity className="items-center justify-center border-[1px] border-[#2389DA] rounded-xl p-1">
                <Text className="font-bold">
                  <MatComIcon name="minus" size={24} color="#2389DA" />
                </Text>
              </TouchableOpacity>
              <View className="rounded-xl border-[2px] border-gray-200 p-3">
                <Text>{gallon.total}</Text>
              </View>
              <TouchableOpacity className="items-center justify-center border-[1px] border-[#2389DA] rounded-xl p-1">
                <Text className="font-bold">
                  <MatComIcon name="plus" size={24} color="#2389DA" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View className="gap-y-2">
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-[16px]">Schedules Selected</Text>
          <Text className="font-semibold text-[16px]">
            {selectedSchedules.length}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className=" text-[12px] text-gray-400">Total Gallon Load</Text>
          <Text className=" text-[14px] text-gray-400">{totalLoad}kg</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className=" text-[12px] text-gray-400">Exceeded Load</Text>
          <Text className="font-semibold text-[14px] text-red-600">
            {exceededLoad > 0 ? exceededLoad : 0}kg
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-[19px] text-gray-600">
            Gallons
          </Text>
          <Text className="font-semibold text-[19px] text-gray-600">
            {form.length}
          </Text>
        </View>
        {/* <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-[16px]">Total Price</Text>
          <Text className="font-semibold text-[22px]">₱ 2</Text>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default StepFinalizeAndSubmit;
