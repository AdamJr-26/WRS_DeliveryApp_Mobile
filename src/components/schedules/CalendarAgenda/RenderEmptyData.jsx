import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import heroes from "../../../../assets/hero";
import { useNavigation } from "@react-navigation/native";

const RenderEmptyData = () => {
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

  const navigation = useNavigation();
  return (
    <View className="bg-white flex-1 items-center justify-center">
      <View style={{ width: windowWidth / 1.5, height: windowWidth / 1.5 }}>
        <Image
          source={heroes?.date_picker}
          className="w-full h-full object-contain"
        />
      </View>
      <Text className="text-[16px] font-bold text-center">
        There is no schedule on this day.
      </Text>
      <Text className="text-[12px] text-gray-500 font-semibold text-center">
        Create a schedule by tapping the button below.
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("New", {
            screen: "New Schedule",
            initial: false,
            params: {
              customer: null,
            },
          })
        }
        className="bg-[#2389DA] rounded-full px-5 py-3 mt-2"
      >
        <Text className="items-center text-white font-semibold">
          Create Schedule
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RenderEmptyData;
