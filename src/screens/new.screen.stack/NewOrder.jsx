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
import { useCallback } from "react";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
const NewOrder = ({ route, navigation }) => {
  const { mutate } = useSWRConfig();
  const navigationRoute = useRoute();

  // walk in.
  const { walkIn } = navigationRoute.params;
  useFocusEffect(
    React.useCallback(() => {
      if (walkIn) {
        navigation.setOptions({
          title: "Walk-in",
        });
      }
    }, [])
  );
  // modals state
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showBorrowedModal, setShowBorrowedModal] = useState(false);

  const { schedule: sched_params } = route.params;
  const [schedule, setSchedule] = useState();
  const [customer, setCustomer] = useState();
  console.log("walkInwalkIn=>>>>>>>", walkIn);
  console.log("sched_paramssched_params", sched_params);

  // add customer to the state from navigation.
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

  const {
    data: customerBorrowed,
    error: customerBorrowedError,
    mutate: mutateBorrowed,
  } = useFetch({
    url: `/api/borrowed/total/gallon/${customer?._id}`,
  });
  console.log("customerBorrowed", customerBorrowed);

  const {
    data: customerBalance,
    error: customerBalanceError,
    mutate: mutateTotalBalance,
  } = useFetch({
    url: `/api/credits/params/${customer?._id}`,
  });

  // ------------------------------------------------
  console.log("customerBalance==>>>>>>>>>", customerBalance);
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
    // Instead of using a for loop, use the map method to iterate over
    // the schedule.items array. This will make the code more readable
    // and may improve performance.
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
          orders: items[i].total || 0,
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
    if (field === "credit") data[index]["credit"] = Math.floor(value);
    if (field === "orders") data[index]["orders"] = Math.floor(value);
    if (field === "free") data[index]["free"] = Math.floor(value);
    if (field === "borrow") data[index]["borrow"] = Math.floor(value);
    if (field === "return") data[index]["return"] = Math.floor(value);
    if (field === "price") data[index]["price"] = Math.floor(value);
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
  const [totalToCredit, setTotalToCredit] = useState(0);
  const handleNext = () => {
    if (
      customerBalance?.data[0]?.total_debt + totalToCredit >
      creditLimits?.data[0]?.creditLimit
    )
      return;
    setBeforeSubmitModal(!beforeSubmitModal);
    // get the total to pay
  };

  // total to pay and total to credit.
  useEffect(() => {
    let total_to_pay = 0;
    for (let i = 0; i < form.length; i++) {
      const total_orders_to_pay =
        Number(form[i].orders) - Number(form[i].credit);
      const total_to_pay_per_item_type =
        total_orders_to_pay * Number(form[i].price);
      total_to_pay = total_to_pay + total_to_pay_per_item_type;
    }
    let total_to_credit = 0;
    for (let item of form) {
      total_to_credit = total_to_credit + item.price * item.credit;
    }
    setTotalToCredit(total_to_credit);
    setOrderToPay(total_to_pay);
  }, [form]);

  console.log("[FORM]", form);
  // HANDLE CLEAR
  const handleClear = () => {
    dispatchItems({
      type: "reset",
      data: [],
    });
  };

  const [submitError, setSubmitError] = useState();
  console.log("form.orders", form);
  const handleSubmit = async () => {
    // HANDLE SUBMIT - with schedule
    if (isSubmitting && !form.orders) return;

    setIsSubmitting(true);
    const payload = {
      schedule_id: schedule?._id,
      customer: customer?._id,
      walkIn: walkIn,
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
      ToastAndroid.show("Delivered order successfully.", ToastAndroid.LONG);
      // if there has schedule attach.
      if (schedule?._id) {
        setRescheduleModal(true);
        // navigation.goBack();
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
  // remove promo/discout by removing value of form.free.

  // handle if customer is uknown or not been set.

  // GET CREDIT LIMIT OF WRS.
  const {
    data: creditLimits,
    error,
    isValidating,
    isLoading,
  } = useFetch({
    url: "/api/credit-limit",
  });
  console.log(
    "customerBalance?.data[0]?.total_debt + totalToCredit",
    customerBalance?.data[0]?.total_debt + totalToCredit
  );
  return (
    <View
      className={Platform.OS === "android" ? "p-1 flex-1 bg-white" : "pt-0"}
    >
      {/* MODALSSSSS */}
      <CustomerBalanceModal
        setIsShow={setShowBalanceModal}
        isShow={showBalanceModal}
        customer={customer}
        mutateBalance={mutateTotalBalance}
      />
      <CustomerBorrowedModal
        setIsShow={setShowBorrowedModal}
        isShow={showBorrowedModal}
        customer={customer}
        mutateBorrowed={mutateBorrowed}
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
        customer={customer}
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
            {customer ? (
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
            ) : null}
            {customer ? (
              <>
                <View className="w-[70px] h-[70px] rounded-full bg-gray-100 border-[1px] border-gray-300">
                  <Image
                    source={{
                      uri: customer?.display_photo,
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
              <View className="flex items-center justify-center">
                {!customer ? (
                  <TouchableOpacity
                    onPress={() =>
                      setIsOpenSearchcustomer(!isOpenSearchcustomer)
                    }
                    className="flex items-center justify-center"
                  >
                    <MatIcons
                      name="account-switch-outline"
                      size={42}
                      color="#2389DA"
                    />
                    <Text className="font-bold">Select a customer</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
          </View>
          <View className="w-[35%] justify-between rounded-lg ">
            <TouchableOpacity
              onPress={() => setIsshowDiscounts(!isShowDiscounts)}
              className="h-[49%] w-full p-2 border-[1px] border-gray-300 rounded-xl items-center justify-center"
            >
              {/* <Text className="text-[12px]">Promo</Text> */}
              <Text className="font-bold text-[14px]  text-center ">
                {selectedDiscount
                  ? `Buy ${selectedDiscount?.get_free.buy || ""} get ${
                      selectedDiscount?.get_free.get || ""
                    }`
                  : "Select a promo"}
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
            <Text className="font-bold">Ordered Items</Text>
            <View className="flex-row gap-2">
              {/* <TouchableOpacity
                onPress={() => setShowGallonModal(!showGallonModal)}
                className="bg-[#2389DA] p-1 rounded-xl"
              >
                <Ionicons name="add" color="white" size={32} />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => setShowGallonModal(!showGallonModal)}
                className="bg-[#2389DA] p-1 rounded-xl"
              >
                <Ionicons name="add" color="white" size={32} />
              </TouchableOpacity>
            </View>
          </View>
          {schedule?.isToCredit ? (
            <View className="p-2">
              <Text className="font-bold">
                This schedule/order is to credit.
              </Text>
            </View>
          ) : null}
          <View className="mt-1 p-1">
            {items.map((item, i) => (
              <RenderItems
                isToCredit={schedule?.isToCredit}
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
            <>
              <View className="p-2 flex  bg-gray-100 m-2 rounded-md">
                <View className="flex flex-row mt-3 justify-between ">
                  <Text className="text-[12px] ">Total to pay : </Text>
                  <Text className="text-[14px] font-bold">₱ {orderToPay}</Text>
                </View>
                <View className="flex flex-row mt-3 justify-between ">
                  <Text className="text-[12px] ">Total to credit : </Text>
                  <Text className="text-[14px] font-bold">
                    ₱ {totalToCredit}
                  </Text>
                </View>
              </View>
              {customerBalance?.data[0]?.total_debt + totalToCredit >
              creditLimits?.data[0]?.creditLimit ? (
                <View className="flex items-center p-2  mt-4">
                  <Text className="font-bold">
                    The customer's credit will exceed the limit. ₱{" "}
                    {creditLimits?.data[0]?.creditLimit}
                  </Text>
                </View>
              ) : null}

              <View className=" bottom-0 flex-row px-2 py-1 items-center justify-center gap-x-1 opacity-80">
                <TouchableOpacity
                  onPress={handleClear}
                  className="flex-row w-[49%]  bg-white p-2 h-[50px] border-[1px] border-[#2389DA]  items-center justify-center rounded-full"
                >
                  <Text className="text-[#2389DA] bg-white font-bold text-center">
                    Clear
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={isSubmitting}
                  onPress={handleNext}
                  className="flex-row w-[49%] bg-[#2389DA] p-2 h-[50px]  items-center justify-center rounded-full"
                >
                  {isSubmitting ? (
                    <ActivityIndicator size={16} color="white" />
                  ) : (
                    <Text className="font-bold  text-white">Next</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : (
            ""
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default NewOrder;
