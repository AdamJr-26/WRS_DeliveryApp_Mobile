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
    FlatList,
  } from "react-native";
  import React, { useState, useEffect, useReducer } from "react";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import SimpleIcons from "react-native-vector-icons/SimpleLineIcons";
  
  import { SafeAreaView } from "react-native-safe-area-context";
  import SearchTextinput from "../../components/general/SearchTextinput";
  import RenderSearchResults from "../../components/new-order/RenderSearchResults";
  
  // i used orders dummy data just for names
  import { orders } from "../../services/utils/dummyData";
  import OrderGallonInputCard from "../../components/general/OrderGallonInputCard";
  const NewOrder = ({ navigation }) => {
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;
    const [searchValue, setSearchValue] = useState();
  
    const [searchCustomerModalState, setSearchCustomerModalState] =
      useState(false);
  
    const [gallonsModalState, setGallonsModalState] = useState(false);
  
    // to keep this items rerender when the parent componet are rendered.
    const RenderItemForSearchResults = ({ item }) => (
      <RenderSearchResults
        name={item.name}
        address={item.address}
        imageLink={item.image}
      />
    );
  
    // reducerrrrrrrrrrrrrrr for select gallon
    const gallonReducer = (state, action) => {
      switch (action.type) {
        case "add":
          return [...state, action.newAddedGallon];
        case "reset":
          state = []
          return state
      }
    };
    const [addedGallon, dispatchtAddedGallon] = useReducer(gallonReducer, []);
    // --------------------------------------------------------------
    return (
      <ScrollView className="flex-1 p-2 overflow-hidden ">
        <View className="bg-white p-2 rounded-xl">
          <View className="flex-row justify-between">
            <Text className="font-bold">Customer</Text>
            <Pressable
              onPress={() =>
                setSearchCustomerModalState(!searchCustomerModalState)
              }
            >
              <Ionicons name="search" size={24} color="black" />
            </Pressable>
          </View>
          <View>
            <View className="border-[1px] border-gray-300 bg-white p-2 flex-row items-center rounded-xl overflow-hidden shadow-2xl shadow-gray-400 mt-2">
              <View className="flex-row items-center justify-center w-[50px] h-[50px] ">
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
                  }}
                  className=" w-full h-full rounded-xl "
                />
              </View>
              {/* customer info */}
              <View className="flex-col gap-1 ml-2">
                <Text className="font-bold text-gray-600 text-[19px]">
                  Juan Dela Cruz
                </Text>
                <Text className="text-gray-500 font-semibold ">
                  #434 Mahogany st. Bunsuran 1st
                </Text>
                <View className="bg-yellow-600 rounded-full overflow-hidden">
                  <Text className=" w-auto text-center text-gray-50 font-semibold text-[12px]">
                    regular
                  </Text>
                </View>
              </View>
            </View>
            {/* balance */}
            <View className="border-[1px] border-gray-300 bg-white w-full mt-1 rounded-xl shadow-sm shadow-gray-900">
              <View className=" right-2  flex-col justify-center items-center p-2  rounded-lg">
                <Text className="font-bold text-gray-500 text-[10px]">
                  Balance
                </Text>
                <Text className="font-bold mt-1 ">-P 200.00</Text>
              </View>
            </View>
          </View>
          <View className="mt-3">
            <View className="flex-row justify-between px-2 ">
              <Text className="font-bold">Add Order</Text>
              <Pressable
                onPress={() =>
                  dispatchtAddedGallon({
                    type: "reset",
                  })
                }
              >
                <Text className="text-red-700 font-bold">reset</Text>
              </Pressable>
            </View>
            {/* #======================================================================================== */}
            {/* all added gallons */}
            {addedGallon?.length ? (
              addedGallon.map((gallon) => (
                <OrderGallonInputCard key={gallon.id} gallon={gallon} />
              ))
            ) : (
              <View className="flex-row items-center justify-center p-2">
                <Text>Click plus sign below to add gallon</Text>
              </View>
            )}
            {/* add button */}
            {/* #================================================================================== */}
            <View className="p-2 w-full items-center justify-center">
              <Pressable
                onPress={() => setGallonsModalState(!gallonsModalState)}
                className="p-2 flex-row items-center justify-center border-gray-300 border-[2px]"
              >
                <Ionicons name="add" size={deviceWidth / 8} color="gray" />
              </Pressable>
            </View>
          </View>
        </View>
        {/* ############################################################################################# */}
        {/* modal for select gallons */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={gallonsModalState}
          onRequestClose={() => setGallonsModalState(!gallonsModalState)}
        >
          <View className="flex-1 flex-col justify-between">
            <View className="h-auto flex-1 bg-gray-300 opacity-40">
              {/* click to close */}
              <Pressable
                onPress={() => setGallonsModalState(!gallonsModalState)}
                className="h-full"
              ></Pressable>
            </View>
            <View className="bg-white  p-2 ">
              <View className="flex-row justify-between p-2">
                <Text className="font-bold ">Select Gallon</Text>
                <Pressable
                  onPress={() => setGallonsModalState(!gallonsModalState)}
                >
                  <Ionicons name="close" size={24} />
                </Pressable>
              </View>
              {[
                { id: 1, name: "Imperiral Gallon", volume: "25" },
                { id: 2, name: "US Gallon", volume: "25" },
                { id: 3, name: "Small Bottle", volume: "1" },
              ].map((item) => (
                <TouchableOpacity
                  
                  onPress={() => {
                    dispatchtAddedGallon({
                      type: "add",
                      newAddedGallon: item,
                    });
                    setGallonsModalState(!gallonsModalState);
                  }}
                  key={item.id}
                  className="bg-gray-200 rounded-md mt-1 p-2"
                >
                  <View>
                    <Text className="font-bold">{item.name}</Text>
                    <Text>{item.volume} Liter(s)</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
        {/* ############################################################################################# */}
        {/* modalllllllllllllll for search customer */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={searchCustomerModalState}
          onRequestClose={() =>
            setSearchCustomerModalState(!searchCustomerModalState)
          }
        >
          <View className="flex-1 flex-col justify-between">
            <View className="h-auto flex-1 bg-gray-300 opacity-40">
              {/* click to close */}
              <Pressable
                onPress={() =>
                  setSearchCustomerModalState(!searchCustomerModalState)
                }
                className="h-full"
              ></Pressable>
            </View>
            <View className="bg-white  p-2 ">
              <View className="flex-row justify-between p-2">
                <Text className="font-bold ">Find Customer</Text>
                <Pressable
                  onPress={() =>
                    setSearchCustomerModalState(!searchCustomerModalState)
                  }
                >
                  <Ionicons name="close" size={24} />
                </Pressable>
              </View>
              <View>
                <SearchTextinput value={searchValue} setValue={setSearchValue} />
                <View
                  className="p-2 flex-cols "
                  style={{ height: deviceHeight / 2 }}
                >
                  <Text className="font-bold">Results</Text>
                  {/* results flat list */}
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={orders}
                    renderItem={RenderItemForSearchResults}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  };
  
  export default NewOrder;
  