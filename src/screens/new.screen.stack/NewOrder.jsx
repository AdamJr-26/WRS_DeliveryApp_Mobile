import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState, useReducer, useEffect, useLayoutEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RenderItems from "../../components/new-order/RenderItems";
import useFetch from "../../hooks/api/swr/useFetch";
import SelectDiscount from "../../components/new-order/modal/SelectDiscount";
import ChooseGallonModal from "../../components/new-delivery/ChooseGallonModal";
import { ScrollView } from "react-native-gesture-handler";
import BeforeSubmit from "../../components/new-order/modal/BeforeSubmit";
import Reschedule from "../../components/new-order/modal/Reschedule";
import { apiGet, apiPost } from "../../services/api/axios.method";
import SearchCustomerModal from "../../components/general/SearchCustomerModal";
import { useSWRConfig } from "swr";
import CustomerBalanceModal from "../../components/general/modal/CustomerBalanceModal";
import CustomerBorrowedModal from "../../components/general/modal/CustomerBorrowedModal";
const NewOrder = ({ route, navigation }) => {
  const { mutate } = useSWRConfig();

  // modals state
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showBorrowedModal, setShowBorrowedModal] = useState(false);

  const { schedule: sched_params } = route.params;
  const [schedule, setSchedule] = useState();
  const [customer, setCustomer] = useState();

  console.log("sched_paramssched_params", sched_params);

  // // add customer to the state from navigation.
  useEffect(() => {
    setCustomer(sched_params?.customer);
  }, []);

  // if customer changed, we will remove the schedule to the state. that we can change the endpoint of transaction
  // ex. url: "/api/deliver/orders/by-schedule",  to url: "/api/deliver/orders",
  useEffect(() => {
    if (customer?._id !== schedule?.customer?._id && schedule?._id) {
      ToastAndroid.show(
        "You will cancel the delivery of selected scheduled items if you change the customer.",
        ToastAndroid.LONG
      );
      setSchedule([]);
    } else {
      setSchedule(sched_params);
    }
  }, [customer, sched_params]);

  // console.log("schedule", schedule);
  const [isOpenSearchcustomer, setIsOpenSearchcustomer] = useState(false);

  // get customer's balance
  // get customer's borrowed gallons
  useEffect(() => {
    mutate(`/api/borrowed/total/gallon/${customer?._id}`);
    mutate(`/api/credits/params/${customer?._id}`);
  }, [customer]);

  const { data: customerBorrowed, error: customerBorrowedError } = useFetch({
    url: `/api/borrowed/total/gallon/${customer?._id}`,
  });
  console.log("customerBorrowed", customerBorrowed);

  const { data: customerBalance, error: customerBalanceError } = useFetch({
    url: `/api/credits/params/${customer?._id}`,
  });

  // ------------------------------------------------

  // create reducer for items
  const itemsReducer = (state, action) => {
    switch (action.type) {
      case "add":
        let isExists = false;
        for (let i = 0; i < state.length; i++) {
          for (const key in state[i]) {
            if (key === "_id" && state[i][key] === action?.data?._id) {
              isExists = true;
            }
          }
        }
        if (!isExists) {
          return [...state, action?.data];
        }
      case "reduce":
        const gallonIndex = state?.findIndex(
          (elem) => elem?._id === action?.data?._id
        );

        if (gallonIndex) {
          state?.splice(gallonIndex, 1);
        }
        return state;
      case "reset":
        if (action?.data instanceof Array) {
          state = action?.data;
          return state;
        } else {
          return state;
        }

      default:
        alert("Oops. Invalid command, please try again.");
    }
  };

  // cleaning the object of form and also adding total to the gallon object.
  const [items, dispatchItems] = useReducer(itemsReducer, []);
  useEffect(() => {
    function AddAllOrderedItems() {
      for (let i = 0; i < schedule?.items?.length; i++) {
        schedule.items[i].gallon["total"] = schedule.items[i].total;
        let item = schedule.items[i].gallon;
        dispatchItems({ type: "add", data: item });
      }
    }
    AddAllOrderedItems();
    return () => {
      dispatchItems({ type: "reset", data: [] });
    };
  }, [customer]);

  // select discount
  const [isShowDiscounts, setIsshowDiscounts] = useState(false);
  const [selectedDiscount, selectDiscount] = useState();
  // select gallon
  const [showGallonModal, setShowGallonModal] = useState(false);
  // console.log("selected scheules", selectedDiscount);
  // HANDLE FORM
  const [form, setForm] = useState([]);
  useEffect(() => {
    function createForm() {
      const f = [];
      for (let i = 0; i < items?.length; i++) {
        f.push({
          regular_price: items[i]?.price,
          gallon: items[i]?._id,
          credit: 0,
          orders: items[i].total,
          free: 0,
          borrow: 0,
          return: 0,
          price: items[i]?.price,
        });
      }
      setForm(f);
    }
    createForm();
  }, [items]);
  const handleFormInputsChange = (value, index, _id, field) => {
    const data = [...form];
    data[index]["gallon"] = _id;
    if (field === "credit") data[index]["credit"] = value;
    if (field === "orders") data[index]["orders"] = value;
    if (field === "free") data[index]["free"] = value;
    if (field === "borrow") data[index]["borrow"] = value;
    if (field === "return") data[index]["return"] = value;
    if (field === "price") data[index]["price"] = value;
    setForm(data);
  };

  // HANDLERS
  const [isSubmitting, setIsSubmitting] = useState(false);

  // RE SCHEDULE MODAL - trigger after submition
  const [date, setDate] = useState();
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const handleReschedule = () => {};

  // HANDLE BEFORE SUBMIT
  const [beforeSubmitModal, setBeforeSubmitModal] = useState(false);

  // GET PAYMENT FROM TEXTINPUT
  const [payment, setPayment] = useState(0);
  const [orderToPay, setOrderToPay] = useState(0);
  const handleNext = () => {
    setBeforeSubmitModal(!beforeSubmitModal);
    // get the total to pay
    let total_to_pay = 0;
    for (let i = 0; i < form.length; i++) {
      const total_orders_to_pay =
        Number(form[i].orders) - Number(form[i].credit);
      const total_to_pay_per_item_type =
        total_orders_to_pay * Number(form[i].price);
      total_to_pay = total_to_pay + total_to_pay_per_item_type;
    }
    setOrderToPay(total_to_pay);
  };
  // HANDLE CLEAR
  const handleClear = () => {
    dispatchItems({
      type: "reset",
      data: [],
    });
    setSchedule(null);
  };

  const [submitError, setSubmitError] = useState();

  const handleSubmit = async () => {
    // HANDLE SUBMIT - with schedule
    if (isSubmitting) return;

    setIsSubmitting(true);
    const payload = {
      schedule_id: schedule?._id,
      customer: customer?._id,
      items: form,
      total_payment: payment,
      order_to_pay: orderToPay, // as the total to pay of a customer.
    };
    console.log("PYALOADDDDDDDDDDDDD", payload);
    const { data, error } = await apiPost({
      url: "/api/deliver/orders/by-schedule",
      payload,
    });
    if (data && !error) {
      console.log("[DATA]", data);
      setBeforeSubmitModal(false);
      mutate("/api/schedule-assigned/by-personel");
      handleClear();
      setIsSubmitting(false);

      // if there has schedule attach.
      if (schedule?._id) {
        setRescheduleModal(true);
      }
    } else {
      const submit_error = error?.response?.data;
      const message = submit_error?.errors?.delivery_order?.message;
      ToastAndroid.show(message, ToastAndroid.LONG);
      setSubmitError(submit_error);
      setIsSubmitting(false);
      console.log("[ERROR]", submit_error);
    }
  };

  // handle if customer is uknown or not been set.

  return (
    <View
      className={Platform.OS === "android" ? "p-1 flex-1 bg-white" : "pt-0"}
    >
      {/* MODALSSSSS */}
      <CustomerBalanceModal
        setIsShow={setShowBalanceModal}
        isShow={showBalanceModal}
        customer={customer}
      />
      <CustomerBorrowedModal
        setIsShow={setShowBorrowedModal}
        isShow={showBorrowedModal}
        customer={customer}
      />
      <SelectDiscount
        setIsShow={setIsshowDiscounts}
        isShow={isShowDiscounts}
        selectCustomer={selectDiscount}
      />
      <ChooseGallonModal
        isShow={showGallonModal}
        setIsShow={setShowGallonModal}
        selectedGallons={items}
        dispatchSelectedGallons={dispatchItems}
      />
      <BeforeSubmit
        isShow={beforeSubmitModal}
        setIsShow={setBeforeSubmitModal}
        handleSubmit={handleSubmit}
        form={form}
        setPayment={setPayment}
        orderToPay={orderToPay}
        customerBalance={customerBalance?.data[0]?.total_debt || 0}
        isSubmitting={isSubmitting}
      />
      <Reschedule
        isShow={rescheduleModal}
        setIsShow={setRescheduleModal}
        form={form}
        schedule_id={sched_params?._id}
      />
      <SearchCustomerModal
        isShow={isOpenSearchcustomer}
        setIsShow={setIsOpenSearchcustomer}
        selectCustomer={setCustomer}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="border-[1px] justify-between border-gray-300 p-1 max-h-[300px] h-[250px] w-full flex-row rounded-xl">
          <View className="relative w-[64%] border-[1px] p-2 border-gray-300 rounded-lg items-center justify-center">
            <TouchableOpacity
              onPress={() => setIsOpenSearchcustomer(!isOpenSearchcustomer)}
              className="absolute right-4 top-4"
            >
              <MatIcons
                name="account-switch-outline"
                size={28}
                color="#2389DA"
              />
            </TouchableOpacity>
            {customer ? (
              <>
                <View className="w-[70px] h-[70px] rounded-full bg-gray-100 border-[1px] border-gray-300">
                  <Image
                    source={{
                      uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
                    }}
                    className="w-full h-full rounded-full"
                  />
                </View>
                <Text className="font-bold text-[18px]">
                  {customer?.firstname || ""} {customer?.lastname || ""}
                </Text>
                <Text className="text-center font-semibold ">
                  {customer?.address?.street || ""},{" "}
                  {customer?.address?.barangay || ""},{" "}
                  {customer?.address?.municipal_city || ""}
                </Text>
                <View className="flex-row p-1 items-center justify-between w-full">
                  <TouchableOpacity
                    onPress={() => setShowBalanceModal(!showBalanceModal)}
                    className="items-center justify-center border-[1px] border-gray-300 p-2 rounded-md w-[49%]"
                  >
                    <Text className="text-[12px]">Balance</Text>
                    {customerBalance && !customerBalanceError ? (
                      <>
                        <Text className="font-bold text-[16px] text-red-600">
                          <Text className="font-bold text-[16px] text-gray-600">
                            ₱
                          </Text>{" "}
                          {customerBalance?.data[0]?.total_debt.toLocaleString() ||
                            0}
                        </Text>
                      </>
                    ) : (
                      <ActivityIndicator size={16} color="#2389DA" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setShowBorrowedModal(!showBorrowedModal)}
                    className="items-center justify-center border-[1px] border-gray-300 p-2 rounded-md w-[49%]"
                  >
                    <Text className="text-[12px]">Borrowed GLN</Text>
                    {customerBorrowed && !customerBorrowedError ? (
                      <Text className="font-bold text-[16px] text-gray-600">
                        {" "}
                        {customerBorrowed?.data[0]?.total_borrowed || 0}
                      </Text>
                    ) : (
                      <ActivityIndicator size={16} color="#2389DA" />
                    )}
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View>
                <Text>no customer</Text>
              </View>
            )}
          </View>
          <View className="w-[35%] justify-between rounded-lg ">
            <TouchableOpacity
              onPress={() => setIsshowDiscounts(!isShowDiscounts)}
              className="h-[49%] w-full border-[1px] border-gray-300 rounded-xl items-center justify-center"
            >
              <Text className="text-[12px]">Discount by</Text>
              <Text className="font-bold text-[16px] ">
                {selectedDiscount
                  ? `Buy ${selectedDiscount?.get_free.buy || ""} get ${
                      selectedDiscount?.get_free.get || ""
                    }`
                  : "No Discount"}
              </Text>
            </TouchableOpacity>
            <View className="h-[49%] w-full border-[1px] border-gray-300 rounded-xl items-center justify-center">
              <Text className="text-[12px]">Customer type</Text>
              <Text className="font-bold text-[16px] ">regular</Text>
            </View>
          </View>
        </View>
        <View className="mt-2 border-[1px] border-gray-300 rounded-lg">
          <View className="flex-row items-center justify-between p-2  bg-gray-100 rounded-lg">
            <Text className="font-bold">Odered Items</Text>
            <TouchableOpacity
              onPress={() => setShowGallonModal(!showGallonModal)}
              className="bg-[#2389DA] p-1 rounded-xl"
            >
              <Ionicons name="add" color="white" size={32} />
            </TouchableOpacity>
          </View>
          <View className="mt-1 p-1">
            {items.map((item, i) => (
              <RenderItems
                item={item}
                key={i}
                index={i}
                form={form}
                selectedDiscount={selectedDiscount}
                handleFormInputsChange={handleFormInputsChange}
              />
            ))}
          </View>
          {items.length ? (
            <View className="bg-white rounded-xl px-3 py-2 mt-2 flex-row justify-between p-1">
              <TouchableOpacity
                onPress={handleClear}
                className="h-[55px] border-[1px] border-gray-200 w-[49%] rounded-xl items-center justify-center"
              >
                <Text className="font-bold ">Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isSubmitting}
                onPress={handleNext}
                className="h-[55px] border-[1px] bg-[#2389DA] border-gray-200 w-[49%] rounded-xl items-center justify-center"
              >
                {isSubmitting ? (
                  <ActivityIndicator size={16} color="white" />
                ) : (
                  <Text className="font-bold  text-white">Next</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            ""
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default NewOrder;
