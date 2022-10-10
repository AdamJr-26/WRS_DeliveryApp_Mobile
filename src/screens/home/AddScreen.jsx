import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import React, { useLayoutEffect, useState} from "react"
import { useNavigation } from "@react-navigation/native";
import MatcomIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MatIcons from "react-native-vector-icons/MaterialIcons";
const getVW = Dimensions.get("screen").width;
const getVH = Dimensions.get("screen").height;
import NewScreenOptions from "../components/NewScreenOptions";
// import CreateRenderOrderComponent from "../components/CreateRenderOrderComponent";
const AddScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  // #2389DA

  const [createOrderVisible, setCreateOrderVisible] = useState(false)
  return (
    <View className={Platform.OS === "android" ? "pt-5" : "pt-0"}>
      <NewScreenOptions navigation={navigation} createOrderVisible={createOrderVisible} setCreateOrderVisible={setCreateOrderVisible}  />

      {/*  */}

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={createOrderVisible}
        onRequestClose={() => {
          setModalVisible(!createOrderVisible);
        }}
      >
        <CreateRenderOrderComponent />
      </Modal> */}
    </View>
  );
};

export default AddScreen;
