import { View, Text, Image, TextInput } from "react-native";
import React, { useState, useEffect } from "react";

const RenderItems = ({
  item,
  index,
  form,
  handleFormInputsChange,
  selectedDiscount,
}) => {
  // handle calculation of paid and credited = total purchased.;

  useEffect(() => {
    // check if orders are enough to get free.
    function getTotalFree() {
      const buy = selectedDiscount?.get_free?.buy;
      const orders = form[index]?.orders;
      const get = selectedDiscount?.get_free?.get;
      if (selectedDiscount && orders) {
        console.log("buy >= orders", orders);
        let totalOccured = 0;
        for (let i = 1; i <= orders; i++) {
          if (i % buy === 0) {
            totalOccured = totalOccured + 1;
            // call handle change to update free field
          }
        }
        handleFormInputsChange(get * totalOccured, index, item?._id, "free");
      }
    }
    getTotalFree();
  }, [form[index]?.orders, selectedDiscount]);

  return (
    <View className="mt-2 py-2 border-[1px] border-gray-300 rounded-xl ">
      <View className="p-2 flex-row items-center justify-between">
        <View className="flex-row">
          <View className="w-[50px] h-[50px] rounded-xl">
            <Image
              source={{
                uri: item?.gallon_image,
              }}
              className=" w-full h-full rounded-xl "
            />
          </View>
          <View className="ml-2">
            <Text className="font-bold text-gray-600 ">{item?.name}</Text>
            <Text className="text-gray-500">{item.liter} liter(s)</Text>
          </View>
        </View>
        <View>
          <Text className="text-gray-400 text-[12px] ">regular price</Text>
          <Text className="text-gray-700 font-bold text-center">
            {item?.price}
          </Text>

          <Text className="text-gray-400 text-[12px] ">custom price</Text>
          <TextInput
            placeholder="0"
            className="text-[16px] font-bold text-red-500 items-center justify-center text-center border-b-[1px] border-b-gray-300"
            keyboardType="numeric"
            value={`${form[index]?.price || ""}`}
            onChangeText={(value) =>
              handleFormInputsChange(value, index, item?._id, "price")
            }
          />
        </View>
      </View>
      {/* order detail */}
      <View className="flex-row">
        <View className="p-1 flex-grow justify-center items ">
          <Text className="text-center text-[12px] font-semibold text-gray-500 ">
            Total Orders
          </Text>
          {/* <Text className="font-bold text-gray-800 text-[19px] items-center justify-center text-center border-b-[2px] mt-2 border-b-gray-300">
            {orders}
          </Text> */}
          <TextInput
            placeholder="0"
            className="font-bold text-gray-800 text-[19px] items-center justify-center text-center border-b-[2px] mt-2 border-b-gray-300"
            value={`${form[index]?.orders || ""}`}
            keyboardType="numeric"
            onChangeText={(value) =>
              handleFormInputsChange(value, index, item?._id, "orders")
            }
          />
        </View>
        <View className="p-1 flex-grow justify-center items">
          <Text className="text-center text-[12px] font-semibold text-gray-500 ">
            Will Credit
          </Text>
          <TextInput
            placeholder="0"
            className="font-bold text-gray-800 text-[19px] items-center justify-center text-center border-b-[2px] mt-2 border-b-gray-300"
            keyboardType="numeric"
            value={`${form[index]?.credit || ""}`}
            onChangeText={(value) =>
              handleFormInputsChange(value, index, item?._id, "credit")
            }
          />
        </View>
        <View className="p-1 flex-grow justify-center items">
          <Text className="text-center text-[12px] font-semibold text-gray-500 ">
            Free
          </Text>
          <TextInput
            placeholder="0"
            className="font-bold text-gray-800 text-[19px] items-center justify-center text-center border-b-[2px] mt-2 border-b-gray-300"
            keyboardType="numeric"
            value={`${form[index]?.free || ""}`}
            onChangeText={(value) =>
              handleFormInputsChange(value, index, item?._id, "free")
            }
          />
        </View>

        <View className="p-1 flex-grow justify-center items">
          <Text className="text-center text-[12px] font-semibold text-gray-500 ">
            Borrow GLN
          </Text>
          <TextInput
            placeholder="0"
            className="font-bold text-gray-800 text-[19px] items-center justify-center text-center border-b-[2px] mt-2 border-b-gray-300"
            keyboardType="numeric"
            value={`${form[index]?.borrow || ""}`}
            onChangeText={(value) =>
              handleFormInputsChange(value, index, item?._id, "borrow")
            }
          />
        </View>
        <View className="p-1 flex-grow justify-center items">
          <Text className="text-center text-[12px] font-semibold text-gray-500 ">
            Return GLN
          </Text>
          <TextInput
            placeholder="0"
            className="font-bold text-gray-800 text-[19px] items-center justify-center text-center border-b-[2px] mt-2 border-b-gray-300"
            keyboardType="numeric"
            value={`${form[index]?.return || ""}`}
            onChangeText={(value) =>
              handleFormInputsChange(value, index, item?._id, "return")
            }
          />
        </View>
      </View>
      {/*  */}
    </View>
  );
};

export default RenderItems;
