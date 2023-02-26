import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Dimensions,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";

import React, { useState, useEffect } from "react";
import heroes from "../../../../assets/hero";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDes from "react-native-vector-icons/AntDesign";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../../hooks/auth";
import usePickImage from "../../../hooks/custom/usePickImage";
import { apiPutWithFile } from "../../../services/api/axios.method";
import WrsInfo from "./WrsInfo";

const Profile = ({ isShow, setIsShow, revalidateUser }) => {
  const { user, logout } = useAuth();
  console.log("userrrrr", user);
  const [image, pickImage] = usePickImage();
  const [isChanginProfile, setIsChanginProfile] = useState(false);
  useEffect(() => {
    async function onChangeImage() {
      if (!image) return;
      setIsChanginProfile(true);
      const { data, error } = await apiPutWithFile({
        url: "/api/personel/display-photo",
        payload: {
          file: image,
        },
      });
      if (data && !error) {
        revalidateUser();
        setIsChanginProfile(false);
        ToastAndroid.show(
          "Display picture changed successfully.",
          ToastAndroid.SHORT
        );
      } else {
        setIsChanginProfile(false);
        ToastAndroid.show(
          "Attempting to change the display photo failed.",
          ToastAndroid.SHORT
        );
      }
    }
    onChangeImage();
  }, [image]);

  const [showWrsinfo, setShowWrsinfo] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow);
      }}
    >
      {/* nested modal */}
      <WrsInfo
        isShow={showWrsinfo}
        setIsShow={setShowWrsinfo}
        wrs_info={user?.adminInfo[0]}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="p-2 flex-1 h-full bg-gray-50"
      >
        <View className="relative ">
          <TouchableOpacity onPress={() => setIsShow(!isShow)}>
            <Ionicons name="chevron-back" size={32} />
            {/* chevron-down-sharp */}
          </TouchableOpacity>
          <TouchableOpacity className="absolute left-[45%] ">
            <Text className="font-bold text-[16px] top-1">Profile</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-5 items-center">
          <View className=" w-[100px] h-[100px] items-center justify-ceter rounded-full border-[2px] border-gray-200 overflow-hidden">
            {image ? (
              <Image source={{ uri: image?.uri }} className="h-full w-full  " />
            ) : (
              <Image
                source={{ uri: user?.display_photo }}
                className="h-full w-full  "
              />
            )}
            {/* <Image source={heroes?.void} className="h-full w-[85%]  " /> */}
          </View>
          <TouchableOpacity
            onPress={() => pickImage()}
            className="absolute right-0 bottom-0 indent-10 p-1 bg-gray-200 rounded-full"
          >
            <MatIcons name="camera-retake-outline" size={24} />
          </TouchableOpacity>
          <Text className="text-gray-700 font-semibold mt-1 text-[21px]">
            {user?.firstname} {user?.lastname}
          </Text>
          {user?.nickname ? (
            <Text className="text-[13px] text-gray-500 font-semibold">
              {user?.nickname}
            </Text>
          ) : (
            <TouchableOpacity>
              <Text className="text-[12px] font-semibold text-gray-400">
                Set Nickname
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="mt-2 border-t-[1px] border-t-gray-200 flex-row items-center h-[70px] justify-around">
          <View className="items-center">
            <Text className="font-bold text-[16px] text-gray-700">1545</Text>
            <Text className="text-[12px] text-gray-500 ">Placeholder</Text>
          </View>
          <View className="items-center">
            <Text className="font-bold text-[16px] text-gray-700">15</Text>
            <Text className="text-[12px] text-gray-500 ">Placeholder</Text>
          </View>
          <View className="items-center justify-center">
            <View className="flex-row items-center justify-center">
              <Text className="font-bold text-[16px] text-gray-700 ">4.5</Text>
              <View className="ml-1">
                <Ionicons name="star-sharp" size={20} />
              </View>
            </View>
            <Text className="text-[12px] text-gray-500 ">Rating</Text>
          </View>
        </View>
        <View className="p-2 bg-white rounded-xl mt-4">
          <View>
            <TouchableOpacity className="flex-row items-center justify-between px-2 py-4">
              <View className="flex-row items-center">
                <View className="items-center justify-center bg-gray-100 p-3 rounded-xl">
                  <Ionicons name="settings" size={19} color="gray" />
                </View>
                <Text className="ml-4 font-bold ">Settings</Text>
              </View>
              <View className="items-center justify-center">
                <Ionicons name="chevron-forward-outline" size={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowWrsinfo(!showWrsinfo)}
              className="flex-row items-center justify-between px-2 py-4"
            >
              <View className="flex-row items-center">
                <View className="items-center justify-center bg-gray-100 p-3 rounded-xl">
                  <Ionicons name="business" size={19} color="gray" />
                </View>
                <Text className="ml-4 font-bold ">WRS Info</Text>
              </View>
              <View className="items-center justify-center">
                <Ionicons name="chevron-forward-outline" size={24} />
              </View>
            </TouchableOpacity>
          </View>
          <View className="mt-5 border-t-[1px] border-t-gray-200">
            <TouchableOpacity className="flex-row items-center justify-between px-2 py-4">
              <View className="flex-row items-center">
                <View className="items-center justify-center bg-gray-100 p-3 rounded-xl">
                  <AntDes name="team" size={19} color="gray" />
                </View>
                <Text className="ml-4 font-bold ">About</Text>
              </View>
              <View className="items-center justify-center">
                <Ionicons name="chevron-forward-outline" size={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={logout}
              className="flex-row items-center justify-between px-2 py-4"
            >
              <View className="flex-row items-center">
                <View className="items-center justify-center bg-gray-100 p-3 rounded-xl">
                  <MatIcons name="logout" size={19} color="gray" />
                </View>
                <Text className="ml-4 font-bold ">Log out</Text>
              </View>
              <View className="items-center justify-center">
                <Ionicons name="chevron-forward-outline" size={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default React.memo(Profile);
