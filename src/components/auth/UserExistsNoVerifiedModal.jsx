import {
  View,
  Text,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
const UserExistsNoVerifiedModal = ({
  message,
  toggleModal,
  isModalVisible,
  animationIn,
  animationOut,
}) => {
  const navigation = useNavigation();
  return (
    <Modal isVisible={isModalVisible}>
      <View className="bg-slate-100 rounded-lg p-2 shadow-sm flex gap-y-10 justify-center items-center">
        <Text className="text-center">{message}</Text>
        <View className="flex-row gap-x-3 justify-around w-full p-2">
          <TouchableOpacity
            onPress={()=>navigation.navigate("Login")}
            className="bg-blue-600 px-4 py-2 rounded-md "
          >
            <Text className="text-white rounded-md ">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text className="text-blue-600">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UserExistsNoVerifiedModal;
