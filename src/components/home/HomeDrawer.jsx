import { View, Text, useWindowDimensions } from "react-native";
import React from "react";

const HomeDrawer = ({ drawer }) => {
  const window = useWindowDimensions();
  const deviceViewHeight = window.height;

  useEffect(() => {
    return () => {
      drawer?.current?.closeDrawer();
    };
  }, []);
  // =============================== LOGOUT =========================================
  const { logout } = useAuth();
  const handleLogout = async () => {
    const { success, error } = await logout();
    console.log("dataaaaaaaaaaa", success);
    if (success && !error) {
      console.log("success", success);
      // navigation.navigate("Login", { name: "Login" });
    } else {
      console.log("error", error);
    }
  };

  return (
    <View className=" flex-col">
      <View className="bg-gray-700 px-3 py-10 gap-3 w-fit relative flex-col items-center justify-center">
        <View className="absolute top-2 left-2">
          <MatIcon
            onPress={() => drawer?.current?.closeDrawer()}
            name="close"
            size={30}
            color="#FFFFFF"
          />
        </View>
        <View className="w-[120px] h-[120px] border-2 border-blue-500 rounded-full p-1">
          <Image
            source={{
              uri: "https://res.cloudinary.com/dy1od3qwx/image/upload/v1661686514/xfyoilmuhgvkd1qnznkg.png",
            }}
            className=" w-full h-full rounded-full "
          />
        </View>
        <View className="flex flex-col justify-center items-center">
          <Text className="text-[24px] text-gray-100 font-bold whitespace-nowrap">
            Adam Marcaida Jr.
          </Text>
          <Text className="text-gray-300 font-semibold">Nickname: Pogi</Text>
        </View>
      </View>
      <View className={`flex-col justify-between h-[475px]`}>
        {/* navigation */}
        <View className="p-3 flex-col gap-3">
          <TouchableOpacity className="flex flex-row relative  items-center px-2 py-4  border-[1px] bg-blue-50 border-gray-200 rounded-lg ">
            <MatIcon name="security" size={25} color="gray" />
            <Text className="text-[16px] font-regular ml-2">
              Change Password
            </Text>
            <View className="absolute right-2 ">
              <MatIcon name="arrow-right" size={25} color="#2389DA" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row relative  items-center px-2 py-4  border-[1px] bg-blue-50 border-gray-200 rounded-lg ">
            <MatIcon name="home-switch" size={25} color="gray" />
            <Text className="text-[16px] font-regular ml-2">
              Change Station
            </Text>
            <View className="absolute right-2 ">
              <MatIcon name="arrow-right" size={25} color="#2389DA" />
            </View>
          </TouchableOpacity>
        </View>
        {/* logout */}
        <View>
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-center gap-2 "
          >
            <MatIcon name="logout" size={25} color="gray" />
            <Text className="text-[19px] font-semibold text-red-900">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeDrawer;
