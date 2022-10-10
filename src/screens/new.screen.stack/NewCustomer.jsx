import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AppTextInput from "../../components/general/AppTextInput";
const ActionNewCustomer = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");

  const [contactNumber, setContactNumber] = useState();
  const [email, setEmail] = useState("");

  const [province, setProvince] = useState("");
  const [muniCity, setMuniCity] = useState("");
  const [barangay, setBarangay] = useState("");
  const [street, setStreet] = useState("");

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="m-2 p-2 rounded-xl shadow-lg shadow-gray-400 bg-white ">
      <View className="flex-col p-2 ">
        <Text className="font-bold text-gray-700">Name</Text>
        <AppTextInput
          label="Firstname *"
          placeholder="Firstname"
          value={firstname}
          setValue={setFirstname}
        />
        <AppTextInput
          label="Lastname"
          placeholder="Lastname"
          value={lastname}
          setValue={setLastname}
        />
        <AppTextInput
          label="Gender"
          placeholder="Gender"
          value={gender}
          type=""
          setValue={setGender}
        />
      </View>
      <View className="p-2">
        <Text className="font-bold text-gray-700">Contact Information</Text>
        <AppTextInput
          label="Number"
          placeholder="09xxxxxxxxx"
          value={contactNumber}
          type="numeric"
          setValue={setContactNumber}
        />
        <AppTextInput
          label="Email"
          placeholder="Add email"
          value={email}
          type=""
          setValue={setEmail}
        />
      </View>
      <View className="p-2">
        <Text className="font-bold text-gray-700">Address</Text>
        <AppTextInput
          label="province"
          placeholder="Province"
          value={province}
          type=""
          setValue={setProvince}
        />
        <AppTextInput
          label="Municipality / City"
          placeholder="Municipality / City"
          value={muniCity}
          type=""
          setValue={setMuniCity}
        />
        <AppTextInput
          label="Barangay"
          placeholder="Barangay"
          value={barangay}
          type=""
          setValue={setBarangay}
        />
        <AppTextInput
          label="Street, Building, House no."
          placeholder="Street, Building, House no."
          value={street}
          type=""
          setValue={setStreet}
        />
      </View>
      <View className="flex-col items-center justify-center w-full">
        <TouchableOpacity className="bg-blue-800 py-3 w-full  rounded-full">
          <Text className="w-full text-center  font-semibold text-gray-50">
            create
          </Text>
        </TouchableOpacity>
      </View>
      <Text>{firstname}</Text>
    </ScrollView>
  );
};

export default ActionNewCustomer;
