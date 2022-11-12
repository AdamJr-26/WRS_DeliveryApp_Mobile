import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../auth/index";
import AuthStack from "../../stacks/AuthStack";
import BottomTabNavigator from "../../stacks/BottomTabNavigator";

const ProtectRoutes = () => {
    const { user } = useAuth();
//   const user = true;
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? <BottomTabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default ProtectRoutes;
